import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PERSISTED_JSON_PATH = path.join(__dirname, 'src', 'data', 'persistedProjectImages.json');
const MOCK_DATA_PATH = path.join(__dirname, 'src', 'data', 'mockData.ts');
const PROJECT_IMAGES_TS_PATH = path.join(__dirname, 'src', 'utils', 'projectImages.ts');
const PORTFOLIO_GALLERY_TSX_PATH = path.join(__dirname, 'src', 'components', 'PortfolioGallery.tsx');

interface PersistedImageStore {
  projects: Record<string, string[]>;
  files: Record<string, string>; // filename -> base64 string (without data URL prefix)
}

/**
 * Strips duplicate extensions automatically (e.g. project1-1.jpg.jpg -> project1-1.jpg)
 */
function stripDuplicateExtensions(filename: string): string {
  return filename.replace(/(\.(jpg|jpeg|png|webp))(\.(jpg|jpeg|png|webp))+$/i, '$1');
}

function loadPersistedStore(): PersistedImageStore {
  try {
    if (fs.existsSync(PERSISTED_JSON_PATH)) {
      const raw = fs.readFileSync(PERSISTED_JSON_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        projects: parsed.projects || {},
        files: parsed.files || {},
      };
    }
  } catch (err) {
    console.error('Error loading persistedProjectImages.json:', err);
  }
  return { projects: {}, files: {} };
}

function savePersistedStore(store: PersistedImageStore) {
  try {
    const dir = path.dirname(PERSISTED_JSON_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PERSISTED_JSON_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving persistedProjectImages.json:', err);
  }
}

/**
 * Permanently updates the project's image array inside source files
 * (src/data/mockData.ts, src/components/PortfolioGallery.tsx, src/utils/projectImages.ts)
 */
function updateSourceFilesWithProjectPaths(projectNumber: number, imagePaths: string[]) {
  if (!projectNumber || !imagePaths || imagePaths.length === 0) return;

  const mainImg = imagePaths[0];
  const formattedArray = (indent: string) =>
    `[\n${imagePaths.map((p) => `${indent}  "${p}"`).join(',\n')}\n${indent}]`;

  // 1. Update src/data/mockData.ts and src/components/PortfolioGallery.tsx
  for (const filePath of [MOCK_DATA_PATH, PORTFOLIO_GALLERY_TSX_PATH]) {
    try {
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, 'utf-8');
      // Match the block for projectNumber: X up to highlightFeatures or description
      const blockRegex = new RegExp(
        `(projectNumber:\\s*${projectNumber}\\b[\\s\\S]*?)(mainImage:\\s*['"][^'"]*['"],\\s*(?:images:\\s*\\[[\\s\\S]*?\\],\\s*)?galleryImages:\\s*\\[[\\s\\S]*?\\],)`,
        'm'
      );
      const match = content.match(blockRegex);
      if (match) {
        // Detect indentation before mainImage
        const indentMatch = content.slice(match.index || 0).match(/\n([ \t]+)mainImage:/);
        const indent = indentMatch ? indentMatch[1] : '    ';
        const replacementBlock =
          `mainImage: "${mainImg}",\n` +
          `${indent}images: ${formattedArray(indent)},\n` +
          `${indent}galleryImages: ${formattedArray(indent)},`;

        let updatedContent = content.replace(blockRegex, `$1${replacementBlock}`);
        // Also flip needsImageUpload: true -> false for this project block
        const uploadFlagRegex = new RegExp(
          `(projectNumber:\\s*${projectNumber}\\b[\\s\\S]*?needsImageUpload:\\s*)true`,
          'm'
        );
        updatedContent = updatedContent.replace(uploadFlagRegex, '$1false');
        if (updatedContent !== content) {
          fs.writeFileSync(filePath, updatedContent, 'utf-8');
        }
      }
    } catch (err) {
      console.error(`Error updating source file ${filePath}:`, err);
    }
  }

  // 2. Update PROJECT_IMAGE_REGISTRY in src/utils/projectImages.ts
  try {
    if (fs.existsSync(PROJECT_IMAGES_TS_PATH)) {
      const content = fs.readFileSync(PROJECT_IMAGES_TS_PATH, 'utf-8');
      const regRegex = new RegExp(
        `(projectNumber:\\s*${projectNumber},\\s*projectId:\\s*["'][^"']+["'],\\s*images:\\s*)\\[[\\s\\S]*?\\]`,
        'm'
      );
      if (regRegex.test(content)) {
        const updated = content.replace(regRegex, `$1${formattedArray('    ')}`);
        if (updated !== content) {
          fs.writeFileSync(PROJECT_IMAGES_TS_PATH, updated, 'utf-8');
        }
      }
    }
  } catch (err) {
    console.error('Error updating projectImages.ts:', err);
  }
}

/**
 * Syncs existing files on disk with persistedProjectImages.json on server startup
 */
function syncDiskAndPersistedStore() {
  const store = loadPersistedStore();
  const dirs = [
    path.join(__dirname, 'public', 'images', 'projects'),
    path.join(__dirname, 'public', 'images', 'Projects'),
    path.join(__dirname, 'dist', 'images', 'projects'),
  ];

  dirs.forEach((dir) => {
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    } catch {}
  });

  const primaryDir = dirs[0];
  let storeModified = false;

  // 1. Normalize any duplicate extensions on disk & back up existing disk files into store
  if (fs.existsSync(primaryDir)) {
    const existingFiles = fs.readdirSync(primaryDir);
    for (const file of existingFiles) {
      const normalized = stripDuplicateExtensions(file);
      const srcPath = path.join(primaryDir, file);
      const destPath = path.join(primaryDir, normalized);
      if (normalized !== file && !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
      const targetFile = fs.existsSync(destPath) ? destPath : srcPath;
      if (fs.statSync(targetFile).isFile() && fs.statSync(targetFile).size > 0) {
        if (!store.files[normalized]) {
          store.files[normalized] = fs.readFileSync(targetFile).toString('base64');
          storeModified = true;
        }
      }
    }
  }

  // 2. Restore any files from store back to disk directories if missing
  for (const [filename, base64] of Object.entries(store.files)) {
    if (!base64) continue;
    const buffer = Buffer.from(base64, 'base64');
    for (const dir of dirs) {
      try {
        const filePath = path.join(dir, filename);
        if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
          fs.writeFileSync(filePath, buffer);
        }
      } catch {}
    }
  }

  // 3. Ensure source files reflect persisted project arrays
  for (const [projNumStr, paths] of Object.entries(store.projects)) {
    const projNum = Number(projNumStr);
    if (projNum >= 1 && projNum <= 10 && Array.isArray(paths) && paths.length > 0) {
      updateSourceFilesWithProjectPaths(projNum, paths);
    }
  }

  if (storeModified) {
    savePersistedStore(store);
  }
}

function writeImageBufferToAllDirs(filename: string, buffer: Buffer) {
  const dirs = [
    path.join(__dirname, 'public', 'images', 'projects'),
    path.join(__dirname, 'public', 'images', 'Projects'),
    path.join(__dirname, 'dist', 'images', 'projects'),
  ];
  for (const dir of dirs) {
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, filename), buffer);
    } catch {}
  }
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  syncDiskAndPersistedStore();

  // Increase payload limit for raw/base64 image uploads
  app.use(express.json({ limit: '100mb' }));
  app.use(express.raw({ type: 'image/*', limit: '100mb' }));

  // Smart resolver for /images/projects/:filename
  app.get(['/images/projects/:filename', '/images/Projects/:filename'], (req, res, next) => {
    try {
      const rawName = decodeURIComponent(req.params.filename);
      const cleanName = stripDuplicateExtensions(rawName);
      const dirs = [
        path.join(__dirname, 'public', 'images', 'projects'),
        path.join(__dirname, 'public', 'images', 'Projects'),
        path.join(__dirname, 'dist', 'images', 'projects'),
      ];

      const candidates = [
        cleanName,
        rawName,
        `${cleanName}.jpg`,
        `${cleanName}.png`,
        cleanName.replace(/^project(\d+)-(\d+)/i, 'project-$1-$2'),
      ];

      for (const dir of dirs) {
        if (!fs.existsSync(dir)) continue;
        for (const candidate of candidates) {
          const fullPath = path.join(dir, candidate);
          if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile() && fs.statSync(fullPath).size > 0) {
            res.setHeader('Cache-Control', 'no-cache');
            return res.sendFile(fullPath);
          }
        }
      }

      // Check persisted store in case file was cleaned from disk
      const store = loadPersistedStore();
      for (const candidate of candidates) {
        if (store.files[candidate]) {
          const buffer = Buffer.from(store.files[candidate], 'base64');
          writeImageBufferToAllDirs(cleanName, buffer);
          res.setHeader('Content-Type', 'image/jpeg');
          res.setHeader('Cache-Control', 'no-cache');
          return res.send(buffer);
        }
      }
    } catch {
      // Fall through
    }
    next();
  });

  // GET persisted project image configuration
  app.get('/api/project-images', (_req, res) => {
    const store = loadPersistedStore();
    return res.json({
      projects: store.projects,
      availableFiles: Object.keys(store.files),
    });
  });

  // POST upload/replace all images for a specific project and persist in source files
  app.post('/api/upload-project-images', (req, res) => {
    try {
      const { projectNumber, files } = req.body;
      const projNum = Number(projectNumber);
      if (!projNum || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ error: 'Invalid projectNumber or empty files array' });
      }

      const store = loadPersistedStore();
      const savedPaths: string[] = [];

      files.forEach((item: { filename?: string; base64Data: string }, idx: number) => {
        if (!item?.base64Data) return;
        const cleanBase64 = item.base64Data.replace(/^data:image\/[\w+.-]+;base64,/, '');
        const buffer = Buffer.from(cleanBase64, 'base64');
        const targetFilename = `project${projNum}-${idx + 1}.jpg`;
        const publicPath = `/images/projects/${targetFilename}`;

        writeImageBufferToAllDirs(targetFilename, buffer);
        store.files[targetFilename] = cleanBase64;
        savedPaths.push(publicPath);
      });

      if (savedPaths.length > 0) {
        store.projects[String(projNum)] = savedPaths;
        savePersistedStore(store);
        updateSourceFilesWithProjectPaths(projNum, savedPaths);
      }

      return res.json({
        success: true,
        projectNumber: projNum,
        images: savedPaths,
      });
    } catch (err: any) {
      console.error('Error in /api/upload-project-images:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // POST single image upload (supports both individual and bulk named uploads like project4-1.jpg)
  app.post('/api/upload-image', (req, res) => {
    try {
      const { filename, base64Data, projectNumber, imageIndex } = req.body;
      if (!filename || !base64Data) {
        return res.status(400).json({ error: 'Missing filename or base64Data' });
      }

      let normalizedFilename = stripDuplicateExtensions(path.basename(filename));
      if (!/\.(jpg|jpeg|png|webp)$/i.test(normalizedFilename)) {
        normalizedFilename = `${normalizedFilename}.jpg`;
      }

      // If projectNumber and imageIndex are specified, standardize to projectX-Y.jpg
      if (projectNumber && imageIndex) {
        normalizedFilename = `project${projectNumber}-${imageIndex}.jpg`;
      } else {
        // Also detect projectX-Y pattern inside filename
        const match = normalizedFilename.match(/project\s*[-_]?(\d+)\s*[-_](\d+)/i);
        if (match) {
          normalizedFilename = `project${match[1]}-${match[2]}.jpg`;
        }
      }

      const cleanBase64 = base64Data.replace(/^data:image\/[\w+.-]+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');

      writeImageBufferToAllDirs(normalizedFilename, buffer);

      const store = loadPersistedStore();
      store.files[normalizedFilename] = cleanBase64;

      // Check if it belongs to a numbered project (projectN-M.jpg)
      const projMatch = normalizedFilename.match(/^project(\d+)-(\d+)\./i);
      if (projMatch) {
        const pNum = Number(projMatch[1]);
        const pKey = String(pNum);
        const publicPath = `/images/projects/${normalizedFilename}`;
        const existingList = Array.isArray(store.projects[pKey]) ? [...store.projects[pKey]] : [];
        if (!existingList.includes(publicPath)) {
          existingList.push(publicPath);
          existingList.sort((a, b) => {
            const idxA = Number(a.match(/-(\d+)\./)?.[1] || 0);
            const idxB = Number(b.match(/-(\d+)\./)?.[1] || 0);
            return idxA - idxB;
          });
          store.projects[pKey] = existingList;
          updateSourceFilesWithProjectPaths(pNum, existingList);
        }
      }

      savePersistedStore(store);

      return res.json({
        success: true,
        filename: normalizedFilename,
        path: `/images/projects/${normalizedFilename}`,
        size: buffer.length,
      });
    } catch (err: any) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // POST permanent Ministry of Commerce QR code image (Single-Use Trigger)
  app.post('/api/upload-mc-qr', (req, res) => {
    try {
      const { base64Data } = req.body;
      if (!base64Data) {
        return res.status(400).json({ error: 'Missing base64Data' });
      }
      const cleanBase64 = base64Data.replace(/^data:image\/[\w+.-]+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');
      const qrFilename = 'mc-license-qr.jpg';

      writeImageBufferToAllDirs(qrFilename, buffer);
      const store = loadPersistedStore();
      store.files[qrFilename] = cleanBase64;
      savePersistedStore(store);

      return res.json({
        success: true,
        path: `/images/projects/${qrFilename}`,
      });
    } catch (err: any) {
      console.error('QR Upload error:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/mc-qr', (_req, res) => {
    const store = loadPersistedStore();
    const hasCustomQR = Boolean(store.files['mc-license-qr.jpg']);
    return res.json({
      hasCustomQR,
      path: hasCustomQR ? '/images/projects/mc-license-qr.jpg' : null,
    });
  });

  // In development, hook up Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: {
          // Ignore persistedProjectImages.json and source data auto-writes from triggering full page reloads mid-upload
          ignored: ['**/persistedProjectImages.json', '**/public/images/**'],
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();

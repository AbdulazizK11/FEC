import persistedData from "../data/persistedProjectImages.json";

export interface ProjectImageConfig {
  projectNumber: number;
  projectId: string;
  images: string[];
}

export const PROJECT_ID_MAP: Record<number, string> = {
  1: "villa-modern-contemporary-rass-59",
  2: "villa-modern-curtain-wall-rass-230",
  3: "palace-luxury-classic-rass-146",
  4: "palace-neoclassic-rass-844",
  5: "commercial-salmani-riyadh-950",
  6: "altakhi-elderly-warehouse-rass",
  7: "luxury-interior-majlis-dining-buraidah",
  8: "warm-living-room-interior-onaizah",
  9: "luxury-modern-landscape-riyadh",
  10: "modern-chalet-design-rass",
};

export function normalizeImagePath(rawPath: string): string {
  if (!rawPath) return "";
  if (rawPath.startsWith("data:image/")) return rawPath;
  return rawPath.replace(/(\.(jpg|jpeg|png|webp))(\.(jpg|jpeg|png|webp))+$/i, "$1");
}

export function handleProjectImageError(target: HTMLImageElement): void {
  const currentAttr = target.getAttribute("src") || "";
  if (currentAttr.startsWith("data:image/")) return;

  const step = target.dataset.fallbackStep || "0";
  const cleanSrc = normalizeImagePath(currentAttr.split("?")[0]);

  // Check if we have a cached base64 in memory for this filename
  const fileKey = cleanSrc.split("/").pop() || "";
  if (inMemoryFileDataUrlMap[fileKey]) {
    target.src = inMemoryFileDataUrlMap[fileKey];
    return;
  }

  if (step === "0") {
    target.dataset.fallbackStep = "1";
    target.src = `${cleanSrc}.jpg`;
  } else if (step === "1") {
    target.dataset.fallbackStep = "2";
    target.src = cleanSrc.replace("/images/projects/", "/images/Projects/");
  } else if (step === "2") {
    target.dataset.fallbackStep = "3";
    target.src = `${cleanSrc.replace("/images/projects/", "/images/Projects/")}.jpg`;
  }
}

export const PROJECT_IMAGE_REGISTRY: Record<number, ProjectImageConfig> = {
  1: {
    projectNumber: 1,
    projectId: "villa-modern-contemporary-rass-59",
    images: [
      "/images/projects/project1-1.jpg",
      "/images/projects/project1-2.jpg",
      "/images/projects/project1-3.jpg"
    ]
  },
  2: {
    projectNumber: 2,
    projectId: "villa-modern-curtain-wall-rass-230",
    images: [
      "/images/projects/project2-1.jpg",
      "/images/projects/project2-2.jpg"
    ]
  },
  3: {
    projectNumber: 3,
    projectId: "palace-luxury-classic-rass-146",
    images: [
      "/images/projects/project3-1.jpg",
      "/images/projects/project3-2.jpg",
      "/images/projects/project3-3.jpg"
    ]
  },
  4: {
    projectNumber: 4,
    projectId: "palace-neoclassic-rass-844",
    images: [
      "/images/projects/project4-1.jpg",
      "/images/projects/project4-2.jpg",
      "/images/projects/project4-3.jpg"
    ]
  },
  5: {
    projectNumber: 5,
    projectId: "commercial-salmani-riyadh-950",
    images: [
      "/images/projects/project5-1.jpg",
      "/images/projects/project5-2.jpg",
      "/images/projects/project5-3.jpg",
      "/images/projects/project5-4.jpg"
    ]
  },
  6: {
    projectNumber: 6,
    projectId: "altakhi-elderly-warehouse-rass",
    images: [
      "/images/projects/project6-1.jpg",
      "/images/projects/project6-2.jpg",
      "/images/projects/project6-3.jpg",
      "/images/projects/project6-4.jpg"
    ]
  },
  7: {
    projectNumber: 7,
    projectId: "luxury-interior-majlis-dining-buraidah",
    images: [
      "/images/projects/project7-1.jpg",
      "/images/projects/project7-2.jpg",
      "/images/projects/project7-3.jpg",
      "/images/projects/project7-4.jpg",
      "/images/projects/project7-5.jpg",
      "/images/projects/project7-6.jpg",
      "/images/projects/project7-7.jpg",
      "/images/projects/project7-8.jpg"
    ]
  },
  8: {
    projectNumber: 8,
    projectId: "warm-living-room-interior-onaizah",
    images: [
      "/images/projects/project8-1.jpg",
      "/images/projects/project8-2.jpg",
      "/images/projects/project8-3.jpg",
      "/images/projects/project8-4.jpg"
    ]
  },
  9: {
    projectNumber: 9,
    projectId: "luxury-modern-landscape-riyadh",
    images: [
      "/images/projects/project9-1.jpg",
      "/images/projects/project9-2.jpg",
      "/images/projects/project9-3.jpg",
      "/images/projects/project9-4.jpg"
    ]
  },
  10: {
    projectNumber: 10,
    projectId: "modern-chalet-design-rass",
    images: [
      "/images/projects/project10-1.jpg",
      "/images/projects/project10-2.jpg",
      "/images/projects/project10-3.jpg"
    ]
  }
};

// In-memory runtime map for instant rendering without page reload
const runtimeProjectPathsMap: Record<number, string[]> = {};
const inMemoryFileDataUrlMap: Record<string, string> = {};
const completedSingleUseUploads = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

/**
 * Checks whether a project should display the Single-Use Upload button:
 * - Hidden (`false`) for all existing completed projects (1..10).
 * - Enabled (`true`) automatically ONLY when a newly added future project
 *   has `needsImageUpload: true` or has no assigned images yet, and disappears
 *   immediately the moment images are selected and uploaded.
 */
export function isProjectPendingSingleUseUpload(project: {
  projectNumber?: number;
  needsImageUpload?: boolean;
  images?: string[];
  galleryImages?: string[];
}): boolean {
  const num = project.projectNumber;
  if (!num) return false;

  if (completedSingleUseUploads.has(num) && !project.needsImageUpload) {
    return false;
  }

  try {
    if (typeof window !== "undefined" && localStorage.getItem(`falaq_upload_locked_${num}`) === "true") {
      return false;
    }
  } catch {}

  if (project.needsImageUpload === true) {
    return !completedSingleUseUploads.has(num) || !runtimeProjectPathsMap[num]?.length;
  }

  const hasInitialImages =
    (Array.isArray(project.images) && project.images.length > 0) ||
    (Array.isArray(project.galleryImages) && project.galleryImages.length > 0);

  return !hasInitialImages && !completedSingleUseUploads.has(num);
}

// Hydrate from persistedProjectImages.json at import time
try {
  const projectsFromJson = (persistedData as any)?.projects || {};
  for (const [k, v] of Object.entries(projectsFromJson)) {
    const num = Number(k);
    if (num && Array.isArray(v) && v.length > 0) {
      runtimeProjectPathsMap[num] = v as string[];
    }
  }
} catch {}

// IndexedDB permanent storage (supports 500MB+ so images never vanish on refresh)
const IDB_NAME = "falaq_permanent_images_db";
const IDB_STORE = "project_images";

function openImagesDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB not available"));
    }
    const req = window.indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: "projectNumber" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveProjectToIDB(
  projectNumber: number,
  paths: string[],
  filesData: { filename: string; base64Data: string }[]
): Promise<void> {
  try {
    const db = await openImagesDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      const store = tx.objectStore(IDB_STORE);
      store.put({
        projectNumber,
        paths,
        filesData,
        updatedAt: Date.now(),
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {}
}

async function getAllProjectsFromIDB(): Promise<
  Array<{
    projectNumber: number;
    paths: string[];
    filesData: { filename: string; base64Data: string }[];
  }>
> {
  try {
    const db = await openImagesDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const store = tx.objectStore(IDB_STORE);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Returns the active array of clean image paths for a project, prioritizing:
 * 1. Runtime/persisted paths updated via "رفع / استبدال الصور"
 * 2. Project's own `images` / `galleryImages` array in mockData.ts
 * 3. `PROJECT_IMAGE_REGISTRY`
 */
export function getEffectiveProjectImages(project: {
  projectNumber?: number;
  images?: string[];
  galleryImages?: string[];
  mainImage: string;
}): string[] {
  const num = project.projectNumber;
  if (num && runtimeProjectPathsMap[num] && runtimeProjectPathsMap[num].length > 0) {
    return runtimeProjectPathsMap[num].map(normalizeImagePath);
  }
  if (project.images && project.images.length > 0) {
    return project.images.map(normalizeImagePath);
  }
  if (project.galleryImages && project.galleryImages.length > 0) {
    return project.galleryImages.map(normalizeImagePath);
  }
  if (num && PROJECT_IMAGE_REGISTRY[num]) {
    return PROJECT_IMAGE_REGISTRY[num].images.map(normalizeImagePath);
  }
  return [normalizeImagePath(project.mainImage)];
}

/**
 * Uploads and permanently saves images for a specific project to:
 * 1. Server disk (`public/images/projects/project{N}-{M}.jpg`)
 * 2. Source files (`src/data/mockData.ts`, `src/utils/projectImages.ts`, `src/data/persistedProjectImages.json`)
 * 3. Browser IndexedDB (`falaq_permanent_images_db`)
 */
export async function saveProjectImagesPermanently(
  projectNumber: number,
  files: File[]
): Promise<string[]> {
  if (!projectNumber || !files || files.length === 0) return [];

  // Sort files naturally by name so pic 1, 2, 3 stay in order
  const sortedFiles = [...files].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })
  );

  const filesPayload: { filename: string; base64Data: string }[] = [];
  const newPaths: string[] = [];

  for (let i = 0; i < sortedFiles.length; i++) {
    const dataUrl = await fileToDataUrl(sortedFiles[i]);
    const filename = `project${projectNumber}-${i + 1}.jpg`;
    const publicPath = `/images/projects/${filename}`;
    filesPayload.push({ filename, base64Data: dataUrl });
    newPaths.push(publicPath);
    inMemoryFileDataUrlMap[filename] = dataUrl;
  }

  // Update in-memory registry and lock single-use upload immediately
  runtimeProjectPathsMap[projectNumber] = newPaths;
  completedSingleUseUploads.add(projectNumber);
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(`falaq_upload_locked_${projectNumber}`, "true");
    }
  } catch {}
  if (PROJECT_IMAGE_REGISTRY[projectNumber]) {
    PROJECT_IMAGE_REGISTRY[projectNumber].images = newPaths;
  }

  // Save in IndexedDB permanently
  await saveProjectToIDB(projectNumber, newPaths, filesPayload);

  // Persist to backend disk & source files (`mockData.ts`, `projectImages.ts`, `persistedProjectImages.json`)
  try {
    const res = await fetch("/api/upload-project-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectNumber,
        files: filesPayload,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.images) && data.images.length > 0) {
        runtimeProjectPathsMap[projectNumber] = data.images;
      }
    }
  } catch (err) {
    console.error("Failed to sync project images to server:", err);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("falaq_images_updated", { detail: { projectNumber, paths: newPaths } })
    );
  }

  return newPaths;
}

/**
 * Bulk uploads files across multiple projects (automatically matches `project{N}-{M}` or `Project (N)` in filename)
 */
export async function saveBulkProjectImagesPermanently(
  fileList: FileList | File[]
): Promise<{ updatedProjects: number[]; totalSaved: number }> {
  const files = Array.from(fileList);
  const groupedByProject: Record<number, { index: number; file: File }[]> = {};

  for (const file of files) {
    const cleanName = file.name.replace(/(\.(jpg|jpeg|png|webp))+$/i, "");
    // Match project10-1, project_10_1, Picture (1) Project (4), etc.
    const matchDirect = cleanName.match(/project\s*[-_]?(\d+)\s*[-_](\d+)/i);
    const matchPicProj = cleanName.match(/picture\s*\(?(\d+)\)?\s*project\s*\(?(\d+)\)?/i);

    let projNum: number | null = null;
    let imgIdx: number = 1;

    if (matchDirect) {
      projNum = Number(matchDirect[1]);
      imgIdx = Number(matchDirect[2]);
    } else if (matchPicProj) {
      imgIdx = Number(matchPicProj[1]);
      projNum = Number(matchPicProj[2]);
    }

    if (projNum && projNum >= 1 && projNum <= 10) {
      if (!groupedByProject[projNum]) groupedByProject[projNum] = [];
      groupedByProject[projNum].push({ index: imgIdx, file });
    }
  }

  const updatedProjects: number[] = [];
  let totalSaved = 0;

  for (const [projStr, items] of Object.entries(groupedByProject)) {
    const projNum = Number(projStr);
    items.sort((a, b) => a.index - b.index);
    const orderedFiles = items.map((item) => item.file);
    const saved = await saveProjectImagesPermanently(projNum, orderedFiles);
    if (saved.length > 0) {
      updatedProjects.push(projNum);
      totalSaved += saved.length;
    }
  }

  return { updatedProjects, totalSaved };
}

let syncInitialized = false;

/**
 * Synchronizes IndexedDB and server on startup so uploaded images never disappear after refresh or server restart
 */
export async function initPersistentProjectImagesSync(): Promise<void> {
  if (typeof window === "undefined" || syncInitialized) return;
  syncInitialized = true;

  try {
    // 1. Fetch latest persisted paths & available files from server first
    let serverAvailableFiles = new Set<string>();
    try {
      const res = await fetch("/api/project-images");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.availableFiles)) {
          serverAvailableFiles = new Set(data.availableFiles);
        }
        if (data?.projects) {
          for (const [k, v] of Object.entries(data.projects)) {
            const pNum = Number(k);
            if (pNum && Array.isArray(v) && v.length > 0) {
              runtimeProjectPathsMap[pNum] = v as string[];
            }
          }
        }
      }
    } catch {}

    // 2. Check IndexedDB for any saved project images and only push to server if missing on server
    const savedRecords = await getAllProjectsFromIDB();
    for (const record of savedRecords) {
      if (record.projectNumber === 4) {
        // Project 4 images were cropped on the server; skip stale IDB cache for Project 4
        continue;
      }
      if (record.projectNumber && Array.isArray(record.paths) && record.paths.length > 0) {
        if (!runtimeProjectPathsMap[record.projectNumber]) {
          runtimeProjectPathsMap[record.projectNumber] = record.paths;
        }
        if (Array.isArray(record.filesData)) {
          const missingOnServer = record.filesData.some(
            (f) => f.filename && !serverAvailableFiles.has(f.filename)
          );
          if (missingOnServer) {
            fetch("/api/upload-project-images", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                projectNumber: record.projectNumber,
                files: record.filesData,
              }),
            }).catch(() => {});
          }
        }
      }
    }

    window.dispatchEvent(new CustomEvent("falaq_images_updated"));
  } catch {}
}

export function getProjectImageUrls(projectRef: number | string): string[] {
  let num: number | undefined;
  if (typeof projectRef === "number") {
    num = projectRef;
  } else {
    for (const [n, id] of Object.entries(PROJECT_ID_MAP)) {
      if (id === projectRef) {
        num = Number(n);
        break;
      }
    }
  }

  if (num && runtimeProjectPathsMap[num] && runtimeProjectPathsMap[num].length > 0) {
    return runtimeProjectPathsMap[num];
  }

  if (num && PROJECT_IMAGE_REGISTRY[num]) {
    return PROJECT_IMAGE_REGISTRY[num].images;
  }

  return [];
}

export function getProjectPrimaryImage(projectRef: number | string): string {
  const list = getProjectImageUrls(projectRef);
  return list[0] || "/images/projects/project1-1.jpg";
}

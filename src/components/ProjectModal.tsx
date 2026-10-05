import { PortfolioProject } from '../types';
import { OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import {
  normalizeImagePath,
  handleProjectImageError,
  getEffectiveProjectImages,
  saveProjectImagesPermanently,
  isProjectPendingSingleUseUpload,
} from '../utils/projectImages';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Compass, 
  ChevronLeft,
  ChevronRight,
  Camera,
  Upload,
  Check,
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  initialImageIndex?: number;
  onClose: () => void;
}

export default function ProjectModal({ project, initialImageIndex = 0, onClose }: ProjectModalProps) {
  const { isAr, t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(initialImageIndex);
  const [refreshTick, setRefreshTick] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [canShowSingleUseUpload, setCanShowSingleUseUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSelectedImageIndex(initialImageIndex || 0);
    setSaveSuccessMessage(null);
    setCanShowSingleUseUpload(project ? isProjectPendingSingleUseUpload(project) : false);
  }, [project, initialImageIndex]);

  useEffect(() => {
    const handleUpdate = () => {
      setRefreshTick((v) => v + 1);
      if (project) {
        setCanShowSingleUseUpload(isProjectPendingSingleUseUpload(project));
      }
    };
    window.addEventListener('falaq_images_updated', handleUpdate);
    return () => window.removeEventListener('falaq_images_updated', handleUpdate);
  }, [project]);

  if (!project) return null;

  const currentImages = getEffectiveProjectImages(project);
  const totalPhotos = currentImages.length;

  const processUploadedFiles = async (files: File[]) => {
    if (!files.length || !project.projectNumber) return;
    setIsUploading(true);
    setSaveSuccessMessage(null);
    try {
      const savedPaths = await saveProjectImagesPermanently(project.projectNumber, files);
      setSelectedImageIndex(0);
      setRefreshTick((v) => v + 1);
      // Single-use trigger: automatically hide the upload button once images are uploaded
      setCanShowSingleUseUpload(false);
      setSaveSuccessMessage(
        isAr
          ? `تم حفظ وتثبيت (${savedPaths.length}) صور بشكل دائم في الكود المصدري وإخفاء زر الرفع تلقائياً`
          : `Permanently saved (${savedPaths.length}) images to source code`
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = e.target.files ? Array.from<File>(e.target.files) : [];
    await processUploadedFiles(files);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    const files: File[] = e.dataTransfer.files
      ? Array.from<File>(e.dataTransfer.files).filter((f: File) => f.type.startsWith('image/'))
      : [];
    await processUploadedFiles(files);
  };

  const getPhotoLabel = (src: string, index: number) => {
    try {
      if (src.startsWith('data:')) {
        return `project${project.projectNumber || 1}-${index + 1}`;
      }
      const clean = decodeURIComponent(
        src
          .split('?')[0]
          .split('/')
          .pop()
          ?.replace(/(\.(jpg|jpeg|png|webp))+$/i, '') || ''
      );
      if (clean) return clean;
    } catch {
      // fallback
    }
    return isAr ? `صورة (${index + 1})` : `pic (${index + 1})`;
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(prev => (prev === 0 ? totalPhotos - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(prev => (prev === totalPhotos - 1 ? 0 : prev + 1));
  };

  const rawDisplayImage = currentImages[selectedImageIndex] || normalizeImagePath(project.mainImage);
  const currentDisplayImage = !rawDisplayImage.startsWith('data:')
    ? `${rawDisplayImage}?v=2${refreshTick > 0 ? `&t=${refreshTick}` : ''}`
    : rawDisplayImage;
  const activePhotoLabel = getPhotoLabel(rawDisplayImage, selectedImageIndex);

  const handleWhatsAppBooking = () => {
    const text = isAr 
      ? `مرحباً مكتب فلق (FEC)، أعجبني تصميم مشروع *${project.title}* (${project.location}) وأود الاستفسار عن تنفيذ تصميم مشابه لأرضي/مشروعي.`
      : `Hello Falaq (FEC), I am interested in the design of *${project.titleEn || project.title}* (${project.location}) and would like to inquire about a similar design for my project.`;
    window.open(`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className={`relative w-full max-w-5xl bg-white border border-[#E0E1DC] rounded-sm shadow-xl overflow-hidden z-10 my-auto ${isAr ? 'text-right' : 'text-left'} max-h-[90vh] flex flex-col`}>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E0E1DC] flex items-center justify-between bg-[#F5F4F0]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-white hover:bg-[#E0E1DC] text-[#000000] border border-[#E0E1DC] transition-colors cursor-pointer"
              aria-label={isAr ? "إغلاق" : "Close"}
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 font-thmanyah-sans flex-wrap">
              {project.projectNumber && (
                <span className="text-xs px-2.5 py-0.5 rounded-sm bg-[#0E1910] text-[#F4E95B] font-th-bold">
                  {isAr 
                    ? ({ 1: 'المشروع الأول', 2: 'المشروع الثاني', 3: 'المشروع الثالث', 4: 'المشروع الرابع', 5: 'المشروع الخامس', 6: 'المشروع السادس', 7: 'المشروع السابع', 8: 'المشروع الثامن', 9: 'المشروع التاسع', 10: 'المشروع العاشر' }[project.projectNumber] || `مشروع رقم (${project.projectNumber})`)
                    : `Project #${project.projectNumber}`}
                </span>
              )}
              <span className="text-xs px-2.5 py-0.5 rounded-sm bg-white text-[#0E1910] border border-[#E0E1DC] font-th-medium">
                {project.categoryLabel}
              </span>
              <span className="text-xs text-[#343A2F]">
                {project.gregorianDate || project.year}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-th-bold text-[#000000] font-thmanyah-display">
              {project.title}
            </h3>
            <div className={`flex items-center gap-1.5 text-xs text-[#343A2F] mt-0.5 font-thmanyah-sans ${isAr ? 'justify-end' : 'justify-start'}`}>
              <MapPin className="w-3.5 h-3.5 text-[#0E1910]" />
              <span>{project.location} ({project.city})</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Main Visual Display */}
          <div className="space-y-3">
            {/* Visual Gallery Header + Permanent Upload Button */}
            <div className="flex items-center justify-between font-thmanyah-sans flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs text-[#343A2F]">
                <Camera className="w-3.5 h-3.5 text-[#0E1910]" />
                <span>
                  {isAr ? `معرض لقطات المشروع (${selectedImageIndex + 1} من ${totalPhotos})` : `Project Visual Gallery (${selectedImageIndex + 1} of ${totalPhotos})`}
                </span>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                {canShowSingleUseUpload && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0E1910] hover:bg-[#19301E] text-[#F4E95B] text-xs font-th-bold transition-all cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {isUploading
                        ? (isAr ? 'جاري التثبيت والحفظ الدائم...' : 'Saving permanently...')
                        : (isAr ? 'رفع صور المشروع الجديد (لمرة واحدة)' : 'Upload New Project Images')}
                    </span>
                  </button>
                )}

                <div className="text-xs text-[#343A2F] bg-[#F5F4F0] px-2.5 py-1.5 rounded-sm border border-[#E0E1DC] font-th-bold">
                  {isAr ? `إجمالي الصور: ${totalPhotos}` : `Total: ${totalPhotos}`}
                </div>
              </div>
            </div>

            {saveSuccessMessage && (
              <div className="flex items-center gap-2 p-3 rounded-sm bg-[#EAF4ED] border border-[#16A34A]/40 text-[#14532D] text-xs font-thmanyah-sans font-th-bold">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {/* Image Stage (Supports Drag & Drop) */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={handleDrop}
              className={`relative h-64 sm:h-96 rounded-sm overflow-hidden border bg-[#E0E1DC] group select-none transition-all ${
                isDraggingOver
                  ? 'border-2 border-[#16A34A] ring-4 ring-[#16A34A]/20'
                  : 'border-[#E0E1DC]'
              }`}
            >
              <img
                key={`${project.id}-main-${selectedImageIndex}-${refreshTick}`}
                src={currentDisplayImage}
                alt={`${project.title} - ${activePhotoLabel}`}
                onError={(e) => handleProjectImageError(e.currentTarget)}
                className="w-full h-full object-cover object-center"
              />

              {/* Prev / Next controls on modal image */}
              {totalPhotos > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label={isAr ? "الصورة السابقة" : "Previous Image"}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label={isAr ? "الصورة التالية" : "Next Image"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Architectural Style Tag */}
              <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} bg-[#0E1910]/90 px-2.5 py-1 rounded-sm text-xs text-[#F5F4F0] font-thmanyah-sans flex items-center gap-1.5`}>
                <Compass className="w-3.5 h-3.5 text-[#F4E95B]" />
                <span>{isAr ? `النمط: ${project.architecturalStyle}` : `Style: ${project.architecturalStyle}`}</span>
              </div>
            </div>

            {/* Thumbnails Gallery */}
            {currentImages.length > 1 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {currentImages.map((img, idx) => {
                    const thumbSrc = !img.startsWith('data:')
                      ? `${img}?v=2${refreshTick > 0 ? `&t=${refreshTick}` : ''}`
                      : img;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-28 h-18 rounded-sm overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                          selectedImageIndex === idx ? 'border-[#F4E95B] ring-2 ring-[#0E1910] shadow-sm' : 'border-[#E0E1DC] opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img 
                          key={`${project.id}-thumb-${idx}-${refreshTick}`}
                          src={thumbSrc} 
                          alt={`Thumbnail ${idx + 1}`} 
                          onError={(e) => handleProjectImageError(e.currentTarget)}
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] font-thmanyah-sans ${isAr ? 'text-right' : 'text-left'}`}>
            <div>
              <span className="text-[11px] text-[#343A2F] block">{isAr ? 'المساحة الإجمالية:' : 'Total Built-up Area:'}</span>
              <span className="text-base font-th-bold text-[#000000]">{project.area} {t('meterSq')}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#343A2F] block">{isAr ? 'سنة الإنجاز / الاعتماد:' : 'Completion / Approval Year:'}</span>
              <span className="text-sm sm:text-base font-th-bold text-[#000000]">
                {project.gregorianDate || project.year}
                {project.hijriDate && <span className="text-xs font-th-normal text-[#343A2F] block sm:inline sm:mr-1">({project.hijriDate})</span>}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#343A2F] block">{isAr ? 'الطراز المعماري:' : 'Architectural Style:'}</span>
              <span className="text-sm font-th-medium text-[#000000]">{project.architecturalStyle}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#343A2F] block">{isAr ? 'نوع العميل:' : 'Client Type:'}</span>
              <span className="text-sm font-th-medium text-[#000000]">{project.clientType}</span>
            </div>
          </div>

          {/* Official Licensing & Plan Badges (if available) */}
          {(project.plotInfo || project.deedNumber || project.fenceLength) && (
            <div className={`flex flex-wrap items-center gap-2 p-3 rounded-sm bg-white border border-[#E0E1DC] text-xs font-thmanyah-sans ${isAr ? 'text-right' : 'text-left'}`}>
              <span className="text-xs font-th-bold text-[#000000]">
                {isAr ? 'بيانات الاعتماد والرخصة:' : 'Official Plan & License Data:'}
              </span>
              {project.plotInfo && (
                <span className="px-2.5 py-1 rounded-sm bg-[#F5F4F0] text-[#000000] border border-[#E0E1DC] font-th-medium">
                  {project.plotInfo}
                </span>
              )}
              {project.deedNumber && (
                <span className="px-2.5 py-1 rounded-sm bg-[#F5F4F0] text-[#000000] border border-[#E0E1DC] font-th-medium">
                  {project.deedNumber}
                </span>
              )}
              {project.fenceLength && (
                <span className="px-2.5 py-1 rounded-sm bg-[#F5F4F0] text-[#000000] border border-[#E0E1DC] font-th-medium">
                  {isAr ? `طول الأسوار: ${project.fenceLength}` : `Boundary Walls: ${project.fenceLength}`}
                </span>
              )}
            </div>
          )}

          {/* Floor & Built-up Area Breakdown (جدول المساحات ونسب البناء) */}
          {project.areaBreakdown && project.areaBreakdown.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-th-bold text-[#000000] font-thmanyah-display flex items-center justify-between">
                <span>{isAr ? 'تفاصيل ومساحات الأدوار (جدول المساحات المعتمد):' : 'Approved Floor Breakdown & Building Ratios:'}</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {project.areaBreakdown.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] font-thmanyah-sans">
                    <span className="text-[11px] text-[#343A2F] block">{item.label}</span>
                    <span className="text-xs sm:text-sm font-th-bold text-[#000000] block mt-0.5">{item.area}</span>
                    {item.ratio && (
                      <span className="text-[10px] text-[#0E1910] font-th-medium block mt-0.5">
                        {isAr ? `النسبة البنائية: ${item.ratio}` : `Built-up Ratio: ${item.ratio}`}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-sm font-th-bold text-[#000000] font-thmanyah-display">{isAr ? 'نبذة عن الفكرة التصميمية والمعمارية:' : 'Design Concept & Vision:'}</h4>
            <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed font-thmanyah-text">
              {project.description}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          {project.highlightFeatures && project.highlightFeatures.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-th-bold text-[#000000] font-thmanyah-display">{isAr ? 'أبرز المزايا والحلول الهندسية المطبقة:' : 'Key Engineering Solutions & Features:'}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.highlightFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#000000] bg-[#F5F4F0] p-2.5 rounded-sm border border-[#E0E1DC] font-thmanyah-sans">
                    <CheckCircle2 className="w-4 h-4 text-[#0E1910] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables Provided */}
          {project.deliverables && (
            <div className="space-y-1.5 font-thmanyah-sans">
              <h4 className="text-xs font-th-bold text-[#343A2F]">{isAr ? 'المخرجات والتراخيص المسلمة للعميل:' : 'Delivered Blueprints & Licenses:'}</h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((del, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-sm bg-[#F5F4F0] text-[#000000] border border-[#E0E1DC]">
                    {del}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-[#E0E1DC] bg-[#F5F4F0] flex flex-wrap items-center justify-between gap-4 font-thmanyah-sans">
          <div className="text-xs text-[#343A2F]">
            {isAr ? 'مكتب فلق للإستشارات الهندسية (FEC) - الرس، القصيم' : 'Falaq Engineering Consultants (FEC) - Al-Rass, Al-Qassim'}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-sm bg-white hover:bg-[#E0E1DC] text-[#343A2F] border border-[#E0E1DC] text-xs font-th-bold transition-colors cursor-pointer"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>

            <button
              onClick={handleWhatsAppBooking}
              className="px-5 py-2 rounded-sm bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] font-th-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#F4E95B]" />
              <span>{isAr ? 'طلب تصميم مماثل عبر الواتساب' : 'Request Similar Design on WhatsApp'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

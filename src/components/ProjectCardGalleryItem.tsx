import React, { useState, useEffect, useRef } from 'react';
import { PortfolioProject } from '../types';
import {
  normalizeImagePath,
  handleProjectImageError,
  getEffectiveProjectImages,
  saveProjectImagesPermanently,
  isProjectPendingSingleUseUpload,
} from '../utils/projectImages';
import { 
  MapPin, 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  ArrowUpLeft, 
  ArrowUpRight,
  Upload,
} from 'lucide-react';

interface ProjectCardGalleryItemProps {
  project: PortfolioProject;
  isAr: boolean;
  t: (key: string) => string;
  onOpenModal: (project: PortfolioProject, initialIndex: number) => void;
}

export const ProjectCardGalleryItem: React.FC<ProjectCardGalleryItemProps> = ({
  project,
  isAr,
  t,
  onOpenModal,
}) => {
  const [refreshTick, setRefreshTick] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [canShowSingleUseUpload, setCanShowSingleUseUpload] = useState(() =>
    isProjectPendingSingleUseUpload(project)
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCanShowSingleUseUpload(isProjectPendingSingleUseUpload(project));
    const handleUpdate = () => {
      setRefreshTick((v) => v + 1);
      setCanShowSingleUseUpload(isProjectPendingSingleUseUpload(project));
    };
    window.addEventListener('falaq_images_updated', handleUpdate);
    return () => window.removeEventListener('falaq_images_updated', handleUpdate);
  }, [project]);

  const images = getEffectiveProjectImages(project);
  const totalCount = images.length;
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (activeIdx >= totalCount && totalCount > 0) {
      setActiveIdx(0);
    }
  }, [totalCount, activeIdx]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? totalCount - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === totalCount - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveIdx(index);
  };

  const handleCardFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const files: File[] = e.target.files ? Array.from<File>(e.target.files) : [];
    if (!files.length || !project.projectNumber) return;

    setIsUploading(true);
    try {
      await saveProjectImagesPermanently(project.projectNumber, files);
      setActiveIdx(0);
      setRefreshTick((v) => v + 1);
      // Single-use trigger: automatically hide the upload button once images are uploaded
      setCanShowSingleUseUpload(false);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const baseSrc = images[activeIdx] || normalizeImagePath(project.mainImage);
  const currentSrc = !baseSrc.startsWith('data:')
    ? `${baseSrc}?v=2${refreshTick > 0 ? `&t=${refreshTick}` : ''}`
    : baseSrc;

  const getPhotoLabel = (src: string, index: number) => {
    try {
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

  const currentPhotoLabel = getPhotoLabel(baseSrc, activeIdx);

  const projectOrdinalAr: Record<number, string> = {
    1: 'المشروع الأول',
    2: 'المشروع الثاني',
    3: 'المشروع الثالث',
    4: 'المشروع الرابع',
    5: 'المشروع الخامس',
    6: 'المشروع السادس',
    7: 'المشروع السابع',
    8: 'المشروع الثامن',
    9: 'المشروع التاسع',
    10: 'المشروع العاشر',
  };

  const projectNumLabel = isAr 
    ? (projectOrdinalAr[project.projectNumber || 1] || `المشروع رقم (${project.projectNumber || 1})`) 
    : `Project #${project.projectNumber || 1}`;

  return (
    <div
      onClick={() => onOpenModal(project, activeIdx)}
      className={`group relative rounded-sm overflow-hidden bg-white border border-[#E0E1DC] hover:border-[#0E1910] hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isAr ? 'text-right' : 'text-left'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onClick={(e) => e.stopPropagation()}
        onChange={handleCardFileChange}
        className="hidden"
      />

      {/* Dynamic Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#E0E1DC] select-none">
        <img
          key={`${project.id}-${activeIdx}-${refreshTick}`}
          src={currentSrc}
          alt={`${project.title} - ${currentPhotoLabel}`}
          onError={(e) => handleProjectImageError(e.currentTarget)}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap pointer-events-none">
            {/* Project Number badge */}
            <span className="text-[11px] px-2.5 py-0.5 rounded-sm bg-[#0E1910] text-[#F4E95B] font-thmanyah-sans font-th-bold shadow-xs">
              {projectNumLabel}
            </span>
            {/* Category badge */}
            <span className="text-[10px] px-2 py-0.5 rounded-sm bg-white/90 text-[#000000] font-thmanyah-sans font-th-medium shadow-xs">
              {project.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Single-Use Upload Trigger: Only visible for newly added projects until images are selected */}
            {canShowSingleUseUpload && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[10px] font-thmanyah-sans font-th-bold transition-all cursor-pointer shadow-xs bg-[#F4E95B] hover:bg-white text-[#0E1910]"
              >
                <Upload className="w-3 h-3" />
                <span>
                  {isUploading
                    ? (isAr ? 'جاري التثبيت...' : 'Saving...')
                    : (isAr ? 'رفع صور المشروع الجديد' : 'Upload Project Images')}
                </span>
              </button>
            )}

            <div className="w-7 h-7 rounded-sm bg-white/95 text-[#0E1910] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs pointer-events-none">
              {isAr ? <ArrowUpLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Interactive Navigation Arrows (if multiple photos) */}
        {totalCount > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label={isAr ? "الصورة السابقة" : "Previous photo"}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label={isAr ? "الصورة التالية" : "Next photo"}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Bar: Interactive Pagination Dots / Numbers */}
        {totalCount > 1 && (
          <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-end z-10 font-thmanyah-sans text-xs">
            <div className="flex items-center gap-1 bg-black/50 p-1 rounded-sm backdrop-blur-xs">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => handleDotClick(e, i)}
                  aria-label={`${isAr ? 'صورة' : 'Photo'} ${i + 1}`}
                  className={`w-5 h-5 rounded-xs text-[10px] font-th-bold transition-all flex items-center justify-center cursor-pointer ${
                    activeIdx === i
                      ? 'bg-[#F4E95B] text-[#0E1910] scale-110 shadow-xs'
                      : 'bg-white/30 text-white hover:bg-white/60'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Location & Area Meta */}
          <div className="flex items-center justify-between text-xs text-[#343A2F] font-thmanyah-sans">
            <div className="flex items-center gap-1 font-th-medium">
              <MapPin className="w-3.5 h-3.5 text-[#0E1910]" />
              <span>{project.location} ({project.city})</span>
            </div>
            <span className="font-th-bold text-[#000000] px-1.5 py-0.5 bg-[#F5F4F0] border border-[#E0E1DC] rounded-xs">
              {project.area} {t('meterSq')}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display group-hover:text-[#0E1910] transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Project Description excerpt */}
          <p className="text-xs text-[#343A2F] line-clamp-2 leading-relaxed font-thmanyah-text">
            {project.description}
          </p>
        </div>

        {/* Style & Specs Footer */}
        <div className="pt-3 border-t border-[#E0E1DC] flex items-center justify-between text-[11px] font-thmanyah-sans">
          <div className="flex items-center gap-1.5 text-[#343A2F]">
            <Compass className="w-3.5 h-3.5 text-[#0E1910]" />
            <span className="line-clamp-1">{project.architecturalStyle}</span>
          </div>

          <span className="text-[#0E1910] font-th-bold group-hover:underline flex items-center gap-1 shrink-0">
            <span>{t('portfolioViewDetails')}</span>
            <span>{isAr ? '←' : '→'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

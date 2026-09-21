import { PortfolioProject } from '../types';
import { OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Compass, 
} from 'lucide-react';
import { useState } from 'react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { isAr, t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'plan'>('3d');

  if (!project) return null;

  const currentImages = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.mainImage];

  const currentDisplayImage = viewMode === 'plan' && project.floorPlanImage 
    ? project.floorPlanImage 
    : currentImages[selectedImageIndex] || project.mainImage;

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
            
            <div className="hidden sm:flex items-center gap-2 font-thmanyah-sans">
              <span className="text-xs px-2.5 py-0.5 rounded-sm bg-[#0E1910] text-[#F5F4F0] font-th-medium">
                {project.categoryLabel}
              </span>
              <span className="text-xs text-[#343A2F]">
                {project.year}
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
            {/* View Mode Toggle: 3D Render vs 2D Floor Plan */}
            <div className="flex items-center justify-between font-thmanyah-sans">
              <span className="text-xs text-[#343A2F]">
                {viewMode === '3d' 
                  ? (isAr ? 'لقطة ثلاثية الأبعاد واقعية' : 'Photorealistic 3D Visualization') 
                  : (isAr ? 'المخطط الهندسي والمسقط الأفقي' : '2D Floor Plan Blueprints')}
              </span>
              
              <div className="flex items-center gap-1 bg-[#F5F4F0] p-1 rounded-sm border border-[#E0E1DC] text-xs">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 rounded-sm font-th-bold transition-all cursor-pointer ${
                    viewMode === '3d' ? 'bg-[#0E1910] text-[#F5F4F0]' : 'text-[#343A2F] hover:text-[#000000]'
                  }`}
                >
                  {isAr ? 'الرندر ثلاثي الأبعاد 3D' : '3D Render'}
                </button>
                {project.floorPlanImage && (
                  <button
                    onClick={() => setViewMode('plan')}
                    className={`px-3 py-1 rounded-sm font-th-bold transition-all cursor-pointer ${
                      viewMode === 'plan' ? 'bg-[#0E1910] text-[#F5F4F0]' : 'text-[#343A2F] hover:text-[#000000]'
                    }`}
                  >
                    {isAr ? 'المخطط المعماري 2D' : '2D Blueprint'}
                  </button>
                )}
              </div>
            </div>

            {/* Image Stage */}
            <div className="relative h-64 sm:h-96 rounded-sm overflow-hidden border border-[#E0E1DC] bg-[#E0E1DC]">
              <img
                src={currentDisplayImage}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Architectural Style Tag */}
              <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} bg-[#0E1910]/90 px-2.5 py-1 rounded-sm text-xs text-[#F5F4F0] font-thmanyah-sans flex items-center gap-1.5`}>
                <Compass className="w-3.5 h-3.5 text-[#F4E95B]" />
                <span>{isAr ? `النمط: ${project.architecturalStyle}` : `Style: ${project.architecturalStyle}`}</span>
              </div>
            </div>

            {/* Thumbnails Gallery (if 3D mode) */}
            {viewMode === '3d' && currentImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {currentImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-sm overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImageIndex === idx ? 'border-[#0E1910]' : 'border-[#E0E1DC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="project thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
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
              <span className="text-[11px] text-[#343A2F] block">{isAr ? 'سنة التنفيذ:' : 'Completion Year:'}</span>
              <span className="text-base font-th-bold text-[#000000]">{project.year}</span>
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


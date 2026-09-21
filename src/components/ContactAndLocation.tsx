import { useState, type FormEvent } from 'react';
import { OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Navigation
} from 'lucide-react';

export default function ContactAndLocation() {
  const { isAr, t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    projectType: isAr ? 'فيلا سكنية' : 'Residential Villa',
    landArea: '',
    selectedPackage: isAr ? 'الباقة المميزة (الأكثر طلباً)' : 'Premium Package',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = isAr ? `مرحباً مكتب فلق للإستشارات الهندسية (FEC)،
طلب استشارة هندسية جديد:
- الاسم: ${formData.fullName}
- رقم الجوال: ${formData.phone}
- نوع المشروع: ${formData.projectType}
- مساحة الأرض: ${formData.landArea || 'غير محدد'} م²
- الباقة المفضلة: ${formData.selectedPackage}
- ملاحظات: ${formData.notes || 'لا يوجد'}

أرجو التواصل معي لتحديد موعد.` : `Hello Falaq Engineering Consultants (FEC),
New consultation inquiry:
- Name: ${formData.fullName}
- Phone: ${formData.phone}
- Project Type: ${formData.projectType}
- Plot Area: ${formData.landArea || 'Not specified'} m²
- Selected Package: ${formData.selectedPackage}
- Notes: ${formData.notes || 'None'}

Please get in touch to schedule a meeting.`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className={`py-20 bg-[#F5F4F0] relative overflow-hidden border-b border-[#E0E1DC] ${isAr ? 'text-right' : 'text-left'}`}>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium">
            <MapPin className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('contactBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-th-heavy text-[#000000] font-thmanyah-display">
            {t('contactTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#343A2F] leading-relaxed font-thmanyah-text">
            {t('contactIntro')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Interactive Office Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Info Box */}
            <div className="p-6 sm:p-7 rounded-sm bg-white border border-[#E0E1DC] space-y-5 shadow-xs font-thmanyah-sans">
              <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display border-b border-[#E0E1DC] pb-3">
                {t('contactOfficeDetails')}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] flex items-center justify-center text-[#0E1910] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-th-bold text-[#000000] block mb-0.5">{isAr ? 'موقع المكتب:' : 'Office Location:'}</span>
                    <p className="text-[#343A2F] leading-relaxed font-thmanyah-text">
                      {isAr ? OFFICE_INFO.locationAddress : 'King Fahd Road, Al-Rass, Al-Qassim Province, Saudi Arabia'}
                    </p>
                    <span className="text-[11px] text-[#000000] font-th-medium">{isAr ? 'مدينة الرس - منطقة القصيم' : 'Al-Rass City - Al-Qassim Region'}</span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] flex items-center justify-center text-[#0E1910] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-th-bold text-[#000000] block mb-0.5">{isAr ? 'أوقات العمل واستقبال الاستشارات:' : 'Office Working Hours:'}</span>
                    <p className="text-[#343A2F] leading-relaxed font-thmanyah-text">
                      {isAr ? OFFICE_INFO.workingHours : 'Sunday - Thursday: 8:00 AM - 9:00 PM | Saturday: 4:00 PM - 9:00 PM'}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] flex items-center justify-center text-[#0E1910] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-th-bold text-[#000000] block mb-0.5">{isAr ? 'الهاتف المباشر والواتساب:' : 'Direct Phone & WhatsApp:'}</span>
                    <a href={`tel:${OFFICE_INFO.phone}`} className="text-[#000000] hover:text-[#343A2F] block text-left font-th-bold text-sm" dir="ltr">
                      {OFFICE_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] flex items-center justify-center text-[#0E1910] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-th-bold text-[#000000] block mb-0.5">{isAr ? 'البريد الإلكتروني المعتمد:' : 'Official Email:'}</span>
                    <a href={`mailto:${OFFICE_INFO.email}`} className="text-[#0E1910] hover:underline font-th-medium text-xs">
                      {OFFICE_INFO.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-3 border-t border-[#E0E1DC]">
                <a
                  href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(isAr ? 'مرحباً مكتب فلق للإستشارات الهندسية (FEC)، أود حجز موعد زيارة للمكتب بالرس.' : 'Hello Falaq (FEC), I would like to book a consultation visit at your Al-Rass office.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-sm bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] font-th-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-thmanyah-sans"
                >
                  <MessageSquare className="w-4 h-4 text-[#F4E95B]" />
                  <span>{t('contactDirectWhatsApp')}</span>
                </a>
              </div>
            </div>

            {/* Google Map Embed & Navigation */}
            <div className="rounded-sm bg-white border border-[#E0E1DC] overflow-hidden shadow-xs">
              <div className="p-3.5 bg-[#F5F4F0] border-b border-[#E0E1DC] flex items-center justify-between font-thmanyah-sans">
                <div className="flex items-center gap-2 text-xs font-th-bold text-[#000000]">
                  <Navigation className="w-3.5 h-3.5 text-[#0E1910]" />
                  <span>{t('contactMapTitle')}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${OFFICE_INFO.coordinates.lat},${OFFICE_INFO.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#0E1910] hover:underline flex items-center gap-1 font-th-medium"
                >
                  <span>{t('contactOpenInGoogleMaps')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map iFrame */}
              <div className="h-52 w-full relative bg-[#E0E1DC]">
                <iframe
                  title="موقع مكتب فلق للاستشارات الهندسية بالرس"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57560.89311651842!2d43.4682055628148!3d25.86475739343354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1581e285a815a5bb%3A0x6338b7074cfa35ec!2sAr%20Rass%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(30%) contrast(105%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          {/* Consultation Request Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-[#E0E1DC] p-6 sm:p-7 space-y-5 shadow-xs font-thmanyah-sans">
            
            <div>
              <h3 className="text-xl sm:text-2xl font-th-heavy text-[#000000] font-thmanyah-display">
                {t('contactFormTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-[#343A2F] mt-1 font-thmanyah-text">
                {t('contactFormSubtitle')}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-center space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-[#0E1910] text-[#F5F4F0] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5 text-[#F4E95B]" />
                </div>
                <h4 className="text-base font-th-bold text-[#000000] font-thmanyah-display">{isAr ? 'تم إرسال طلبك بنجاح!' : 'Your Request Has Been Submitted!'}</h4>
                <p className="text-xs text-[#343A2F] font-thmanyah-text">
                  {isAr 
                    ? 'تم فتح محادثة الواتساب المباشرة مع مكتب فلق الهندسية (FEC). سيقوم مهندسنا بالرد عليك في أقرب وقت.'
                    : 'WhatsApp conversation with Falaq Engineers (FEC) has been opened. Our consultant will respond shortly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#0E1910] underline hover:text-[#000000] pt-1 block mx-auto cursor-pointer font-th-bold"
                >
                  {isAr ? 'إرسال طلب استشارة آخر' : 'Submit another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-th-bold text-[#000000] mb-1 font-thmanyah-display">
                      {t('contactFullName')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? "مثال: عبدالله الشمري" : "e.g. Abdullah Al-Shammari"}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-[#000000] placeholder-[#343A2F]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0E1910]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-th-bold text-[#000000] mb-1 font-thmanyah-display">
                      {t('contactPhone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-[#000000] placeholder-[#343A2F]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0E1910] font-th-bold ${isAr ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>

                {/* Project Type & Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-th-bold text-[#000000] mb-1 font-thmanyah-display">
                      {t('contactProjectType')}
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-[#000000] text-xs sm:text-sm focus:outline-none focus:border-[#0E1910]"
                    >
                      {isAr ? (
                        <>
                          <option value="فيلا سكنية">فيلا سكنية</option>
                          <option value="قصر سكني فاخر">قصر سكني فاخر</option>
                          <option value="مبنى تجاري / مكاتب">مبنى تجاري / مكاتب</option>
                          <option value="شاليه / استراحة">شاليه / استراحة</option>
                          <option value="تصميم داخلي وديكور">تصميم داخلي وديكور</option>
                          <option value="إشراف هندسي واستخراج رخصة">إشراف هندسي واستخراج رخصة</option>
                        </>
                      ) : (
                        <>
                          <option value="Residential Villa">Residential Villa</option>
                          <option value="Luxury Palace / Mansion">Luxury Palace / Mansion</option>
                          <option value="Commercial Complex / Offices">Commercial Complex / Offices</option>
                          <option value="Chalet / Private Resort">Chalet / Private Resort</option>
                          <option value="Interior Architecture & Majlis">Interior Architecture & Majlis</option>
                          <option value="Supervision & Permit Extraction">Supervision & Permit Extraction</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-th-bold text-[#000000] mb-1 font-thmanyah-display">
                      {t('contactLandArea')}
                    </label>
                    <input
                      type="number"
                      placeholder={isAr ? "مثال: 450" : "e.g. 450"}
                      value={formData.landArea}
                      onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-[#000000] placeholder-[#343A2F]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0E1910] font-th-bold"
                    />
                  </div>
                </div>

                {/* Package Interest */}
                <div>
                  <label className="block text-xs font-th-bold text-[#000000] mb-1 font-thmanyah-display">
                    {t('contactPreferredPackage')}
                  </label>
                  <select
                    value={formData.selectedPackage}
                    onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-[#000000] text-xs sm:text-sm focus:outline-none focus:border-[#0E1910]"
                  >
                    {isAr ? (
                      <>
                        <option value="الباقة المميزة (الأكثر طلباً)">الباقة المميزة (واجهات 3D + حدائق + رخصة)</option>
                        <option value="الباقة الاقتصادية">الباقة الاقتصادية (مخططات معتمدة + رخصة بلدي)</option>
                        <option value="الباقة الشاملة (تصميم + داخلي + إشراف + شهادة إشغال)">الباقة الشاملة (تسليم متكامل)</option>
                        <option value="استشارة هندسية عامة">استشارة هندسية عامة / مراجعة كود</option>
                      </>
                    ) : (
                      <>
                        <option value="Premium Package (Most Popular)">Premium Package (3D Facades + Landscape + Balady Permit)</option>
                        <option value="Standard Economy Package">Economy Package (Approved Blueprints + Permit)</option>
                        <option value="Comprehensive Royal Package">Comprehensive Package (Design + Interior + Supervision + IDI)</option>
                        <option value="General Engineering Consultation">General Consultation / Code Review</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-th-bold text-[#000000] mb-1 font-thmanyah-display">
                    {t('contactNotes')}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={isAr 
                      ? "اكتب هنا أي تفاصيل تود مراعاتها (مثل: نمط الطراز السلماني، عدد الغرف، الرغبة في مسبح أو بدروم، إلخ)..."
                      : "Enter any specific preferences (e.g., Salmani style, bedroom count, basement, infinity pool, etc.)..."}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-[#000000] placeholder-[#343A2F]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0E1910] font-thmanyah-text"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-sm bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] font-th-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-thmanyah-sans"
                >
                  <Send className="w-4 h-4 text-[#F4E95B]" />
                  <span>{t('contactSubmitBtn')}</span>
                </button>

                <p className="text-[11px] text-center text-[#343A2F] font-thmanyah-text">
                  {isAr ? '🔒 بياناتك سرية ومحمية، ولن يتم مشاركتها مطلقاً.' : '🔒 Your data is private, secure, and will never be shared.'}
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

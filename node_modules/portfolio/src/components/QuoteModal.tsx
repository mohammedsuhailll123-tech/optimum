import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, CheckCircle2, AlertTriangle } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ar';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    productsRequired: '',
    quantity: '',
    projectDetails: '',
    contactMethod: 'whatsapp'
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const content = {
    en: {
      title: "Request a Professional Quote",
      subtitle: "Submit your project requirements and our engineering sourcing desk will respond within 2 hours.",
      company: "Company Name",
      person: "Contact Person Name",
      email: "Corporate Email Address",
      phone: "Phone / WhatsApp Number",
      products: "Products Required",
      quantity: "Est. Quantity / Scope",
      details: "Project Details & Specs",
      method: "Preferred Contact Method",
      methods: {
        whatsapp: "WhatsApp (Fastest)",
        email: "Email Inbox",
        call: "Direct Call"
      },
      submit: "Submit Quote Request",
      successMsg: "Form submitted! Opening inquiry channels now...",
      validationMsg: "Please fill out all required fields."
    },
    ar: {
      title: "طلب عرض سعر رسمي",
      subtitle: "أدخل مواصفات ومتطلبات مشروعك وسيقوم مكتب التوريد الهندسي بالرد عليك في غضون ساعتي عمل.",
      company: "اسم الشركة / المؤسسة",
      person: "اسم الشخص المسؤول",
      email: "البريد الإلكتروني للشركة",
      phone: "رقم الجوال / الواتساب",
      products: "المنتجات والمواد المطلوبة",
      quantity: "الكمية التقديرية / النطاق",
      details: "تفاصيل ومواصفات المشروع",
      method: "وسيلة التواصل المفضلة",
      methods: {
        whatsapp: "الواتساب (الأسرع)",
        email: "البريد الإلكتروني",
        call: "اتصال مباشر"
      },
      submit: "إرسال طلب تسعير",
      successMsg: "تم تقديم الطلب! جاري فتح قنوات التواصل...",
      validationMsg: "يرجى ملء جميع الحقول المطلوبة."
    }
  };

  const c = content[lang];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.phone || !formData.productsRequired) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('success');

    // Build Formatted message blocks for WhatsApp & Mail
    const recipientPhone = '966563539227';
    const recipientEmail = 'optimumsupply313@gmail.com';
    
    let messageText = '';
    if (lang === 'ar') {
      messageText = `مرحباً مؤسسة أوبتيموم للتوريد التجاري،\n\n` +
                    `أود طلب عرض سعر رسمي للمشروع:\n\n` +
                    `- اسم الشركة: ${formData.companyName}\n` +
                    `- اسم المسؤول: ${formData.contactPerson}\n` +
                    `- الجوال: ${formData.phone}\n` +
                    `- البريد الإلكتروني: ${formData.email || 'غير محدد'}\n` +
                    `- المواد المطلوبة: ${formData.productsRequired}\n` +
                    `- الكمية التقديرية: ${formData.quantity || 'غير محدد'}\n` +
                    `- وسيلة التواصل المفضلة: ${formData.contactMethod}\n\n` +
                    `تفاصيل إضافية:\n${formData.projectDetails || 'لا توجد تفاصيل إضافية'}`;
    } else {
      messageText = `Hello Optimum Supply Trading Est.,\n\n` +
                    `I would like to request a professional quotation:\n\n` +
                    `- Company Name: ${formData.companyName}\n` +
                    `- Contact Person: ${formData.contactPerson}\n` +
                    `- Phone: ${formData.phone}\n` +
                    `- Email: ${formData.email || 'Not provided'}\n` +
                    `- Products Required: ${formData.productsRequired}\n` +
                    `- Quantity/Scope: ${formData.quantity || 'Not provided'}\n` +
                    `- Preferred Contact: ${formData.contactMethod}\n\n` +
                    `Project Details:\n${formData.projectDetails || 'No additional details'}`;
    }

    const whatsappUrl = `https://wa.me/${recipientPhone}?text=${encodeURIComponent(messageText)}`;
    const emailSubject = lang === 'ar' ? `طلب عرض سعر - ${formData.companyName}` : `RFQ Quote Request - ${formData.companyName}`;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageText)}`;

    // Set short delay to let success animation play
    setTimeout(() => {
      if (formData.contactMethod === 'whatsapp') {
        window.open(whatsappUrl, '_blank');
      } else {
        window.location.href = mailtoUrl;
      }
      onClose();
      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        productsRequired: '',
        quantity: '',
        projectDetails: '',
        contactMethod: 'whatsapp'
      });
      setStatus('idle');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050816]/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-lg w-full glass-panel p-6 rounded-2xl shadow-2xl z-10 text-ink border-t border-t-accent-blue/40 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Trigger Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-glass-border/30 text-body hover:text-ink transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="mb-6 mt-2 text-left rtl:text-right">
              <h3 className="text-base md:text-lg font-black tracking-tight text-ink border-b border-glass-border pb-2.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse" />
                {c.title}
              </h3>
              <p className="text-[11px] text-body mt-2 leading-relaxed font-medium">
                {c.subtitle}
              </p>
            </div>

            {/* Forms body */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left rtl:text-right">
              {/* Dual inputs rows: Company & Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-mute uppercase mb-1 font-bold">{c.company} *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="px-3.5 py-2.5 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-mute uppercase mb-1 font-bold">{c.person} *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                    className="px-3.5 py-2.5 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  />
                </div>
              </div>

              {/* Dual inputs: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-mute uppercase mb-1 font-bold">{c.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-3.5 py-2.5 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue text-left"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-mute uppercase mb-1 font-bold">{c.phone} *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+966 5x xxx xxxx"
                    className="px-3.5 py-2.5 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue text-left"
                  />
                </div>
              </div>

              {/* Dual inputs: Products & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-mute uppercase mb-1 font-bold">{c.products} *</label>
                  <input
                    type="text"
                    name="productsRequired"
                    value={formData.productsRequired}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Industrial Valves, Power Cables"
                    className="px-3.5 py-2.5 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-mute uppercase mb-1 font-bold">{c.quantity}</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g. 500 pcs, 3000 meters"
                    className="px-3.5 py-2.5 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  />
                </div>
              </div>

              {/* Project details area */}
              <div className="flex flex-col">
                <label className="text-[10px] font-mono text-mute uppercase mb-1 font-bold">{c.details}</label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  rows={3}
                  className="px-3.5 py-2.5 text-xs rounded-lg border border-glass-border bg-glass-bg text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue resize-none"
                />
              </div>

              {/* Contact Method option dropdown */}
              <div className="flex flex-col">
                <label className="text-[10px] font-mono text-mute uppercase mb-1 font-bold">{c.method}</label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleInputChange}
                  className="px-3.5 py-2.5 text-xs rounded-lg border border-glass-border bg-canvas text-ink focus:outline-none focus:ring-1 focus:ring-accent-blue font-semibold cursor-pointer"
                >
                  <option value="whatsapp">{c.methods.whatsapp}</option>
                  <option value="email">{c.methods.email}</option>
                </select>
              </div>

              {/* Action trigger button */}
              <button
                type="submit"
                disabled={status === 'success'}
                className="w-full mt-4 px-5 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan text-white text-xs font-bold hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer shadow-md shadow-accent-blue/15"
              >
                {formData.contactMethod === 'whatsapp' ? (
                  <Send className="w-4 h-4" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                <span>{c.submit}</span>
              </button>

              {/* Submit Feedback indicators */}
              {status === 'success' && (
                <div className="flex items-center gap-2 justify-center text-xs text-emerald-500 font-bold font-mono mt-3 animate-pulse bg-emerald-500/10 py-2 rounded-lg border border-emerald-500/25">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{c.successMsg}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 justify-center text-xs text-rose-500 font-bold font-mono mt-3 bg-rose-500/10 py-2 rounded-lg border border-rose-500/25">
                  <AlertTriangle className="w-4 h-4 animate-bounce" />
                  <span>{c.validationMsg}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default QuoteModal;

import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      aria-labelledby="contact-us-heading"
      className="py-12 lg:py-16 bg-slate-50/70 border-b border-gray-200/80"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Top Header: Contact Us on left, View All Departments on right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2
              id="contact-us-heading"
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
            >
              {t('contact.title', 'Contact Us')}
            </h2>
          </div>

          <Link
            to="/government"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#003893] hover:text-blue-800 hover:underline transition-colors group"
          >
            <span>
              {t('contact.viewAllDepartments', 'View All Departments')}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Main Contact Cards (Phone, Email, Address) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* 1. Phone Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003893] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                {t('contact.phone', 'PHONE')}
              </div>
              <a
                href="tel:0464190268"
                className="text-sm sm:text-base font-bold text-[#003893] hover:underline block mt-0.5 truncate"
              >
                (046) 419-0268
              </a>
              <div className="text-xs text-gray-500 mt-1">
                {t('contact.phoneHours', 'Mon–Fri, 8AM–5PM')}
              </div>
            </div>
          </div>

          {/* 2. Email Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                {t('contact.email', 'EMAIL')}
              </div>
              <a
                href="mailto:contact@trece.gov.ph"
                className="text-sm sm:text-base font-bold text-emerald-700 hover:underline block mt-0.5 truncate"
              >
                contact@trece.gov.ph
              </a>
              <div className="text-xs text-gray-500 mt-1">
                {t('contact.emailResponse', 'Response within 2 business days')}
              </div>
            </div>
          </div>

          {/* 3. Address Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                {t('contact.address', 'ADDRESS')}
              </div>
              <div className="text-sm sm:text-base font-bold text-amber-800 mt-0.5 truncate">
                {t('contact.cityHall', 'City Hall, Trece Martires City')}
              </div>
              <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                {t(
                  'contact.addressDetail',
                  'Gov. Drive, Brgy. San Agustin, Trece Martires, Cavite 4109'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

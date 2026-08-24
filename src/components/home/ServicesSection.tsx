import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

import { serviceCategories } from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

export default function ServicesSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const { t } = useTranslation();

  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[
      iconName as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const displayedCategories = serviceCategories.categories as Category[];

  return (
    <Section className="py-12 lg:py-16 bg-gray-50/50 border-b border-gray-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2.5 py-1 rounded">
            {t('services.badge', 'Public Services Directory')}
          </span>
          <Heading
            level={2}
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2"
          >
            {title || t('services.title', 'City Services & Information')}
          </Heading>
          <Text className="text-gray-600 mt-1 max-w-2xl text-sm sm:text-base">
            {description ||
              t(
                'services.description',
                'Access official City of Trece Martires government services quickly and easily.'
              )}
          </Text>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#003893] hover:text-blue-700 transition-colors group shrink-0"
        >
          <span>{t('services.viewAll', 'View all categories')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayedCategories.map(category => (
          <Link
            key={category.slug}
            to={`/services/${category.slug}`}
            className="group flex flex-col justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#003893] group-hover:bg-[#003893] group-hover:text-white flex items-center justify-center mb-3.5 transition-colors">
                {getIcon(category.icon)}
              </div>

              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors mb-2 leading-snug">
                {category.category}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                {category.description}
              </p>
            </div>

            <div className="flex items-center text-xs font-semibold text-[#003893] group-hover:translate-x-1 transition-transform">
              <span>{t('services.learnMore', 'Learn more')}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

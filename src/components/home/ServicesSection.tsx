import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
  ArrowRight,
  Heart,
  GraduationCap,
  Building2,
  Users,
  Wheat,
  Wrench,
  Trash2,
  TreePine,
  Shield,
  Home as HomeIcon,
  Briefcase,
  Store,
  FileCheck,
  TrendingUp,
  Baby,
  AlertTriangle,
  FileText,
  LayoutGrid,
} from 'lucide-react';
import { serviceCategories } from '../../data/services/yamlLoader';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  GraduationCap,
  Building2,
  Users,
  Wheat,
  Wrench,
  Trash2,
  TreePine,
  Shield,
  Home: HomeIcon,
  Briefcase,
  Store,
  FileCheck,
  TrendingUp,
  Baby,
  AlertTriangle,
  FileText,
};

const getIcon = (
  iconName: string
): React.ComponentType<{ className?: string }> => {
  return ICON_MAP[iconName] || FileText;
};

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

  const displayedCategories = (
    serviceCategories.categories as Category[]
  ).slice(0, 5);

  return (
    <Section className="py-12 lg:py-16 bg-slate-50/60 border-b border-gray-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <Heading
            level={2}
            className="text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            {title || t('services.title', 'City Services & Information')}
          </Heading>
          <Text className="text-gray-600 mt-1 max-w-2xl text-sm sm:text-base">
            {description ||
              t(
                'services.description',
                'Access official City of Trece Martires government services, permits, health care, and citizen charters quickly and easily.'
              )}
          </Text>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-900 hover:text-zinc-700 transition-colors group shrink-0 bg-white px-4 py-2.5 rounded-xl border border-zinc-200 shadow-2xs hover:border-zinc-300"
        >
          <span>{t('services.viewAll', 'View all 10 categories')}</span>
          <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedCategories.map(category => {
          const IconComp = getIcon(category.icon);
          return (
            <Link
              key={category.slug}
              to={`/services/${category.slug}`}
              className="group flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-zinc-200 hover:border-zinc-400 hover:shadow-xs transition-all duration-150"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center mb-4 transition-colors">
                  <IconComp className="w-5 h-5 text-zinc-900" />
                </div>

                <h3 className="text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors mb-2 leading-snug">
                  {category.category}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center text-xs font-semibold text-zinc-900 pt-3 border-t border-zinc-100 group-hover:translate-x-0.5 transition-transform">
                <span>{t('services.learnMore', 'Browse guides')}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-zinc-600" />
              </div>
            </Link>
          );
        })}

        {/* 6th Card: View All Services */}
        <Link
          to="/services"
          className="group flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-zinc-300 hover:border-zinc-900 hover:shadow-xs transition-all duration-150 relative"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center transition-colors">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-zinc-600 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-md">
                {t('services.allCategoriesCount', '10 Categories')}
              </span>
            </div>

            <h3 className="text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors mb-2 leading-snug">
              {t('services.viewAllCardTitle', 'View All Services')}
            </h3>

            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              {t(
                'services.viewAllCardDesc',
                'Explore the full directory of government services, requirements, citizen charters, and step-by-step guides.'
              )}
            </p>
          </div>

          <div className="flex items-center text-xs font-semibold text-zinc-900 pt-3 border-t border-zinc-100 group-hover:translate-x-1 transition-transform">
            <span>
              {t('services.viewAllCardAction', 'Explore full directory')}
            </span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-zinc-600" />
          </div>
        </Link>
      </div>
    </Section>
  );
}

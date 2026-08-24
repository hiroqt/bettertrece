import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

const Government: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return governmentCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = LucideIcons[
    categoryData?.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description={`All services provided by the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you need for citizenship, business, education, and more.`}
          keywords="government services, public services, local government, civic services"
        />
        <GovernmentActivitySection
          title={`All local government services`}
          description={`All services provided by the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you need for citizenship, business, education, and more.`}
        />
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Icon className="h-8 w-8 mb-4 text-primary-600 rounded-md" />
        <Heading>{categoryData.category || category}</Heading>
        <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Text>Loading services...</Text>
          </div>
        ) : (
          <>
            {categoryIndex.title && (
              <Heading level={3}>{categoryIndex.title}</Heading>
            )}
            {categoryIndex.description && (
              <Text className="text-gray-600 mb-4">
                {categoryIndex.description}
              </Text>
            )}
            {categoryIndex.layout === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/government/${category}/${subcategory.slug}`}
                  >
                    <Card
                      hoverable
                      className="h-full border-t-4 border-primary-500"
                    >
                      <CardContent>
                        <h4 className="text-lg font-medium text-gray-900">
                          {subcategory.name}
                        </h4>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {subcategory.description}
                          </p>
                        )}
                        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                          {categoryData.category || category}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/government/${category}/${subcategory.slug}`}
                    className="block group"
                  >
                    <Card
                      hoverable
                      className="transition-all hover:border-[#003893] hover:shadow-md"
                    >
                      <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                            {subcategory.name}
                          </h4>
                          {subcategory.description && (
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {subcategory.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-800">
                            {categoryData.category || category}
                          </span>
                          <LucideIcons.ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#003893] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
};

export default Government;

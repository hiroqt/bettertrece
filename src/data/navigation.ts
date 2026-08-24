import type { NavigationItem } from '../types';
import { serviceCategories as servicesData } from './yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
    children: (servicesData.categories as Category[]).map(category => ({
      label: category.category,
      href: `/services/${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government',
    children: [
      {
        label: 'Executive Department',
        href: '/government/departments/executive',
      },
      {
        label: 'Legislative Department',
        href: '/government/departments/legislative',
      },
      { label: 'City Departments', href: '/government/departments' },
      { label: 'Barangays of Trece Martires', href: '/government#barangays' },
      { label: 'News & Announcements', href: '/government/news' },
      {
        label: 'Guides & Regulations',
        href: '/government/guides-and-regulations',
      },
    ],
  },
  {
    label: 'Transparency',
    href: '/government/transparency-documents',
    children: [
      {
        label: 'Full Disclosure Policy',
        href: '/government/transparency-documents',
      },
      {
        label: 'City Ordinances & Resolutions',
        href: '/government/guides-and-regulations',
      },
      {
        label: 'Public Consultations',
        href: '/government/public-consultations',
      },
      { label: 'Freedom of Information (FOI)', href: 'https://www.foi.gov.ph' },
    ],
  },
  {
    label: 'Statistics',
    href: '/demographics',
    children: [
      { label: 'City Demographics & 13 Barangays', href: '/demographics' },
      {
        label: 'PSA Classification Systems',
        href: '/demographics#psa-classifications',
      },
      {
        label: 'Reports & Open Data',
        href: '/government/reports-and-statistics',
      },
    ],
  },
  {
    label: 'Contact',
    href: '#contact',
  },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'About Trece Martires',
      links: [
        { label: 'About the City Portal', href: '/about' },
        { label: 'The 13 Martyrs History', href: '/about' },
        { label: 'City Barangays & PSGC', href: '/demographics' },
        { label: 'Demographics & Statistics', href: '/demographics' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Civic Tech Community', href: 'https://bettergov.ph' },
      ],
    },
    {
      title: 'Popular Services',
      links: [
        { label: 'Business & Permits (BPLO)', href: '/services/business' },
        {
          label: 'City Health Office Services',
          href: '/services/health-services',
        },
        { label: 'Education & Scholarships', href: '/services/education' },
        {
          label: 'Garbage & Waste Disposal',
          href: '/services/garbage-waste-disposal',
        },
        {
          label: 'Social Welfare & Assistance',
          href: '/services/social-welfare',
        },
        { label: 'Housing & Land Use', href: '/services/housing-land-use' },
      ],
    },
    {
      title: 'City Government',
      links: [
        { label: 'City Departments', href: '/government/departments' },
        {
          label: 'City Council & Ordinances',
          href: '/government/departments/legislative',
        },
        {
          label: 'Transparency & FOI',
          href: '/government/transparency-documents',
        },
        {
          label: 'Reports & Statistics',
          href: '/government/reports-and-statistics',
        },
        { label: 'Emergency Hotlines', href: '#emergency' },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com/trecemartirescity' },
    { label: 'Twitter', href: 'https://twitter.com/trecemartires' },
    { label: 'Instagram', href: 'https://instagram.com/trecemartirescity' },
    { label: 'YouTube', href: 'https://youtube.com/@trecemartirescity' },
  ],
};

import { Breadcrumbs } from '@/components/breadcrumbs';
import React from 'react'
import { users } from '@/constants/data';
import { ProductClient } from '@/components/tables/Products/Products';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Products', link: '/dashboard/Products' }
];
const page = () => {
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <ProductClient />
    </div>
  );
}

export default page

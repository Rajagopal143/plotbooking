import { Breadcrumbs } from '@/components/breadcrumbs';
import React from 'react'
import { users } from '@/constants/data';
import { ProjectClient } from '@/components/tables/projects-tables/project';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Projects', link: '/dashboard/projects' }
];
const page = () => {
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <ProjectClient />
    </div>
  );
}

export default page

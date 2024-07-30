import { Breadcrumbs } from '@/components/breadcrumbs';
import React from 'react'
import { users } from '@/constants/data';
import { ProjectClient } from '@/components/tables/projects-tables/project';
import { SceneClient } from '@/components/tables/scene-tables/scene';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'scene', link: '/dashboard/scene' }
];
const page = () => {
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <SceneClient />
    </div>
  );
}

export default page

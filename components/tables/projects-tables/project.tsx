'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface ProductsClientProps {
  data: User[];
}

export const ProjectClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Projects (${data.length})`}
          description="Manage Projects "
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/project/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="Project" columns={columns} data={data} />
    </>
  );
};

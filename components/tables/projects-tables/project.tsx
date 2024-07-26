'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';



export const ProjectClient= () => {
  const router = useRouter();
  const [projects, setProjects] = useState<any>();
  const { data: session }: { data: any } = useSession();

      useEffect(() => {
        const fetchProjects = async () => {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/project/organization/${session.user.id}`;
          console.log(url, session.token);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/project/organization/${session.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${session.token}`
              }
            }
          );
          const data = await response.json();
          console.log(data);
          setProjects(data);
        };

        fetchProjects();
      }, []);
 

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Projects `}
          description="Manage Projects "
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/projects/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      <Separator />
      {/* <DataTable searchKey="Project" columns={columns} data={data} /> */}
    </>
  );
};

const fetchprojects = async (token:string,id:string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/project/organization/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {}
};

'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Link from 'next/link';
interface Project {
  id: string;
  name: string;
  location: string;
  floorplan: string;
  link: string;
}

export const ProjectClient = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const { data: session, status }:any= useSession();

  useEffect(() => {
    const fetchProjects = async () => {
      if (status === 'authenticated') {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/project/organization/${session.user.id}`;
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${session.token}`
            }
          });
          const data = await response.json();
          const table = data.projects.map((pro:any) => ({
            id: pro._id,
            name: pro.ProjectName,
            location: pro.location,
            floorplan: pro.imageUrl,
            link: `http://127.0.0.1:5501/index.html?id=${pro.organizationId}`
          }));
          setProjects(table);
        } catch (error) {
          console.error('Failed to fetch projects:', error);
        }
      }
    };

    fetchProjects();
  }, [session, status]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Projects `} description="Manage Projects " />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/project/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      <Separator />
      {projects.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((data:any, index) => (
                <TableHead key={index} className="w-[100px]">
                  {data.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((pro, index) => (
              <TableRow key={index}>
                <TableCell>{pro.id}</TableCell>
                <TableCell>{pro.name}</TableCell>
                <TableCell>{pro.location}</TableCell>
                <TableCell>
                  <Link href={pro.floorplan}>
                    <Button> Open Image</Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={pro.link}>
                    <Button> Open Project</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

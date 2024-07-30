'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';


export const SceneClient= () => {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const { data: session }: { data: any } = useSession();

     useEffect(() => {
       if (!session) return; // Check if session is available

       const fetchProjects = async () => {
         try {
           const url = `${process.env.NEXT_PUBLIC_API_URL}/api/scene/${session.user.id}`;
           const response = await fetch(url, {
             headers: {
               Authorization: `Bearer ${session.token}`
             }
           });

           if (!response.ok) {
             throw new Error('Network response was not ok');
           }

           const data = await response.json();
           const table = data.map((pro: any) => ({
             id: pro._id,
             ProjectType: pro.ProjectType,
             spaceType: pro.spaceType,
             Image: pro.ImgUrl
           }));
           setProjects(table);
         } catch (error) {
           console.error('Error fetching projects:', error);
         }
       };

       fetchProjects();
     }, [session]);
 

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Scene `} description="Manage Scene " />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/scene/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add scene
        </Button>
      </div>
      <Separator />
      {projects && (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((data: any, index) => {
                return (
                  <TableHead key={index} className="w-[100px]">
                    {data.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((pro: any, index) => (
              <TableRow key={index}>
                <TableCell>{pro.id}</TableCell>
                <TableCell>{pro.ProjectType}</TableCell>
                <TableCell>{pro.spaceType}</TableCell>
                <TableCell>
                  <Link href={pro.Image}>
                    <Button>Open Image</Button>
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



const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'S.NO'
  },
  {
    accessorKey: 'ProjectType',
    header: 'ProjectType'
  },
  {
    accessorKey: 'spaceType',
    header: 'spaceType'
  },
  {
    accessorKey: 'Image',
    header: 'Image'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
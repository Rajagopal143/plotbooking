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


export const ProjectClient= () => {
  const router = useRouter();
  const [projects, setProjects] = useState();
  const { data: session }: { data: any } = useSession();

      useEffect(() => {
        const fetchProjects = async () => {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/project/organization/${session.user.id}`;
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/project/organization/${session.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${session.token}`
              }
            }
          );
          const data = await response.json();
          const table:any =[]
          data.projects.forEach((pro:any) => {
            const dumy: any = {};
            dumy['id'] = pro._id;
            dumy['name'] = pro.ProjectName;
            dumy['location'] = pro.location;
            dumy['floorplan'] = pro.imageUrl;
            dumy['link'] = `http://127.0.0.1:5501/index.html?id=${pro.organizationId}`;
            table.push(dumy)
          });
          setProjects(table);
        };

        fetchProjects();
      }, []);
 

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
                <TableCell>{pro.name}</TableCell>
                <TableCell>{pro.location}</TableCell>
                <TableCell>{pro.floorplan}</TableCell>
                <TableCell>{pro.link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};


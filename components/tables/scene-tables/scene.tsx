'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import {  MoreHorizontal, Plus,  Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
import { ColumnDef } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Scene {
  _id: string;
  ProjectType: string;
  spaceType: string;
  ImgUrl: string;
  elements: element[];
}
interface element {
  label: string;
  description: string;
}
export const SceneClient= () => {
  const router = useRouter();
  const [scenes, setscenes] = useState<Scene[]>([]);
  const { data: session ,status}: any = useSession();

     useEffect(() => {
       if (!session) return; // Check if session is available

       const fetchScenes = async () => {
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
           setscenes(data);
         } catch (error:any) {
           toast( error.message )
         }
       };

       fetchScenes();
     }, [session, status]);
 

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
      {scenes && (
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
            {scenes.map((pro: Scene, index) => (
              <TableRow key={pro._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pro.ProjectType}</TableCell>
                <TableCell>{pro.spaceType}</TableCell>
                <TableCell>
                  <Link href={pro.ImgUrl}>
                    <Button>Open Image</Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/dashboard/addproducts/${pro.id}`)
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
    accessorKey: 'actions',
    header: 'actions'
  }
];
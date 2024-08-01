'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import {
  Edit,
  MoreHorizontal,
  Plus,
  SeparatorVertical,
  Trash
} from 'lucide-react';
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { ColumnDef } from '@tanstack/react-table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ProductForm } from '@/components/forms/product-form';
import { toast } from 'sonner';
export const ProductClient = () => {
  const router = useRouter();
  const [Product, setProduct] = useState<any[]>([]);
  const { data: session } = useSession<any>();

  async function onsubmit(e) {
    e.preventDefault();

    const { name, image, coverageperBox } = e.target;

    // Create a FormData object
    const formData = new FormData();
    formData.append('Name', name.value);
    formData.append('file', image.files[0]); // image is a file input
    formData.append('coveragePerBox', coverageperBox.value);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/product/create',
        formData,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${session.token}`
          }
        }
      );

      const result = await response.data;
      toast(result.message);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  useEffect(() => {
    if (!session) return; // Check if session is available

    const fetchProduct = async () => {
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
        setProduct(table);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    //  fetchProduct();
  }, [session]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Scene `} description="Manage Scene " />
        <Dialog>
          <DialogTrigger>
            <Button className="text-xs md:text-sm">
              <Plus className="mr-2 h-4 w-4" /> Add Products
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Add Products</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <form
                onSubmit={onsubmit}
                className={cn('grid items-start gap-4')}
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input id="image" type="file" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coverageperBox" className="text-right">
                    Coverage/Box
                  </Label>
                  <Input id="coverageperBox" className="col-span-3" />
                </div>
                <DialogFooter>
                  <Button type="submit" className="">
                    submit
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      {Product && (
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
            {Product.map((pro: any, index) => (
              <TableRow key={index}>
                <TableCell>{pro.id}</TableCell>
                <TableCell>{pro.ProjectType}</TableCell>
                <TableCell>{pro.spaceType}</TableCell>
                <TableCell>
                  <Link href={pro.Image}>
                    <Button>Open Image</Button>
                  </Link>
                </TableCell>
                <TableCell></TableCell>
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
    cell: ({ row }) => <Button>hi</Button>
  }
];




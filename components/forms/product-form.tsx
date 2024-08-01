'use client';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Label } from '../ui/label';
import { DialogFooter } from '../ui/dialog';
import { cn } from '@/lib/utils';
import fetch from 'node-fetch';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  imgUrl: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: 'You can only add up to 3 images' })
    .min(1, { message: 'At least one image must be added.' }),
  description: z
    .string()
    .min(3, { message: 'Product description must be at least 3 characters' }),
  price: z.coerce.number(),
  category: z.string().min(1, { message: 'Please select a category' })
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

export const ProductForm: any = ({ setIsDialogOpen }) => {
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
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <form onSubmit={onsubmit} className={cn('grid items-start gap-4')}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
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
    </>
  );
};

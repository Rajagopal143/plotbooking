'use client';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormData from 'form-data';


import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';

// import FileUpload from "@/components/FileUpload";

import Dropzone from '../file-upload';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { LoadingContext } from '../layout/loadingProvider';
import { toast } from 'sonner';

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

export const SceneForm: React.FC<ProductFormProps> = ({
  initialData,
  categories
}) => {
  const { data: session } = useSession<any>();

  const { handleSubmit, control, register, setValue, watch, reset } = useForm();
  const [imageSrc, setImageSrc] = useState<any>(null);
 const { setIsLoading } = useContext(LoadingContext);

  const onDrop = (acceptedFiles:any) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue('image', file); // Set file in React Hook Form
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  const onSubmit = async (data:any) => {
    try {
      // Retrieve the file from the request
      setIsLoading(true)

      // Create a FormData instance
      const form = new FormData();
      const blob = await fetch(imageSrc);
      const fileBlob = await blob.blob();
      form.append('file', fileBlob, {
        filename: data.image.name,
        contentType: data.image.mimetype
      });
      form.append('ProjectType', data.ProjectType);
      form.append('spaceType', data.spaceType);

      // Send the file to the external API
      const response = await axios.post(
        'http://localhost:5000/api/scene/create',
        form,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${session.token}`
          }
        }
      );

      const responseData = await response.data;
 
      toast(responseData.message);
      // Get the response data
      // Send response back to the client
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      reset(); 
     setImageSrc(null)
    }
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading
          title={'Create Scene'}
          description={'Create your scene for future purpuse'}
        />
        {initialData && (
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">ProjectType</label>
        <Input
          className="mb-5 w-96"
          name="ProjectType"
          id="sceneName"
          {...register('ProjectType')}
        />
        <label htmlFor="">spaceType</label>
        <Input
          className="mb-5 w-96"
          name="spaceType"
          id="sceneName"
          {...register('spaceType')}
        />
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Uploaded"
            style={{ marginTop: '20px', maxWidth: '100%' }}
            width={1000}
            height={1000}
          />
        ) : (
          <Controller
            name="image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Dropzone onDrop={(files) => onDrop(files)} />
            )}
          />
        )}
        <Button type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </>
  );
};

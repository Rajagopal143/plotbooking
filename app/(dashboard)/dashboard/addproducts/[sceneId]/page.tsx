'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';

const page = ({ params }): any => {
  console.log(params.sceneId);
  const [elements, setElements] = useState<any>();
  const { data: session } = useSession<any>();
  useEffect(() => {
    const fetchProjects = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/scene/element/${params.sceneId}`;
      console.log(url);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      });
      const data = await response.json();
      console.log(data);
      setElements(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading title={`Add Products `} description="ADD Products to Scene " />
        <Button className="text-xs md:text-sm">
          <Plus className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </div>
      <div className="flex">
        <div className="flex max-w-60 flex-col  gap-3  rounded-md border-2 border-white p-3">
          {elements &&
            elements.map((element: any, index: number) => (
              <Button key={index} className='flex items-center justify-between'>
                {element.label} <IoAdd />
              </Button>
            ))}
              </div>
              <div className='w-full'>
              <Input/>
              </div>
      </div>
    </div>
  );
};

export default page;

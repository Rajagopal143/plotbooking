'use client';
import { backendUrl } from '@/constants/data';
import { fetchData } from '@/lib/getData';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const page = ({
  params: { projectid, orgid }
}: {
  params: { projectid: string; orgid: string };
}) => {
  const [data, setData] = useState<any>(null);
  const [jsonData, setJsonData] = useState<any>(null);
  const fetchOrgDetails = async () => {
    const response = await fetch(`${backendUrl}/api/project/${projectid}`);
    const data = await response.json();
    if (response.ok) {
      console.log(data.project.jsonUrl);
      setData(data.project);
      }
      const res = await fetchData(data.project.jsonUrl);
      console.log(res);
    setJsonData(res);
  };
  useEffect(() => {
    fetchOrgDetails();
  }, []);
  return (
    <main>
      {data ? (
     
          <Image
            src={data?.imageUrl}
            width={1000}
            height={1000}
            className="h-full w-full"
            alt={'projectImage'}
          />
          ) : null}
          <map ></map>
    </main>
  );
};

export default page;

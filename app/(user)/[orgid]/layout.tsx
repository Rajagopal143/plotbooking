"use client"
import Header from '@/components/users/Header';
import { backendUrl } from '@/constants/data';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
      const [data, setData] = useState<any>(null);

  const { orgid } = useParams();
   const fetchOrgDetails = async () => {
     const response = await fetch(`${backendUrl}/api/auth/org/${orgid}`);
     const data = await response.json();
     if (response.ok) {
       console.log(data);
       setData(data);
     }
  };
   useEffect(() => {
     fetchOrgDetails();
   }, []);
  return (
    <div>
      <Header orgName={data?.OrganizationName} projects={data?.projects} email={data?.email} />
      {children}
    </div>
  );
}

export default layout

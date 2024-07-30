'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import { LoadingContext  } from './layout/loadingProvider';

const Loading = () => {
  const { isLoading } = useContext(LoadingContext);
  

  if(isLoading)  return (
    <div className='w-screen h-screen absolute z-10 top-0 left-0 bg-[#000000b7] flex items-center justify-center'>
      <Image src={'/Rolling@1x-0.4s-200px-200px.svg'} height={100} width={100} alt="loadingImg"/>
    </div>
  )
  return null;
}

export default Loading


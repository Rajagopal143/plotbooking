"use client"
// contexts/LoadingContext.js

import React, { createContext, useState, useContext } from 'react';

export const LoadingContext = createContext<any>(null);


 function LoadingProvider({ children }: { children: React.ReactNode }) {
   const [isLoading, setIsLoading] = useState<boolean>(false);

   return (
     <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
       {children}
     </LoadingContext.Provider>
   );
 }

export default LoadingProvider;

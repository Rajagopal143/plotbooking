import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ComboboxDemo } from '../ui/combobox';
const Header = ({ orgName, projects ,email}: { orgName: string; projects:any,email:string }) => {
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          {orgName}
        </span>

        {/* <ComboboxDemo projects={projects} /> */}
        <Avatar>
          <AvatarImage src="" alt={email} />
                  <AvatarFallback className=''>{email &&email.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Header

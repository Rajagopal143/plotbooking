'use client';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/constants/data';
import { CellAction } from './cell-action';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'S.NO'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'location',
    header: 'LOCATION'
  },
  {
    accessorKey: 'floorplan',
    header: 'FLOORPLAN'
  },
  {
    accessorKey: 'link',
    header: 'LINK',
    cell: (link) => (
      <Link href={link}>
       {link}
      </Link>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

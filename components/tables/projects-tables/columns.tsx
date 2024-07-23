'use client';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/constants/data';
import { CellAction } from './cell-action';

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
    accessorKey: 'company',
    header: 'COMPANY'
  },
  {
    accessorKey: 'role',
    header: 'ROLE'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

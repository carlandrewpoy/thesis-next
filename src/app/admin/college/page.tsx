import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const College = async () => {
    const colleges = await prisma.college.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return <DataTable data={colleges} columns={columns} />
}

export default College
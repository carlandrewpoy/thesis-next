import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Faculty",
    description: "A task and issue tracker build using Tanstack Table.",
}

const Faculty = async () => {
    const data = await prisma.faculty.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
    });
    return <DataTable data={data} columns={columns} />
}
export default Faculty
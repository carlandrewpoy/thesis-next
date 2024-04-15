import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "College",
    description: "A task and issue tracker build using Tanstack Table.",
}

const College = async () => {
    const colleges = await prisma.college.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return <DataTable data={colleges} columns={columns} />
}

export default College
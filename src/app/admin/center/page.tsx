import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const Center = async () => {
    const centers = await prisma.center.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            college: true
        }
    });
    return <DataTable data={centers} columns={columns} />
}
export default Center
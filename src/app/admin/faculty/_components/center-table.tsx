import React from 'react'
import { DataTable } from './data-table'
import prisma from '@/lib/prisma';
import { columns } from './columns';


const CollegeTable = async () => {
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

export default CollegeTable
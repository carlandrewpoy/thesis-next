import React from 'react'
import { DataTable } from './data-table'
import prisma from '@/lib/prisma';
import { columns } from './columns';


const CollegeTable = async () => {
    const colleges = await prisma.college.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return <DataTable data={colleges} columns={columns} />
}

export default CollegeTable
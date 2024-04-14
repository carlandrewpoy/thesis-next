import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const FacultyEngagement = async () => {
    const data = await prisma.facultyEngagement.findMany();
    return <DataTable data={data} columns={columns} />
}

export default FacultyEngagement
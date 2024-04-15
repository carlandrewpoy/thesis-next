import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Technical Advisory Services",
    description: "A task and issue tracker build using Tanstack Table.",
}
const TechAdvisoryServices = async () => {
    const data = await prisma.technicalService.findMany({
        include: {
            project: {
                select: {
                    title: true
                }
            },
        }
    });
    return <div className='mx-5'>
        <DataTable data={data} columns={columns} />
    </div>
}

export default TechAdvisoryServices
import prisma from '@/lib/prisma';
import React from 'react'
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Citations",
    description: "A task and issue tracker build using Tanstack Table.",
}
const Citations = async () => {
    const data = await prisma.citation.findMany({
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

export default Citations
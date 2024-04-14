import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const Publication = async () => {
    const data = await prisma.publication.findMany({
        include: {
            project: {
                select: {
                    title: true
                }
            },
            center: {
                select: {
                    name: true
                }
            },
        }
    });
    return <div className='mx-5'>
        <DataTable data={data} columns={columns} />
    </div>
}
export default Publication
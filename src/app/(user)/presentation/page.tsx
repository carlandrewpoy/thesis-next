import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const Center = async () => {
    const data = await prisma.utilization.findMany({
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
    console.log(data)
    return <div className='mx-5'>
        <DataTable data={data} columns={columns} />
    </div>
}
export default Center
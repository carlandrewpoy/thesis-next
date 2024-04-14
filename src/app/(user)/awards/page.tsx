import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const Awards = async () => {
    const data = await prisma.award.findMany({
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
export default Awards
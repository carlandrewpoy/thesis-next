import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const Partnership = async () => {
    const data = await prisma.partnership.findMany({
        include: {
            project: {
                select: {
                    title: true
                }
            },
            college: {
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
export default Partnership
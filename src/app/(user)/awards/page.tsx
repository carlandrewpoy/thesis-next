import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Awards",
    description: "A task and issue tracker build using Tanstack Table.",
}
const Awards = async () => {
    const data = await prisma.award.findMany({
        include: {
            project: {
                select: {
                    title: true
                }
            },
            researchers: true
        }
    });
    const transformedData = data.map(item => ({
        ...item,
        newResearchers: `${item.researchers.map(mappedItem => `${mappedItem.lastname}, ${mappedItem.firstname} ${mappedItem.middleInitial === null ? '' : `${mappedItem?.middleInitial}.`} ${mappedItem.suffix === null ? '' : `${mappedItem?.suffix}`}`).join(':')}`,
    }));
    return <div className='mx-5'>
        <DataTable data={transformedData} columns={columns} />
    </div>
}
export default Awards
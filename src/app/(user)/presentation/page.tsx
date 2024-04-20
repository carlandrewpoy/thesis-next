import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Presentation",
    description: "A task and issue tracker build using Tanstack Table.",
}
const Center = async () => {
    const data = await prisma.presentation.findMany({
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
            Researchers: true
        }
    });
    const transformedData = data.map(item => ({
        ...item,
        newResearchers: `${item.Researchers.map(researcher => `${researcher.lastname}, ${researcher.firstname} ${researcher.middleInitial === null ? '' : `${researcher?.middleInitial}.`} ${researcher.suffix === null ? '' : `${researcher?.suffix}`}`).join(':')}`,
    }));
    console.log({ transformedData })
    return <div className='mx-5'>
        <DataTable data={transformedData} columns={columns} />
    </div>
}
export default Center
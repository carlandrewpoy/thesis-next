import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Publication",
    description: "A task and issue tracker build using Tanstack Table.",
}
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
            authors: true
        }
    });
    const transformedData = data.map(item => ({
        ...item,
        newAuthors: `${item.authors.map(researcher => `${researcher.lastname}, ${researcher.firstname} ${researcher.middleInitial === null ? '' : `${researcher?.middleInitial}.`} ${researcher.suffix === null ? '' : `${researcher?.suffix}`}`).join(':')}`,
    }));
    console.log(data)
    return <div className='mx-5'>
        <DataTable data={transformedData} columns={columns} />
    </div>
}
export default Publication
import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects",
    description: "A task and issue tracker build using Tanstack Table.",
}
const Project = async () => {
    const data = await prisma.project.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            extensionProject: true,
            researchWorkers: true,
            projectLeader: true,
            center: true
        }
    });
    const transformedData = data.map(item => ({
        ...item,
        newResearchWorkers: `${item.researchWorkers.map(researcher => `${researcher.lastname}, ${researcher.firstname} ${researcher.middleInitial === null ? '' : `${researcher?.middleInitial}.`} ${researcher.suffix === null ? '' : `${researcher?.suffix}`}`).join(':')}`,
        newTitle: item.extensionProjectId === null ? item.title as string : item.extensionProject?.title as string
    }));
    console.log({ transformedData })
    return <div className='mx-5'>
        <DataTable data={transformedData} columns={columns} />
    </div>
}
export default Project
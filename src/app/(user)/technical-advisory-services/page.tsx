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
            invitedFaculties: true,
            organizers: true
        }
    });
    const transformedData = data.map(item => ({
        ...item,
        newOrganizers: `${item.organizers.map(mappedItem => `${mappedItem.lastname}, ${mappedItem.firstname} ${mappedItem.middleInitial === null ? '' : `${mappedItem?.middleInitial}.`} ${mappedItem.suffix === null ? '' : `${mappedItem?.suffix}`}`).join(':')}`,
        newInvitedFaculty: `${item.invitedFaculties.map(mappedItem => `${mappedItem.lastname}, ${mappedItem.firstname} ${mappedItem.middleInitial === null ? '' : `${mappedItem?.middleInitial}.`} ${mappedItem.suffix === null ? '' : `${mappedItem?.suffix}`}`).join(':')}`,
    }));
    return <div className='mx-5'>
        <DataTable data={transformedData} columns={columns} />
    </div>
}

export default TechAdvisoryServices
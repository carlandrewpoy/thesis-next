import prisma from '@/lib/prisma';
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Metadata } from 'next';
import { gradReport, gradTest } from "@/services/grad-school-summary"


export const metadata: Metadata = {
    title: "Graduate School Faculty",
    description: "A task and issue tracker build using Tanstack Table.",
}
const Center = async () => {
    const data = await prisma.gradSchoolFaculty.findMany({
        include: {
            college: true,
            faculty: true,
            facultyEngagement: true
        }
    });
    console.log(data)
    let result1 = await gradTest()
    let result2 = await gradReport()
    console.log(result2)
    const result = { result1, result2 }
    return <div className='mx-5'>
        <DataTable data={data} columns={columns} results={result} />
    </div>
}
export default Center
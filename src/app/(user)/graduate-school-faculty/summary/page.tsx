import React from 'react'
import { Metadata } from 'next';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
    title: "Summary",
    description: "A task and issue tracker build using Tanstack Table.",
}

const Center = async ({ searchParams }: {
    searchParams: {
        sy: string
        sem: string
    }
}) => {
    const data = await prisma.$queryRaw`SELECT 
  fe.letter,
  CAST(COUNT(fe.id) AS SIGNED) AS num_faculty_with_engagement,
  (SELECT COUNT(*) FROM gradschoolfaculty) AS total_faculty_with_engagement,
  (SELECT COUNT(*) FROM facultyengagement fe LEFT JOIN gradschoolfaculty gsf ON fe.id = gsf.facultyEngagementId WHERE fe.letter IN ('B', 'C', 'D') and gsf.schoolYear = "2023-2024" and gsf.semester = "SECOND") AS total_BCD,
  (SELECT COUNT() FROM facultyengagement fe LEFT JOIN gradschoolfaculty gsf ON fe.id = gsf.facultyEngagementId WHERE fe.letter IN ('B', 'C', 'D') and gsf.schoolYear = "2023-2024" and gsf.semester = "SECOND") / (SELECT COUNT() FROM gradschoolfaculty where schoolYear = "2023-2024" and semester = "SECOND") * 100 AS percentage_BCD,
  (SELECT COUNT() FROM facultyengagement fe LEFT JOIN gradschoolfaculty gsf ON fe.id = gsf.facultyEngagementId WHERE fe.letter IN ('A') and gsf.schoolYear = "2023-2024" and gsf.semester = "SECOND") / (SELECT COUNT() FROM gradschoolfaculty where schoolYear = "2023-2024" and semester = "SECOND") * 100 AS percentage_A,
  (SELECT COUNT() FROM facultyengagement fe LEFT JOIN gradschoolfaculty gsf ON fe.id = gsf.facultyEngagementId WHERE fe.letter IN ('E') and gsf.schoolYear = "2023-2024" and gsf.semester = "SECOND") / (SELECT COUNT() FROM gradschoolfaculty where schoolYear = "2023-2024" and semester = "SECOND") * 100 AS percentage_E,
  (SELECT COUNT() FROM facultyengagement fe LEFT JOIN gradschoolfaculty gsf ON fe.id = gsf.facultyEngagementId WHERE fe.letter NOT IN ('E') and gsf.schoolYear = "2023-2024" and gsf.semester = "SECOND") / (SELECT COUNT() FROM gradschoolfaculty where schoolYear = "2023-2024" and semester = "SECOND") * 100 AS percentage_ABCD
FROM facultyengagement fe
LEFT JOIN gradschoolfaculty gsf ON fe.id = gsf.facultyEngagementId
where gsf.schoolYear = "2024-2025" and gsf.semester = "FIRST"
GROUP BY fe.letter`
    console.log({ data })
    return <div className='mx-5'>
        <h1>awdawwda</h1>
        <h1>{searchParams.sy}</h1>
        <h1>{searchParams.sem}</h1>
    </div>
}
export default Center
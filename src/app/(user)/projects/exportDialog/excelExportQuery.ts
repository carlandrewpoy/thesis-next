import prisma from "@/lib/prisma"

export async function Data1() {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
	type,
    title,
    status,
    dateStart,
    dateCompleted,
    dateExtension,
    fundingAgency,
    coopAgency,
    projectLeader,
    researchWorkers,
    approvedProjectCost,
    beneficiaries,
    mandatedProgram,
    supportingDocs
FROM project
order by 4 desc, 5 desc
  `
  )
}

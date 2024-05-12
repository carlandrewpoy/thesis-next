import prisma from "@/lib/prisma"

export async function Data1() {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
    proj.title,
      ts.venue,
      ts.dateStart,
      ts.dateEnd,
      ts.organizer,
      ts.faculty,
      ts.proofLink
  FROM technicalservice ts
  left join project proj on proj.id = ts.projectId
  `
  )
}

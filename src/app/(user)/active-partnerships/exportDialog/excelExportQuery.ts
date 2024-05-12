import prisma from "@/lib/prisma"

export async function Data1() {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
	c.name,
	p.partner,
    proj.title,
    p.dateStarted,
    p.dateEnded,
    p.implementor,
    p.supportingDocs
FROM 
	partnership p
left join college c on c.id = p.collegeId
left join project proj on proj.id = p.projectId
order by 4 desc, 5 desc


  `
  )
}

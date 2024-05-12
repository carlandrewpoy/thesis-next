import prisma from "@/lib/prisma"

export async function Data1() {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
	proj.title,
    c.keywords,
    c.researchers,
    c.yearPublished,
    c.index,
    c.researchers as researchers2,
    proj.title as title2,
    c.journalTitle,
    c.vol,
    c.yearPublishedTwo,
    c.publisherName,
    c.scholarLink
FROM citation c
left join project proj on proj.id = c.projectId
order by yearPublishedTwo desc
  `
  )
}

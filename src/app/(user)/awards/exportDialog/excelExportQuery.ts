import prisma from "@/lib/prisma"

export async function Data1() {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
    proj.title,
      a.type,
      a.researchers,
      a.yearPublished,
      a.publisher,
      a.certOrProgram
  FROM award a
  left join project proj on proj.id = a.projectId
  order by 4 desc
  `
  )
}

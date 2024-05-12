import prisma from "@/lib/prisma"

export async function utilizationQuery(detailsData: any) {
  console.log("detailsData query", detailsData)

  return prisma.$queryRawUnsafe(
    `
    SELECT 
      p.title,
      c.name,
      u.proof,
      u.benificiary,
      u.supportingDocs,
      u.year
    FROM utilization u
    left join project p on p.id = u.projectId
    left join center c on c.id = u.centerId 
    ${
      detailsData.rangeYear == "All Year"
        ? ""
        : `where year in ('${detailsData.yearList[0]}', '${detailsData.yearList[1]}', '${detailsData.yearList[2]}')`
    }
    order by u.year desc, p.title desc
    `
  )
}

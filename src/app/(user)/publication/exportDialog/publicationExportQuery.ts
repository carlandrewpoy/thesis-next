import prisma from "@/lib/prisma"

export async function publicationData(detailsData: any) {
  console.log("detailsData query", detailsData)

  //detailsData.schoolYear == "All Year" && console.log("true lng")
  return prisma.$queryRawUnsafe(
    `
    SELECT 
    p.id AS presentationId,
    proj.title AS projectTitle,
    p.status,
    p.startedDate,
    p.completedDate,
    p.article,
    c.name AS centerName,
    p.keywords,
    p.journalTitle,
    p.publicationDate,
    p.issueNo,
    p.issnOrIsbn,
    p.index,
    p.supportingDocs,
    
    GROUP_CONCAT(CONCAT(f.lastname, ", ", f.firstname, 
                IF(f.middleInitial != '', CONCAT(", ", f.middleInitial, "."), ""), 
                ", ", f.suffix) SEPARATOR ', ') AS researchers
FROM publication p 
LEFT JOIN project proj ON proj.id = p.projectId
LEFT JOIN center c ON c.id = p.centerId
LEFT JOIN _facultytopublication ftp ON ftp.B = p.id
LEFT JOIN faculty f ON f.id = ftp.A
${
  detailsData !== "All Year"
    ? `WHERE p.publicationDate BETWEEN '${detailsData}-01-01' AND '${detailsData}-12-31'`
    : ""
}

GROUP BY p.id
ORDER BY p.publicationDate DESC;
   
 


  `
  )
}

import prisma from "@/lib/prisma"

export async function presentData(detailsData) {
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
    p.articleTitle,
    p.keywords,
    p.forumTitle,
    p.venue,
    p.type,
    p.date,
    p.supportingDocs,
    c.name AS centerName,
    GROUP_CONCAT(CONCAT(f.lastname, ", ", f.firstname, 
                IF(f.middleInitial != '', CONCAT(", ", f.middleInitial, "."), ""), 
                ", ", f.suffix) SEPARATOR ', ') AS researchers
FROM presentation p 
LEFT JOIN project proj ON proj.id = p.projectId
LEFT JOIN center c ON c.id = p.centerId
LEFT JOIN _facultytopresentation ftp ON ftp.B = p.id
LEFT JOIN faculty f ON f.id = ftp.A
 ${
   detailsData !== "All Year"
     ? `WHERE p.date BETWEEN '${detailsData}-01-01' AND '${detailsData}-12-31'`
     : ""
 }
GROUP BY p.id
ORDER BY p.date DESC;

  `
  )
}

export async function presentReport(detailsData) {
  const LETTERS = ["NATIONAL", "INTERNATIONAL", "REGIONAL"]
  let alldata = LETTERS.reduce((acc, file) => {
    acc[file] = {}
    return acc
  }, {})
  for (let i = 0; i <= LETTERS.length - 1; i++) {
    let temp = await prisma.$queryRawUnsafe(`
      select 
      p.type, count(*) as total
      from presentation p
      ${
        detailsData !== "All Year"
          ? `WHERE p.date BETWEEN '${detailsData}-01-01' AND '${detailsData}-12-31' and p.type = '${LETTERS[i]}'`
          : ""
      }
      ${detailsData == "All Year" ? `WHERE p.type = '${LETTERS[i]}'` : ""}
      group by 1
      `)
    //console.log("temp", temp)

    alldata = {
      ...alldata,
      [LETTERS[i]]: (temp[0] !== undefined && parseInt(temp[0].total)) || 0,
    }
  }
  return alldata
}

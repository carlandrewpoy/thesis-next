import prisma from "@/lib/prisma"

export async function gradTest() {
  return prisma.$queryRaw`
  SELECT 
	CONCAT(f.lastname, ", ", f.firstname, ", ", f.middleInitial, ".") as facultyName,
    f.position,
    c.name,
    fe.letter,
    fe.description
FROM gradschoolfaculty gsf
left join faculty f on f.id = gsf.facultyId
left join college c on c.id = gsf.collegeId
left join facultyengagement fe on fe.id = gsf.facultyEngagementId
  `
}
export async function gradReport(sy?: string, sem?: string) {
  let totalFaculty = await prisma.$queryRaw`
      SELECT 
      count(fe.id) AS totalFaculty
      from gradschoolfaculty gsf
      left join facultyengagement fe on fe.id = gsf.facultyEngagementId
      `
  totalFaculty = parseInt(totalFaculty[0].totalFaculty)
  // console.log("totalFaculty", parseInt(totalFaculty[0].totalFaculty))
  const LETTERS = ["A", "B", "C", "D", "E"]
  let alldata = LETTERS.reduce((acc, file) => {
    acc[file] = {}
    return acc
  }, {})
  for (let i = 0; i <= LETTERS.length - 1; i++) {
    let temp = await prisma.$queryRaw`
      SELECT 
      fe.letter,
      COUNT(fe.id) AS num_faculty_with_engagement
      from gradschoolfaculty gsf
      left join facultyengagement fe on fe.id = gsf.facultyEngagementId
      where fe.letter = ${LETTERS[i]}
      group by 1
      `
    /* console.log(
      LETTERS[i],
      (temp[0] !== undefined &&
        parseInt(temp[0].num_faculty_with_engagement)) ||
        0
    ) */
    alldata = {
      ...alldata,
      [LETTERS[i]]:
        (temp[0] !== undefined &&
          parseInt(temp[0].num_faculty_with_engagement)) ||
        0,
    }
  }
  return { totalFaculty, alldata }
}

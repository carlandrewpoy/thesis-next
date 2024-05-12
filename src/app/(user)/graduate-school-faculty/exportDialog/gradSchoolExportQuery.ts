import prisma from "@/lib/prisma"

export async function gradTest(detailsData) {
  console.log("detailsData query", detailsData)

  //detailsData.schoolYear == "All Year" && console.log("true lng")
  return prisma.$queryRawUnsafe(
    `
  SELECT 
	CONCAT(f.lastname, ", ", f.firstname, 
    IF(f.middleInitial != '', CONCAT(", ", f.middleInitial, "."), ""), 
    ", ", f.suffix) as facultyName,
    f.position,
    c.name,
    fe.letter,
    fe.description
    FROM gradschoolfaculty gsf
    LEFT JOIN faculty f ON f.id = gsf.facultyId
    LEFT JOIN college c ON c.id = gsf.collegeId
    LEFT JOIN facultyengagement fe ON fe.id = gsf.facultyEngagementId
    ${
      detailsData.schoolYear !== "All Year" &&
      detailsData.semester !== "All Semester"
        ? `Where gsf.schoolYear = '${detailsData.schoolYear}' and gsf.semester = '${detailsData.semester}'`
        : ""
    }
    ${
      detailsData.schoolYear !== "All Year" &&
      detailsData.semester == "All Semester"
        ? `Where gsf.schoolYear = '${detailsData.schoolYear}'`
        : ""
    }
    ${
      detailsData.schoolYear == "All Year" &&
      detailsData.semester !== "All Semester"
        ? `Where gsf.semester = '${detailsData.semester}'`
        : ""
    }
  `
  )
}

export async function gradReport(detailsData) {
  let totalFaculty = await prisma.$queryRawUnsafe(`
      SELECT 
      count(fe.id) AS totalFaculty
      from gradschoolfaculty gsf
      left join facultyengagement fe on fe.id = gsf.facultyEngagementId
      ${
        detailsData.schoolYear !== "All Year" &&
        detailsData.semester !== "All Semester"
          ? `Where gsf.schoolYear = '${detailsData.schoolYear}' and gsf.semester = '${detailsData.semester}'`
          : ""
      }
      ${
        detailsData.schoolYear !== "All Year" &&
        detailsData.semester == "All Semester"
          ? `Where gsf.schoolYear = '${detailsData.schoolYear}'`
          : ""
      }
      ${
        detailsData.schoolYear == "All Year" &&
        detailsData.semester !== "All Semester"
          ? `Where gsf.semester = '${detailsData.semester}'`
          : ""
      }
      `)
  totalFaculty = parseInt(totalFaculty[0].totalFaculty)
  // console.log("totalFaculty", parseInt(totalFaculty[0].totalFaculty))
  const LETTERS = ["A", "B", "C", "D", "E"]
  let alldata = LETTERS.reduce((acc, file) => {
    acc[file] = {}
    return acc
  }, {})
  for (let i = 0; i <= LETTERS.length - 1; i++) {
    let temp = await prisma.$queryRawUnsafe(`
      SELECT 
      fe.letter,
      COUNT(fe.id) AS num_faculty_with_engagement
      from gradschoolfaculty gsf
      left join facultyengagement fe on fe.id = gsf.facultyEngagementId
  
      ${
        detailsData.schoolYear !== "All Year" &&
        detailsData.semester !== "All Semester"
          ? `Where gsf.schoolYear = '${detailsData.schoolYear}' and gsf.semester = '${detailsData.semester}' and fe.letter = '${LETTERS[i]}'`
          : ""
      }
      ${
        detailsData.schoolYear !== "All Year" &&
        detailsData.semester == "All Semester"
          ? `Where gsf.schoolYear = '${detailsData.schoolYear}' and fe.letter = '${LETTERS[i]}'`
          : ""
      }
      ${
        detailsData.schoolYear == "All Year" &&
        detailsData.semester !== "All Semester"
          ? `Where gsf.semester = '${detailsData.semester}' and fe.letter = '${LETTERS[i]}'`
          : ""
      }
      group by 1
      `)
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

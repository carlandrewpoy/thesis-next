import prisma from "@/lib/prisma";
import {  useQuery } from "@tanstack/react-query";

export const GradSchoolSummary = async () => {
  return useQuery({
    queryKey: ["grad-school-summary"],
    queryFn: async () => {
      return await prisma.$queryRaw`
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
    },
  });
};

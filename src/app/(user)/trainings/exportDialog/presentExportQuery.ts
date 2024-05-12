import prisma from "@/lib/prisma"

export async function trainingData() {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
	p.title,
    t.venue,
    t.dateStarted,
    t.dateEnded,
    t.duration,
    t.traineesCount,
    t.traineesWeighted,
    t.traineesSurveyedCount,
    t.ratePoor,
    t.rateFair,
    t.rateSatisfactory,
    t.rateVerySatisfactory,
    t.rateExcellent,
    t.rateTimelinessPoor,
    t.rateTimelinessFair,
    t.rateTimelinessSatisfactory,
    t.rateTimelinessVerySatisfactory,
    t.rateTimelinessExcellent,
    t.supportingDocs
FROM training t
left join project p on p.id = t.projectId
order by 3 desc, 4 desc


  `
  )
}

export async function trainingReport() {
  return await prisma.$queryRawUnsafe(`
    SELECT 
    sum(traineesCount) as traineesCount,
    sum(traineesWeighted) as traineesWeighted,
    sum(traineesSurveyedCount) as traineesSurveyedCount,
    sum(ratePoor) as ratePoor,
    sum(rateFair) as rateFair,
    sum(rateSatisfactory) as rateSatisfactory,
    sum(rateVerySatisfactory) as rateVerySatisfactory,
   sum( rateExcellent) as rateExcellent
   
FROM training 

      `)
}

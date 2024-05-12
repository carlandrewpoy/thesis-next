"use server"

import { gradReport, gradTest } from "./gradSchoolExportQuery"

export async function forfetch(detailsData: any) {
  console.log("detailsData", detailsData)
  let result = await gradTest(detailsData)
  let result2 = await gradReport(detailsData)
  // console.log("result3333", result3)
  result = { result, result2 }
  return result
}

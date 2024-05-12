"use server"

import { presentData, presentReport } from "./presentExportQuery"

export async function forfetch(detailsData: any) {
  console.log("detailsData", detailsData)
  let result = await presentData(detailsData)
  let result2 = await presentReport(detailsData)
  // console.log("result3333", result3)
  result = { result, result2 }
  return result
}

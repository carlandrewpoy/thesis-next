"use server"

import { trainingData, trainingReport } from "./presentExportQuery"

export async function forfetch() {
  let result = await trainingData()
  let result2 = await trainingReport()
  result2 = result2[0]
  // console.log("result3333", result3)
  result = { result, result2 }
  return result
}

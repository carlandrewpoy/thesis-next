"use server"

import { utilizationQuery } from "./utilExportQuery"

export async function forfetch(detailsData: any) {
  //console.log("detailsData", detailsData)
  let result = await utilizationQuery(detailsData)
  console.log(result)
  return result
}

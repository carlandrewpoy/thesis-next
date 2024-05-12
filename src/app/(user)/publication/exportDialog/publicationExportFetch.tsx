"use server"

import { publicationData } from "./publicationExportQuery"

export async function forfetch(detailsData: any) {
  console.log("detailsData", detailsData)
  let result = await publicationData(detailsData)
  // console.log("result3333", result3)
  return result
}

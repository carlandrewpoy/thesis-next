"use server"

import { Data1 } from "./excelExportQuery"

export async function forfetch() {
  let result = await Data1()
  return result
}

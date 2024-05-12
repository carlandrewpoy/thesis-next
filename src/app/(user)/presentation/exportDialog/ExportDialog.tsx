import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { getSchoolYears, getSingleYearsArray, getYearsRange } from "@/lib/utils"
import { presentExport } from "./presentExport"

const ExportDialog: React.FC = () => {
  let data = getSingleYearsArray()
  data.unshift("All Year")
  console.log("single year", data)
  // console.log("range year", data[1].yearList)

  let [detailsData, setDetailsData] = useState(data[0])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("detailsData", detailsData)
    presentExport(detailsData)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 ">
          Export to Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[50%]">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>Export filtered data.</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Year</Label>
              <Select
                value={
                  detailsData == "All Year"
                    ? detailsData
                    : parseInt(detailsData)
                }
                onValueChange={(selected) => {
                  setDetailsData(selected)
                }}
              >
                <SelectTrigger className="col-span-2 h-8">
                  <SelectValue placeholder="S.Y" />
                </SelectTrigger>
                <SelectContent className="max-h-52">
                  <SelectGroup>
                    {data.map((item) => (
                      <SelectItem className="text-center" value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-3">
            <Button type="submit">Export</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ExportDialog

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
import { getSchoolYears } from "@/lib/utils"
import { gradSchoolExport } from "./gradSchoolExport"

const ExportDialog: React.FC = () => {
  const data = getSchoolYears()
  data.unshift("All Year")

  const sems = [
    {
      name: "All Semester",
      value: "All Semester",
    },
    {
      name: "1st",
      value: "FIRST",
    },
    {
      name: "2nd",
      value: "SECOND",
    },
  ]

  const [detailsData, setDetailsData] = useState({
    schoolYear: data[0],
    semester: sems[0].name,
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //console.log("detailsData", detailsData)
    gradSchoolExport(detailsData)
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
              <Label htmlFor="height">School Year</Label>
              <Select
                value={detailsData?.schoolYear}
                onValueChange={(selected) => {
                  setDetailsData({ ...detailsData, schoolYear: selected })
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
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Semester</Label>
              <Select
                value={detailsData?.semester}
                onValueChange={(selected) => {
                  setDetailsData({ ...detailsData, semester: selected })
                }}
              >
                <SelectTrigger className="col-span-2 h-8">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent className="max-h-52">
                  <SelectGroup>
                    {sems.map((sem) => (
                      <SelectItem
                        className="text-center"
                        key={sem.name}
                        value={sem.value}
                      >
                        {sem.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-3">
            {/* {warning && <p className="text-red-400">Some inputs are empty.</p>} */}
            <Button type="submit">Export</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ExportDialog

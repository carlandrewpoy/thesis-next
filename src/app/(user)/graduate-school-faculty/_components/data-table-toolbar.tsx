"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { AddDialog } from "./dialog/add-dialog/add-dialog"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"
import { SchoolYearSelect } from "./select/schoolyear-select"
import { useState } from "react"
import { SemesterSelect } from "./select/semester-select"
import { GradSchoolFaculty } from "@prisma/client"
import ExcelExportHelper from "@/components/export-helper"
import { CollegeCombobox } from "../../../../components/combobox/filter/college-select"
import ExportDialog from "../exportDialog/ExportDialog"


interface DataTableToolbarProps<TData> {
  table: Table<GradSchoolFaculty>
  results: any
}

export function DataTableToolbar<TData>({
  table,
  results
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [sy, setSy] = useState<string | null>()
  const [sem, setSem] = useState<string | null>()
  // const [college, setCollege] = useState<string | null>()
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search Name..."
          value={(table.getColumn("faculty_firstname")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("faculty_firstname")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <CollegeCombobox table={table} />
        <SchoolYearSelect set={setSy} table={table} />
        {sy && <SemesterSelect set={setSem} table={table} />}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              setSy(null)
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-x-2">

        <AddDialog />
        <DataTableViewOptions table={table} />
        {/* <Button variant="outline" className="h-8 px-2 lg:px-3">
          Summary
        </Button> */}
        <ExportDialog />
        {/* <Link
          href={{
            pathname: '/graduate-school-faculty/summary',
            query: {
              sy: sy,
              sem: sem
            },
          }}
        >
          <Button variant="outline" className="h-8 px-2 lg:px-3">
            Summary
          </Button>
        </Link> */}
      </div>
    </div>
  )
}
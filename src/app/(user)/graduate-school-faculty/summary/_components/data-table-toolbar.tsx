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
import { CollegeSelect } from "./select/college-select"
import Link from "next/link"


interface DataTableToolbarProps<TData> {
  table: Table<GradSchoolFaculty>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [sy, setSy] = useState<string | null>()
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search Name..."
          value={(table.getColumn("faculty_firstname")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("faculty_firstname")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <CollegeSelect table={table} />
        <SchoolYearSelect set={setSy} table={table} />
        {sy && <SemesterSelect table={table} />}
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
        {/* <Link href="/user/graduate-school-faculty/summary/export">
          <Button variant="link" className="h-8 px-2 lg:px-3">
            Export
          </Button>
        </Link> */}
        <AddDialog />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
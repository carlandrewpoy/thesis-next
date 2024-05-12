"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { AddDialog } from "./dialog/add-dialog/add-dialog"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"
import { ProjectTypeSelect } from "./select/project-type-select"
import { Project } from "@prisma/client"
import { ProjectStatusSelect } from "./select/project-status-select"
import ExportButton from "../exportDialog/ExportButton"
import { FacultyCombobox } from "@/components/combobox/filter/faculty"
import { CenterCombobox } from "@/components/combobox/filter/center-select"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search project"
          value={(table.getColumn("newTitle")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("newTitle")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <ProjectTypeSelect table={table} />
        <ProjectStatusSelect table={table} />
        <FacultyCombobox filterName="Researcher" columnName="newResearchWorkers" table={table} />
        <CenterCombobox table={table} />


        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
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
        <ExportButton />
      </div>
    </div>
  )
}
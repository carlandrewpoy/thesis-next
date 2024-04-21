"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { AddDialog } from "./dialog/add-dialog/add-dialog"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"
import { RegionTypeSelect } from "@/components/select/filter/region-type-select"


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
          value={(table.getColumn("project_title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("project_title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <RegionTypeSelect table={table} />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
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
        {/* <Button variant={"outline"} size="sm" className="ml-auto h-8"
        >Add</Button> */}
        <AddDialog />
        <DataTableViewOptions table={table} />
        <Button className="h-8" variant={"outline"}>
          Export
        </Button>
      </div>
    </div>
  )
}
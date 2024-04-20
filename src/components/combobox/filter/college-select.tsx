"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { GetCollege } from "@/server-state-management/state-data"
import { Table } from "@tanstack/react-table"
import { College, GradSchoolFaculty } from "@prisma/client"

export function CollegeCombobox({
    defaultValue,
    table
}: {
    defaultValue?: string | undefined
    table: Table<GradSchoolFaculty>
}) {
    const [open, setOpen] = React.useState(false)
    console.log({ defaultValue })
    const [value, setValue] = React.useState(defaultValue ?? '')
    const { data } = GetCollege()
    const valueObject = data?.filter((item) => item.name.toLocaleLowerCase() === value.toLocaleLowerCase())
    return (
        <>
            <input defaultValue={valueObject?.[0]?.id ?? ''} name="collegeId" className="hidden" />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        name="collegeId"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-32 h-8 justify-between"
                    >
                        {/* {value
                            ? data?.find((item) => item?.name.toLocaleLowerCase() === value.toLocaleLowerCase())?.name
                            : "College"} */}
                        {(table.getColumn("college_name")?.getFilterValue() as string) ? (table.getColumn("college_name")?.getFilterValue() as string) : 'College'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" >
                    <Command >
                        <CommandInput placeholder="Search college..." className="h-9" />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {data?.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={(currentValue) => {
                                        table.getColumn("college_name")?.setFilterValue(currentValue)
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {item.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === item.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}

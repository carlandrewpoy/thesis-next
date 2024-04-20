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
import { GetCollege, GetFaculty } from "@/server-state-management/state-data"
import { Faculty, Presentation } from "@prisma/client"
import { Table } from "@tanstack/react-table"

export function FacultyCombobox({
    table,
    columnName
}: {
    table: Table<any>
    columnName: string
}) {
    const handleFullName = (item: Faculty | undefined) => {
        if (!item) return ''
        return `${item?.lastname}, ${item?.firstname}`
    }
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    console.log({ value })
    const { data } = GetFaculty()

    const valueObject = data?.filter((item) => handleFullName(item).toLocaleLowerCase() === value?.toLocaleLowerCase())
    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        name="collegeId"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="min-w-32 h-8 justify-between"
                    >
                        {(table.getColumn(columnName)?.getFilterValue() as string) ? (table.getColumn(columnName)?.getFilterValue() as string) : 'Author'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" >
                    <Command >
                        <CommandInput placeholder="Search faculty..." className="h-9" />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {data?.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={handleFullName(item)}
                                    onSelect={(currentValue) => {
                                        table.getColumn(columnName)?.setFilterValue(currentValue)

                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {handleFullName(item)}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value.toLocaleLowerCase() === handleFullName(item).toLocaleLowerCase() ? "opacity-100" : "opacity-0"
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

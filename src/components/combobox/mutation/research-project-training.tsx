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
import { GetExtensionProject, GetResearchProject } from "@/server-state-management/state-data"

export function ResearchProjectComboboxTraining({
    defaultValue,
    columnName
}: {
    defaultValue?: string
    columnName: string
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue)
    const { data } = GetResearchProject()
    const valueObject = data?.filter((item) => item.title?.toLocaleLowerCase() === value?.toLocaleLowerCase())
    console.log(value)

    return (
        <>
            <input value={valueObject?.[0]?.id ?? ''} name={columnName} className="hidden" />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        name="collegeId"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? data?.find((item) => item.title?.toLocaleLowerCase() === value.toLocaleLowerCase())?.title
                            : "Select project..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" >
                    <Command >
                        <CommandInput placeholder="Search project..." className="h-9" />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {data?.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item?.title as any}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {item.title}
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

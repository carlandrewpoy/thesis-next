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
import { Faculty } from "@prisma/client"

export function FacultyCombobox({
    defaultValue,
}: {
    defaultValue?: Faculty | undefined
}) {
    const handleFullName = (item: Faculty | undefined) => {
        if (!item) return ''
        return `${item?.firstname} ${item?.lastname}`
    }
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(handleFullName(defaultValue))
    console.log({ value })
    const { data } = GetFaculty()

    const valueObject = data?.filter((item) => handleFullName(item).toLocaleLowerCase() === value.toLocaleLowerCase())
    return (
        <>
            <input value={valueObject?.[0]?.id ?? ''} name="faculty" className="hidden" />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        name="collegeId"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value !== ''
                            ? handleFullName(data?.find((item) => handleFullName(item).toLocaleLowerCase() === value.toLocaleLowerCase()))
                            : "Select faculty..."}
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

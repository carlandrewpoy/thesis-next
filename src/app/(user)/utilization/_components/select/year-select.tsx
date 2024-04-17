import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Center, Utilization } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { getSingleYearsArray } from "@/lib/utils";

export function YearSelect({ table }: { table: Table<Utilization> }) {
    const data = getSingleYearsArray()
    return (
        <Select
            value={(table.getColumn("year")?.getFilterValue() as string) ?? ""}
            onValueChange={val => {
                // set && set(val)
                table.getColumn("year")?.setFilterValue(val)
            }}
        >
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item: any) => (
                        <SelectItem key={item} value={item.toString()}>{item}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

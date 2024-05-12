import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table } from "@tanstack/react-table"
import { Project } from "@prisma/client"

export function ProjectTypeSelect({ table, }: { table: Table<any> }) {
    const data = [
        {
            name: 'Research',
            value: 'RESEARCH'
        },
        {
            name: 'Extension',
            value: 'EXTENSION'
        }
    ]
    return (
        <Select
            value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
            onValueChange={val => {
                // set && set(val)
                table.getColumn("type")?.setFilterValue(val)
            }}
        >
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item: {
                        name: string;
                        value: string;
                    }) => (
                        <SelectItem key={item.name} value={item.value}>{item.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

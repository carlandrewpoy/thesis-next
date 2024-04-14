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
import { GradSchoolFaculty } from "@prisma/client"

const data = [
    {
        name: '1st',
        value: 'FIRST'
    },
    {
        name: '2nd',
        value: 'SECOND'
    }
]

export function SemesterSelect({
    table
}: {
    table: Table<GradSchoolFaculty>
}) {

    return (
        <Select name="semester"
            value={(table.getColumn("semester")?.getFilterValue() as string) ?? ""}
            onValueChange={val => {
                table.getColumn("semester")?.setFilterValue(val)
            }}
        >
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Sem" />
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

import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table } from "@tanstack/react-table";
import { Project } from "@prisma/client";

export function ProjectStatusSelect({ table }: { table: Table<any> }) {
    const data = [
        {
            name: 'Ongoing',
            value: 'ONGOING'
        },
        {
            name: 'Completed',
            value: 'COMPLETED'
        }
    ]
    return (
        <Select name="status"
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            onValueChange={(val) =>
                table.getColumn("status")?.setFilterValue(val)
            }>
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Status" />
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

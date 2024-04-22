import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getSchoolYears } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

export function UserTypeSelect({
    defaultValue,
    set,
    table
}: {
    defaultValue?: string,
    set?: React.Dispatch<React.SetStateAction<string | null | undefined>>,
    table: Table<any>
}) {
    const data = [
        {
            name: 'Admin',
            value: 'ADMIN'
        },
        {
            name: 'User',
            value: 'USER'
        }
    ]

    return (
        <Select
            value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
            onValueChange={val => {
                set && set(val)
                table.getColumn("role")?.setFilterValue(val)
            }}
        >
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item) => (
                        <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

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
import { GradSchoolFaculty } from "@prisma/client";

export function SchoolYearSelect({
    defaultValue,
    set,
    table
}: {
    defaultValue?: string,
    set?: React.Dispatch<React.SetStateAction<string | null | undefined>>,
    table: Table<GradSchoolFaculty>
}) {
    const data = getSchoolYears()

    return (
        <Select
            value={(table.getColumn("schoolYear")?.getFilterValue() as string) ?? ""}
            onValueChange={val => {
                set && set(val)
                table.getColumn("schoolYear")?.setFilterValue(val)
            }}
        >
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="School Year" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item: string) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

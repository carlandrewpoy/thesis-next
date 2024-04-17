import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { College, GradSchoolFaculty } from "@prisma/client";
import { Table } from "@tanstack/react-table";

export function CollegeSelect({ defaultValue, table }: { defaultValue?: string, table: Table<GradSchoolFaculty> }) {
    const [data, setdata] = React.useState<College[]>()
    const fetchColleges = async () => {
        const response = await fetch("/api/college");
        const data = await response.json();
        setdata(data);
    }
    React.useEffect(() => {
        fetchColleges();
    }, [])
    return (
        <Select
            value={(table.getColumn("college_name")?.getFilterValue() as string) ?? ""}
            onValueChange={val => {
                // set && set(val)
                table.getColumn("college_name")?.setFilterValue(val)
            }}
        >
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="College" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((college: College) => (
                        <SelectItem key={college.id} value={college.name}>{college.name.toLocaleUpperCase()}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

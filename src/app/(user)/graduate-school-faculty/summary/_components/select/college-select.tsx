import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { College } from "@prisma/client";
import { Table } from "@tanstack/react-table";

export function CollegeSelect({ defaultValue, table }: { defaultValue?: string, table: Table<any> }) {
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
        <Select name="college"
            value={(table.getColumn("collegeId")?.getFilterValue() as string) ?? ""}
            onValueChange={val => {
                table.getColumn("collegeId")?.setFilterValue(val)
            }}
        >
            <SelectTrigger className="h-8 w-32">
                <SelectValue placeholder="College" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((college: College) => (
                        <SelectItem key={college.id} value={college.id}>{college.name.toLocaleUpperCase()}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Center, Presentation, Utilization } from "@prisma/client";
import { Table } from "@tanstack/react-table";

export function CenterSelect({ table }: { table: Table<Presentation> }) {
    const [data, setdata] = React.useState<Center[]>()
    const fetchData = async () => {
        const response = await fetch("/api/center");
        const data = await response.json();
        setdata(data);
    }
    React.useEffect(() => {
        fetchData();
    }, [])
    return (
        <Select
            value={(table.getColumn("center_name")?.getFilterValue() as string) ?? ""}
            onValueChange={val => {
                // set && set(val)
                table.getColumn("center_name")?.setFilterValue(val)
            }}
        >
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Center" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item: Center) => (
                        <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

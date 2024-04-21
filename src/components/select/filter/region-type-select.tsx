import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function RegionTypeSelect({ table }: { table: any }) {
    const data = [
        {
            name: 'Local',
            value: 'LOCAL'
        },
        {
            name: 'Regional',
            value: 'REGIONAL'
        },
        {
            name: 'National',
            value: 'NATIONAL'
        },
        {
            name: 'International',
            value: 'INTERNATIONAL'
        },

    ]
    return (
        <Select name="type"
            value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
            onValueChange={(val) =>
                table.getColumn("type")?.setFilterValue(val)
            }
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

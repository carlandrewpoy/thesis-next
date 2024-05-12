import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function AwardTypeSelect({ defaultValue }: { defaultValue?: string }) {
    const data = [
        {
            name: 'Local',
            value: 'LOCAL'
        },
        {
            name: 'National',
            value: 'NATIONAL'
        },
        {
            name: 'International',
            value: 'INTERNATIONAL'
        },
        {
            name: 'Regional',
            value: 'REGIONAL'
        }
    ]
    return (
        <Select name="type" required defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
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

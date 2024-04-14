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

export function SchoolYearSelect({ defaultValue }: { defaultValue?: string }) {
    const data = getSchoolYears()
    return (
        <Select name="schoolYear" required defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a year" />
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

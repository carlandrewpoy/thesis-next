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
import { GetCollege } from "@/server-state-management/state-data";

export function CollegeSelect({ defaultValue }: { defaultValue?: string }) {

    const { data, isLoading } = GetCollege();
    return (
        <Select name="collegeId" required defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a college" />
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

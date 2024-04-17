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

export function CollegeSelect({ defaultValue }: { defaultValue?: string }) {
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

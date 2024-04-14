import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { College, FacultyEngagement } from "@prisma/client";

export function EngagementSelect({ defaultValue }: { defaultValue?: string }) {
    const [data, setdata] = React.useState<FacultyEngagement[]>()
    const fetchData = async () => {
        const response = await fetch("/api/engagement");
        const data = await response.json();
        setdata(data);
    }
    React.useEffect(() => {
        fetchData();
    }, [])
    return (
        <Select name="facultyEngagement" required defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select engagement" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item: FacultyEngagement) => (
                        <SelectItem className="max-w-full" key={item.id} value={item.id}>{item.description}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

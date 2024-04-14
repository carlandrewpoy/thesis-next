import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Project } from "@prisma/client";

export function ResearchProjectSelect({ defaultValue }: { defaultValue?: string }) {
    const [data, setdata] = React.useState<Project[]>()
    const fetchData = async () => {
        const response = await fetch("/api/research");
        const data = await response.json();
        setdata(data);
    }
    React.useEffect(() => {
        fetchData();
    }, [])
    return (
        <Select name="projectId" required defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a research" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Array.isArray(data) && data.map((item: Project) => (
                        <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

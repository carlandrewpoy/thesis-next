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

export function ProjectSelect({ defaultValue }: { defaultValue?: string }) {
    const [data, setdata] = React.useState<Project[]>()
    const fetchData = async () => {
        const response = await fetch("/api/project");
        const data = await response.json();
        setdata(data);
    }
    React.useEffect(() => {
        fetchData();
    }, [])
    return (
        <Select name="projectId" required defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
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

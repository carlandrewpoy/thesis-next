import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { College, Faculty } from "@prisma/client";

export function FacultySelect({ defaultValue }: { defaultValue?: string }) {
    const [data, setdata] = React.useState<Faculty[]>()
    const fetchColleges = async () => {
        const response = await fetch("/api/faculty");
        const data = await response.json();
        setdata(data);
    }
    React.useEffect(() => {
        fetchColleges();
    }, [])
    return (
        <Select name="faculty" required defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a faculty" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item: Faculty) => (
                        <SelectItem key={item.id} value={item.id}>{`${item.firstname.toLocaleUpperCase()} ${item.lastname.toLocaleUpperCase()}`}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

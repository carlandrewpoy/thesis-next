import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Center } from "@prisma/client";

export function CenterSelect({ defaultValue }: { defaultValue?: string }) {
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
        <Select name="centerId" required defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a center" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item: Center) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { College, TrainingDurationType } from "@prisma/client";

const durations = [
    {
        name: 'Less than eight hour',
        value: 'LESS_THAN_EIGHT_HOUR'
    },
    {
        name: '8 hours',
        value: 'EIGHT_HOURS'
    },
    {
        name: '2 days',
        value: 'TWO_DAYS'
    },
    {
        name: '3-4 days',
        value: 'THREE_TO_FOUR_DAYS'
    },
    {
        name: '5 days or more',
        value: 'FIVE_DAYS_OR_MORE'
    }
]

export function DurationSelect({ defaultValue }: { defaultValue?: string }) {

    return (
        <Select name="duration" required defaultValue={defaultValue}>
            <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {durations?.map((item: {
                        name: string,
                        value: string

                    }) => (
                        <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

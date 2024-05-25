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
        value: 'LESS_THAN_EIGHT_HOUR',
        weight: '0.50'
    },
    {
        name: '8 hours',
        value: 'EIGHT_HOURS',
        weight: '1'

    },
    {
        name: '2 days',
        value: 'TWO_DAYS',
        weight: '1.25'
    },
    {
        name: '3-4 days',
        value: 'THREE_TO_FOUR_DAYS',
        weight: '1.50'

    },
    {
        name: '5 days or more',
        value: 'FIVE_DAYS_OR_MORE',
        weight: '2'
    }
]

export function DurationSelectTwo({ defaultValue }: {
    defaultValue?: string
}) {
    return (
        <Select defaultValue={defaultValue} name="duration">
            <SelectTrigger>
                <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
                {durations?.map((item: {
                    name: string,
                    value: string

                }) => (
                    <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

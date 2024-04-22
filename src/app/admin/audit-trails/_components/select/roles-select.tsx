import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const RolesSelect = ({
    defaultValue
}: {
    defaultValue?: string
}) => {

    return (
        <Select required name='role' defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default RolesSelect
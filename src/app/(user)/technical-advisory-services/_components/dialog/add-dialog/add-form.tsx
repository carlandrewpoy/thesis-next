'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { dateFormatterNumber, getSchoolYears } from '@/lib/utils'
import { createUtilization } from '@/server-actions/utilization'
import { DurationSelect } from '@/components/select/duration-select'
import { ProjectSelect } from '@/components/select/project-select'
import { Checkbox } from '@/components/ui/checkbox'
import { createTraining } from '@/server-actions/trainings'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ReloadIcon } from '@radix-ui/react-icons'
import { AutoFill } from '@/server-state-management/autofill'
import { link } from 'fs'
import { createCitation } from '@/server-actions/citations'
import { createTechnicalServices } from '@/server-actions/technical-advisory-services'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [state, formAction] = useFormState(createTechnicalServices, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,
        })
    }

    return (
        <form className="grid gap-4" action={formAction} >
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ProjectSelect />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Venue/Place</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='venue' />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">From</Label>
                <Label className="col-span-3 text-xs font-extralight">To</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className="col-span-3">
                    <Input type='date' name='dateStart' />
                </div>
                <div className="col-span-3">
                    <Input type='date' name='dateEnd' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Organizer</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='organizer' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Name of the faculty who invited</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='faculty' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Certificate/Invitation/Program/Evaluation</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='proofLink' />
                </div>
            </div>
            <div className='flex justify-end'>
                <SubmitButton />
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            disabled={pending}
        >
            {pending ? 'Saving...' : 'Save'}
        </Button>
    )
}

export default AddForm
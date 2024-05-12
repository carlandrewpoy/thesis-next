'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { dateFormatterNumber, getSchoolYears } from '@/lib/utils'
import { ProjectSelect } from '@/components/select/project-select'
import { Checkbox } from '@/components/ui/checkbox'
import { ReloadIcon } from '@radix-ui/react-icons'
import { AutoFill } from '@/server-state-management/autofill'
import { PublicationStatusSelect } from '@/components/select/publication-status-select'
import { CenterSelect } from '@/components/select/center-select'
import { createPublication } from '@/server-actions/publication'
import { ExtensionProjectSelect } from '@/components/select/extension-project-select'
import { createPartnership } from '@/server-actions/partnerships'
import { CollegeSelect } from '@/components/select/college-select'
import { AwardTypeSelect } from '@/components/select/award-type-select'
import { createAward } from '@/server-actions/award'
import { ResearchProjectSelect } from '@/components/select/research-project-select'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {
    const [selectedResearchers, setSelectedResearchers] = useState<string[]>([])
    const createWithOthers = createAward.bind(null, selectedResearchers)

    const [state, formAction] = useFormState(createWithOthers, null)
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
                <Label className="col-span-9 text-xs font-extralight">Research Title</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ResearchProjectCombobox columnName='projectId' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Researchers</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <MultiSelectFacultyCombobox selected={selectedResearchers} setSelected={setSelectedResearchers} />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Year Published</Label>
                <Label className="col-span-3 text-xs font-extralight">Type</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-3">
                    <Input name="yearPublished" />
                </div>
                <div className="col-span-3">
                    <AwardTypeSelect />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Publisher/Conference Organizer/Conferring Body</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='publisher' />
                </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Certificate and Program</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input name="certOrProgram" className="col-span-10" />
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
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { ProjectStatusSelect } from '@/components/select/project-status-select'
import { createPresentation } from '@/server-actions/presentation'
import { PresentationTypeSelect } from '@/components/select/presentation-type-select'

import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { CenterCombobox } from '@/components/combobox/mutation/center'
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {
    const [selected, setSelected] = useState<string[]>([])
    console.log(selected)
    const createWithOthers = createPresentation.bind(null, selected)
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
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ProjectCombobox />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Center</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CenterCombobox />
                </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-2-mb-3">
                <Label className="col-span-2 text-xs font-extralight">Start</Label>
                <Label className="col-span-2 text-xs font-extralight">Completed</Label>
                <Label className="col-span-2 text-xs font-extralight">Status</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-2">
                    <Input type='date' name="startedDate" />
                </div>
                <div className="col-span-2">
                    <Input type='date' name="completedDate" />
                </div>
                <div className="col-span-2">
                    <ProjectStatusSelect />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Article/Title</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input name="articleTitle" className="col-span-12" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Keywords</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input name="keywords" className="col-span-12" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Researchers</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                {/* <Input name="researchers" className="col-span-12" /> */}
                <MultiSelectFacultyCombobox selected={selected} setSelected={setSelected} />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Forum Title</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input name="forumTitle" className="col-span-12" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Venue</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input name="venue" className="col-span-12" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Type</Label>
                <Label className="col-span-3 text-xs font-extralight">Date</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className='col-span-3'>
                    <PresentationTypeSelect />
                </div>
                <Input type='date' name="date" className="col-span-3" />

            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Supporting Document</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input name="supportingDocs" className="col-span-12" />

            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">ABSTRACT</Label>
                <Label className="col-span-2 text-xs font-extralight">CERT OF APPEARANCE / PARTICIPATION</Label>
                <Label className="col-span-2 text-xs font-extralight">Conference Proceeding/Program</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <Checkbox name="movAbstract" className="col-span-2" />
                <Checkbox name="movCertOfAppearance" className="col-span-2" />
                <Checkbox name="movConferenceProgram" className="col-span-2" />
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
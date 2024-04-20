import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Utilization } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateGradSchoolFaculty } from '@/server-actions/grad-school-faculty'
import { Checkbox } from '@/components/ui/checkbox'
import { CenterSelect } from '@/components/select/center-select'
import { ProjectSelect } from '@/components/select/project-select'
import { updateUtilization } from '@/server-actions/utilization'
import { PresentationWithOthers } from '../../columns'
import { ProjectStatusSelect } from '@/components/select/project-status-select'
import { PresentationTypeSelect } from '@/components/select/presentation-type-select'
import { updatePresentation } from '@/server-actions/presentation'
import { Combobox } from '@/components/combobox/demo'
import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { CenterCombobox } from '@/components/combobox/mutation/center'
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'

const EditForm = ({ row, close }: {
    row: Row<PresentationWithOthers>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const [selected, setSelected] = useState(row.original.Researchers.map((item) => item.id))
    console.log(selected)
    const updateWithId = updatePresentation.bind(null, row.original.id, selected)
    const [state, formAction] = useFormState(updateWithId, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,

        })
    }
    if (state?.error) {
        close(false)
        toast({
            variant: 'destructive',
            duration: 1500,
            description: state?.error,

        })
    }
    const [mov1, setmov1] = useState(row.original.movAbstract)
    const [mov2, setmov2] = useState(row.original.movCertOfAppearance)
    const [mov3, setmov3] = useState(row.original.movConferenceProgram)


    const handleChangeMov1 = (checked: boolean) => {
        setmov1(checked)
    };
    const handleChangeMov2 = (checked: boolean) => {
        setmov2(checked)
    };
    const handleChangeMov3 = (checked: boolean) => {
        setmov3(checked)
    };


    return (
        <form className="grid gap-4" action={formAction} >
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ProjectCombobox defaultValue={row.original.project.title} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Center</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CenterCombobox defaultValue={row.original.center.name} />
                </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-2-mb-3">
                <Label className="col-span-2 text-xs font-extralight">Start</Label>
                <Label className="col-span-2 text-xs font-extralight">Completed</Label>
                <Label className="col-span-2 text-xs font-extralight">Status</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-2">
                    <Input defaultValue={row.original.startedDate ?? ''} type='date' name="startedDate" />
                </div>
                <div className="col-span-2">
                    <Input defaultValue={row.original.completedDate ?? ''} type='date' name="completedDate" />
                </div>
                <div className="col-span-2">
                    <ProjectStatusSelect defaultValue={row.original.status} />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Article/Title</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input defaultValue={row.original.articleTitle} name="articleTitle" className="col-span-12" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Keywords</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input defaultValue={row.original.keywords} name="keywords" className="col-span-12" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Researchers</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <MultiSelectFacultyCombobox selected={selected} setSelected={setSelected} />


            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Forum Title</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input defaultValue={row.original.forumTitle} name="forumTitle" className="col-span-12" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Venue</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input defaultValue={row.original.venue} name="venue" className="col-span-12" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Type</Label>
                <Label className="col-span-3 text-xs font-extralight">Date</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className='col-span-3'>
                    <PresentationTypeSelect defaultValue={row.original.type} />
                </div>
                <Input defaultValue={row.original.date} type='date' name="date" className="col-span-3" />

            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Supporting Document</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input defaultValue={row.original.supportingDocs} name="supportingDocs" className="col-span-12" />

            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">ABSTRACT</Label>
                <Label className="col-span-2 text-xs font-extralight">CERT OF APPEARANCE / PARTICIPATION</Label>
                <Label className="col-span-2 text-xs font-extralight">Conference Proceeding/Program</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <Checkbox checked={mov1} onCheckedChange={handleChangeMov1} name="movAbstract" className="col-span-2" />
                <Checkbox checked={mov2} onCheckedChange={handleChangeMov2} name="movCertOfAppearance" className="col-span-2" />
                <Checkbox checked={mov3} onCheckedChange={handleChangeMov3} name="movConferenceProgram" className="col-span-2" />
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

export default EditForm
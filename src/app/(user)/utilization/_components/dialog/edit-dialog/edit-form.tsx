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
import { UtilizationWithOther } from '../../columns'
import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { CenterCombobox } from '@/components/combobox/mutation/center'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'

const EditForm = ({ row, close }: {
    row: Row<UtilizationWithOther>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateWithId = updateUtilization.bind(null, row.original.id)
    const [state, formAction] = useFormState(updateWithId, null)
    const [mov1, setmov1] = useState(row.original.movMoa)
    const [mov2, setmov2] = useState(row.original.movReport)
    const [mov3, setmov3] = useState(row.original.movUtilization)
    const [mov4, setmov4] = useState(row.original.movPhotos)

    const handleChangeMov1 = (checked: boolean) => {
        setmov1(checked)
    };
    const handleChangeMov2 = (checked: boolean) => {
        setmov2(checked)
    };
    const handleChangeMov3 = (checked: boolean) => {
        setmov3(checked)
    };

    const handleChangeMov4 = (checked: boolean) => {
        setmov4(checked)
    };
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
    return (
        <form className="grid gap-4 p-4" action={formAction}>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ResearchProjectCombobox defaultValue={row.original.project.title ?? ''} columnName='projectId' />
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
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Proof/Description/Documentation</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='proof' defaultValue={row.original.proof} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Beneficiary</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='benificiary' defaultValue={row.original.benificiary} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Supporting Docs</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='supportingDocs' defaultValue={row.original.supportingDocs} />
                </div>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Notarized Moa</Label>
                <Label className="col-span-2 text-xs font-extralight">Report</Label>
                <Label className="col-span-2 text-xs font-extralight">Certificate of Utilization</Label>
                <Label className="col-span-2 text-xs font-extralight">Photos of Actual Product</Label>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 ">
                <Checkbox checked={mov1} onCheckedChange={handleChangeMov1} name="movMoa" className="col-span-2" />
                <Checkbox checked={mov2} onCheckedChange={handleChangeMov2} name="movReport" className="col-span-2" />
                <Checkbox checked={mov3} onCheckedChange={handleChangeMov3} name="movUtilization" className="col-span-2" />
                <Checkbox checked={mov4} onCheckedChange={handleChangeMov4} name="movPhotos" className="col-span-2" />
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
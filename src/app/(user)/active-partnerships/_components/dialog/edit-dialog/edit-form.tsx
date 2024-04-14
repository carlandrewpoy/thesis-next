import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Partnership, Publication, Training, Utilization } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateGradSchoolFaculty } from '@/server-actions/grad-school-faculty'
import { Checkbox } from '@/components/ui/checkbox'
import { CenterSelect } from '@/components/select/center-select'
import { ProjectSelect } from '@/components/select/project-select'
import { updateUtilization } from '@/server-actions/utilization'
import { DurationSelect } from '@/components/select/duration-select'
import { dateFormatterNumber } from '@/lib/utils'
import { PublicationStatusSelect } from '@/components/select/publication-status-select'
import { updatePublication } from '@/server-actions/publication'
import { ExtensionProjectSelect } from '@/components/select/extension-project-select'
import { CollegeSelect } from '@/components/select/college-select'
import { updatePartnership } from '@/server-actions/partnerships'
import { PartnershipWithOthers } from '../../columns'

const EditForm = ({ row, close }: {
    row: Row<PartnershipWithOthers>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateWithId = updatePartnership.bind(null, row.original.id)
    const [state, formAction] = useFormState(updateWithId, null)
    const [mov1, setmov1] = useState(row.original.movReport)
    const [mov2, setmov2] = useState(row.original.movMoa)
    const [mov3, setmov3] = useState(row.original.movAgencyCertification)

    const handleChangeMov1 = (checked: boolean) => {
        setmov1(checked)
    };
    const handleChangeMov2 = (checked: boolean) => {
        setmov2(checked)
    };
    const handleChangeMov3 = (checked: boolean) => {
        setmov3(checked)
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
        <form className="grid gap-4" action={formAction} >
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Extension</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ExtensionProjectSelect defaultValue={row.original.projectId} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">College</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CollegeSelect defaultValue={row.original.collegeId} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">PARTNER LGU /COMMUNITY / INDUSTRY / SMEs / PRIVATE OF PUBLIC AGENCIES /NGOs	</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.partner} name='partner' />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Start</Label>
                <Label className="col-span-3 text-xs font-extralight">End</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-3">
                    <Input defaultValue={row.original.dateStarted ?? ''} type='date' name="dateStarted" />
                </div>
                <div className="col-span-3">
                    <Input defaultValue={row.original.dateEnded ?? ''} type='date' name="dateEnded" />
                </div>

            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Implementors/ Delivery Units/Bureaus	</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.implementor} name='implementor' />
                </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Supporting Document</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input defaultValue={row.original.supportingDocs} name="supportingDocs" className="col-span-12" />

            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Report</Label>
                <Label className="col-span-2 text-xs font-extralight"> MOA/MOU or other similar documents</Label>
                <Label className="col-span-2 text-xs font-extralight">Certification from the partner agency</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <Checkbox checked={mov1} onCheckedChange={handleChangeMov1} name="movReport" className="col-span-2" />
                <Checkbox checked={mov2} onCheckedChange={handleChangeMov2} name="movMoa" className="col-span-2" />
                <Checkbox checked={mov3} onCheckedChange={handleChangeMov3} name="movAgencyCertification" className="col-span-2" />
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
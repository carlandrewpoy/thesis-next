import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Center, College, Project, User } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateUser } from '@/server-actions/auth/auth'
import { updateCollege } from '@/server-actions/college'
import { CollegeSelect } from '@/components/select/college-select'
import { updateCenter } from '@/server-actions/center'
import { ProjectTypeSelect } from '@/components/select/project-type-select'
import { ProjectStatusSelect } from '@/components/select/project-status-select'
import { Checkbox } from '@/components/ui/checkbox'
import { updateProject } from '@/server-actions/project'
import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { ExtensionProjectCombobox } from '@/components/combobox/mutation/extension-project'
import { ProjectWithOthers } from '../../columns'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'
import { FacultyCombobox } from '@/components/combobox/mutation/faculty'
import { Badge } from '@/components/ui/badge'
import { CenterCombobox } from '@/components/combobox/mutation/center'

const EditForm = ({ row, close }: {
    row: Row<ProjectWithOthers>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const [selectedResearchers, setSelectedResearchers] = useState<string[]>(row.original.researchWorkers.map((item) => item.id))
    const createWithOthers = updateProject.bind(null, row.original.id, selectedResearchers)
    const [state, formAction] = useFormState(createWithOthers, null)
    const [mov1, setmov1] = useState(row.original.movSignedBudgetAllocation)
    const [mov2, setmov2] = useState(row.original.movSingedReports)
    const [mov3, setmov3] = useState(row.original.movNotarizedMoa)
    const [mov4, setmov4] = useState(row.original.movBoardResolution)

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
        <form className="grid gap-4 " action={formAction}>
            <div>
                <Badge>{row.original.type ?? ''}</Badge>
            </div>
            <input className='hidden' type="text" defaultValue={row.original.type ?? ''} name='type' />

            {row.original.extensionProjectId ?
                <>
                    <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                        <Label className="col-span-9 text-xs font-extralight">Project</Label>
                    </div>
                    <div className="grid grid-cols-9 items-center gap-4 ">
                        <div className='col-span-9'>
                            <ResearchProjectCombobox defaultValue={row.original.extensionProject?.title ?? ''} columnName='extensionProjectId' />
                        </div>
                    </div>
                </> : <>
                    <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                        <Label className="col-span-3 text-xs font-extralight">Title</Label>
                    </div>
                    <div className="grid grid-cols-6 items-center gap-4 ">
                        <Input name="title" defaultValue={row.original.title ?? ''} className="col-span-6" />
                    </div>
                </>}
            {/* <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Title</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <Input defaultValue={row.original.title} name="title" className="col-span-6" />
            </div> */}
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Research Workers</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <MultiSelectFacultyCombobox selected={selectedResearchers} setSelected={setSelectedResearchers} />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">

                <Label className="col-span-3 text-xs font-extralight">Center</Label>
                <Label className="col-span-3 text-xs font-extralight">Status</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <div className="col-span-3">
                    <CenterCombobox defaultValue={row.original.center.name} />
                </div>
                <div className="col-span-3">
                    <ProjectStatusSelect defaultValue={row.original.status} />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Started Date</Label>
                <Label className="col-span-2 text-xs font-extralight">End Date</Label>
                <Label className="col-span-2 text-xs font-extralight">Extension Date</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2">
                <Input defaultValue={row.original.dateStart ?? ''} type='date' name="dateStart" className="col-span-2" />
                <Input defaultValue={row.original.dateCompleted ?? ''} type='date' name="dateCompleted" className="col-span-2" />
                <Input defaultValue={row.original.dateExtension ?? ''} type='date' name="dateExtension" className="col-span-2" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Funding Agency</Label>
                <Label className="col-span-3 text-xs font-extralight">Coop Agency</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input defaultValue={row.original.fundingAgency} name="fundingAgency" className="col-span-3" />
                <Input defaultValue={row.original.coopAgency} name="coopAgency" className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Project Leader</Label>
                <Label className="col-span-3 text-xs font-extralight">Approved Project Cost</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className='col-span-3'>
                    <FacultyCombobox columnName='projectLeaderId' defaultValue={row.original.projectLeader} />
                </div>
                <Input defaultValue={row.original.approvedProjectCost.toString()} type='number' name="approvedProjectCost" className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Benefeciary</Label>
                <Label className="col-span-3 text-xs font-extralight">Mandated Program</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input defaultValue={row.original.beneficiaries} name="beneficiaries" className="col-span-3" />
                <Input defaultValue={row.original.mandatedProgram} name="mandatedProgram" className="col-span-3" />
            </div>
            <div className="grid grid-cols-8 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Signed Budget</Label>
                <Label className="col-span-2 text-xs font-extralight">Signed Reports</Label>
                <Label className="col-span-2 text-xs font-extralight">Notarized Moa</Label>
                <Label className="col-span-2 text-xs font-extralight">Board Resolution</Label>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 ">

                <Checkbox checked={mov1} onCheckedChange={handleChangeMov1} name="movSignedBudgetAllocation" className="col-span-2" />
                <Checkbox checked={mov2} onCheckedChange={handleChangeMov2} name="movSingedReports" className="col-span-2" />
                <Checkbox checked={mov3} onCheckedChange={handleChangeMov3} name="movNotarizedMoa" className="col-span-2" />
                <Checkbox checked={mov4} onCheckedChange={handleChangeMov4} name="movBoardResolution" className="col-span-2" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Supporting Document</Label>
                <Label className="col-span-3 text-xs font-extralight">Project Reports</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input defaultValue={row.original.supportingDocs} name="supportingDocs" className="col-span-3" />
                <Input defaultValue={row.original.projectReport} name="projectReport" className="col-span-3" />
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
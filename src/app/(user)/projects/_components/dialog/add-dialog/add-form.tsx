import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { createCenter } from '@/server-actions/center'
import { CollegeSelect } from '@/components/select/college-select'
import { Checkbox } from '@/components/ui/checkbox'
import { ProjectTypeSelect } from '@/components/select/project-type-select'
import { ProjectStatusSelect } from '@/components/select/project-status-select'
import { createProject } from '@/server-actions/project'
import { Switch } from '@/components/ui/switch'
import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { ExtensionProjectCombobox } from '@/components/combobox/mutation/extension-project'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {
    const [projectToggle, setprojectToggle] = useState(false)
    const handleProjectToggle = () => { setprojectToggle(!projectToggle) }
    const [state, formAction] = useFormState(createProject, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,

        })
    }


    return (
        <form className="grid gap-4" action={formAction}>
            <div className="flex items-center space-x-2">
                <Switch name='type' checked={projectToggle} onCheckedChange={handleProjectToggle} />
                <Label >Extension Project</Label>
            </div>
            {projectToggle ?
                <>
                    <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                        <Label className="col-span-9 text-xs font-extralight">Project</Label>
                    </div>
                    <div className="grid grid-cols-9 items-center gap-4 ">
                        <div className='col-span-9'>
                            <ResearchProjectCombobox columnName='extensionProjectId' />
                        </div>
                    </div>
                </> : <>
                    <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                        <Label className="col-span-3 text-xs font-extralight">Title</Label>
                    </div>
                    <div className="grid grid-cols-6 items-center gap-4 ">
                        <Input name="title" className="col-span-6" />
                    </div>
                </>}

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Research Workers</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <Input name="researchWorkers" className="col-span-6" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                {/* <Label className="col-span-3 text-xs font-extralight">Project Type</Label> */}
                <Label className="col-span-6 text-xs font-extralight">Status</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                {/* <div className="col-span-3">
                    <ProjectTypeSelect />
                </div> */}
                <div className="col-span-6">
                    <ProjectStatusSelect />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Started Date</Label>
                <Label className="col-span-2 text-xs font-extralight">End Date</Label>
                <Label className="col-span-2 text-xs font-extralight">Extension Date</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2">
                <Input type='date' name="dateStart" className="col-span-2" />
                <Input type='date' name="dateCompleted" className="col-span-2" />
                <Input type='date' name="dateExtension" className="col-span-2" />

            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Funding Agency</Label>
                <Label className="col-span-3 text-xs font-extralight">Coop Agency</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input name="fundingAgency" className="col-span-3" />
                <Input name="coopAgency" className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Project Leader</Label>
                <Label className="col-span-3 text-xs font-extralight">Approved Project Cost</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input name="projectLeader" className="col-span-3" />
                <Input type='number' name="approvedProjectCost" className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Benefeciary</Label>
                <Label className="col-span-3 text-xs font-extralight">Mandated Program</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input name="beneficiaries" className="col-span-3" />
                <Input name="mandatedProgram" className="col-span-3" />
            </div>
            <div className="grid grid-cols-8 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Signed Budget</Label>
                <Label className="col-span-2 text-xs font-extralight">Signed Reports</Label>
                <Label className="col-span-2 text-xs font-extralight">Notarized Moa</Label>
                <Label className="col-span-2 text-xs font-extralight">Board Resolution</Label>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 ">
                <Checkbox name="movSignedBudgetAllocation" className="col-span-2" />
                <Checkbox name="movSingedReports" className="col-span-2" />
                <Checkbox name="movNotarizedMoa" className="col-span-2" />
                <Checkbox name="movBoardResolution" className="col-span-2" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Supporting Document</Label>
                <Label className="col-span-3 text-xs font-extralight">Project Reports</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input name="supportingDocs" className="col-span-3" />
                <Input name="projectReport" className="col-span-3" />
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
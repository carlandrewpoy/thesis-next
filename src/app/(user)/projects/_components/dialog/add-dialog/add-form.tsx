import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { AutoFill } from '@/server-state-management/autofill'
import { dateFormatterNumber } from '@/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'
import { FacultyCombobox } from '@/components/combobox/mutation/faculty'
import { CenterCombobox } from '@/components/combobox/mutation/center'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {
    const [selectedResearchers, setSelectedResearchers] = useState<string[]>([])
    const createWithOthers = createProject.bind(null, selectedResearchers)
    const [projectToggle, setprojectToggle] = useState(false)
    const handleProjectToggle = () => { setprojectToggle(!projectToggle) }
    const [state, formAction] = useFormState(createWithOthers, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,

        })
    }

    const { mutateAsync: autofillFN, isPending } = AutoFill();
    const [autoFillData, setautoFillData] = useState<TProject>()
    const [link, setlink] = useState('')
    const params = {
        "link": link,
        "table": "PROGRAM"
    }
    !isPending && console.log(autoFillData)

    const handleClick = async () => {
        if (link === '') return toast({ description: 'Please enter a link', duration: 1500, variant: 'destructive' })
        const res = await autofillFN(params as any)
        if (!res.data.mov) return toast({ description: 'Invalid link', duration: 1500, variant: 'destructive' })
        setautoFillData(res.data as any)
        if (res.data.mov) {
            toast({
                duration: 1500,
                description: 'Scan successfuly',
            })
        }
    }

    const [mov1, setmov1] = useState(false)
    const [mov2, setmov2] = useState(false)
    const [mov3, setmov3] = useState(false)
    const [mov4, setmov4] = useState(false)

    useEffect(() => {
        setmov1(autoFillData?.mov.budget === 1 ? true : false)
        setmov2(autoFillData?.mov.report === 1 ? true : false)
        setmov3(autoFillData?.mov.moa === 1 ? true : false)
        setmov4(autoFillData?.mov.resolution === 1 ? true : false)
    }, [autoFillData])


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


    return (
        <form className="grid gap-4" action={formAction}>
            <div className="flex items-center space-x-2">
                <Switch name='type' checked={projectToggle} onCheckedChange={handleProjectToggle} />
                <Label >Extension Project</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Supporting Document</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input onChange={(e) => setlink(e.target.value)} name="supportingDocs" className="col-span-10" />
                <div className='col-span-2'>
                    {/* <Button type='button' variant={'secondary'}>Read</Button> */}
                    <Button type='button' onClick={handleClick} disabled={isPending}>
                        {isPending ? <div className='flex items-center justify-center w-10'>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        </div> : 'Scan'}
                    </Button>
                </div>
                <div className='col-span-12'>
                </div>
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
                <MultiSelectFacultyCombobox selected={selectedResearchers} setSelected={setSelectedResearchers} />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Center</Label>
                <Label className="col-span-3 text-xs font-extralight">Status</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <div className="col-span-3">
                    <CenterCombobox />
                </div>
                <div className="col-span-3">
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

                <div className='col-span-3'>
                    <FacultyCombobox columnName='projectLeaderId' />
                </div>
                <Input type='number' name="approvedProjectCost" className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Benefeciary</Label>
                <Label className="col-span-3 text-xs font-extralight">Mandated Program</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input defaultValue={autoFillData?.results.beneficiaries} name="beneficiaries" className="col-span-3" />
                <Input defaultValue={autoFillData?.results.mandatedProgram} name="mandatedProgram" className="col-span-3" />
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
                <Label className="col-span-6 text-xs font-extralight">Project Reports</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <Input name="projectReport" className="col-span-6" />
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
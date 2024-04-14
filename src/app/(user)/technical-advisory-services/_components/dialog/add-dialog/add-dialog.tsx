import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddForm from "./add-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

export function AddDialog() {
    const [openDialog, setOpenDialog] = useState(false)
    const handleChange = () => {
        setOpenDialog(prev => !prev)
    }
    return (
        <Dialog open={openDialog} onOpenChange={handleChange}>
            <DialogTrigger asChild >
                <Button variant="outline"
                    size="sm"
                    className="h-8 ">
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95%] overflow-y-auto ">
                {/* <ScrollArea className="max-h-screen"> */}
                {/* <div className="bg-slate-600 h-[80%]"> */}
                <DialogHeader>
                    <DialogTitle>Add Technical Advisory-Service</DialogTitle>
                    <DialogDescription>
                        Remember to save your data after completing the form.
                    </DialogDescription>
                </DialogHeader>
                {/* <div className="h-full"> */}
                <AddForm close={setOpenDialog} />
                {/* </div> */}
                {/* </div> */}
                {/* </ScrollArea> */}
            </DialogContent>
        </Dialog>
    )
}

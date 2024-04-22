import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LogDetails({
    data,
}: {
    data: any
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80%] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>Log Details</DialogTitle>

                </DialogHeader>
                {/* {JSON.stringify(data)} */}
                <pre className="mt-2  rounded-md bg-card ">
                    <code className="text-card-foreground">{JSON.stringify(data, null, 2)}</code>
                </pre>

            </DialogContent>
        </Dialog>
    )
}

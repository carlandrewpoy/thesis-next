import { Button } from "@/components/ui/button"
import { exportFunc } from "./excelExport"

const ExportButton: React.FC = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("training clicked buttonsadf")
    const currentDateTime = new Date().toLocaleDateString().replace(/\//g, "-")
    //console.log(currentDateTime)
    exportFunc(currentDateTime)
  }
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="flex flex-col gap-3">
        <Button type="submit" variant="outline" size="sm" className="h-8 ">
          Export to Excel
        </Button>
      </div>
    </form>
  )
}

export default ExportButton

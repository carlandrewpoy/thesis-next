import * as XLSX from "xlsx"
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate"
import { gradTest } from "../summary_report"
import { Button } from "./ui/button"

const ExcelExportHelper = (result) => {
    let data = result.result.result1
    let data1 = result.result.result2
    // console.log("dataaaaa", result)
    const data2 = [
        {
            facultyName: data1.totalFaculty,
            position: "A",
            name: data1.alldata.A,
            letter: "C",
            description:
                "Producing technologies for commercialization or livelihood improvement",
        },
        {
            facultyName: "",
            position: "B",
            name: data1.alldata.B,
            letter: "A",
            description: "Pursing advanced research degree program (Ph.D.)",
        },
        {
            facultyName: "",
            position: "C",
            name: data1.alldata.C,
            letter: "E",
            description: "asdfsaf",
        },
        {
            facultyName: "",
            position: "D",
            name: data1.alldata.D,
            letter: "D",
            description: "i miss you",
        },
        {
            facultyName: "",
            position: "E",
            name: data1.alldata.E,
            letter: "E",
            description: "asdfsaf",
        },
    ]
    const createDownLoadData = () => {
        handleExport().then((url) => {
            // console.log(url)
            const downloadAnchorNode = document.createElement("a")
            downloadAnchorNode.setAttribute("href", url)
            downloadAnchorNode.setAttribute("download", "summary_report.xlsx")
            downloadAnchorNode.click()
            downloadAnchorNode.remove()
        })
    }

    const workbook2blob = (workbook) => {
        const wopts = {
            bookType: "xlsx",
            bookSST: false,
            type: "binary",
        }

        const wbout = XLSX.write(workbook, wopts)

        // The application/octet-stream MIME type is used for unknown binary files.
        // It preserves the file contents, but requires the receiver to determine file type,
        // for example, from the filename extension.
        const blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream",
        })

        return blob
    }

    const s2ab = (s) => {
        // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
        // create an ArrayBuffer with a size in bytes
        const buf = new ArrayBuffer(s.length)

        // console.log(buf)

        //create a 8 bit integer array
        const view = new Uint8Array(buf)

        // console.log(view)
        //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
        for (let i = 0; i !== s.length; ++i) {
            //console.log(s.charCodeAt(i))
            view[i] = s.charCodeAt(i)
        }

        return buf
    }

    const handleExport = () => {
        const title = [{ A: "Graduate School Faculty" }, {}]

        let table1 = [
            {
                A: "No.",
                B: "Faculty Name",
                C: "Position",
                D: "College",
                E: "Engagement",
                F: "Description",
            },
        ]
        let table2 = [
            {
                A: "No.",
                B: "Total Faculty",
                C: "Category",
                D: "No. of Faculty",
            },
        ]

        data.forEach((row, index) => {
            // const studentDetails = row.STUDENT_DETAILS
            // const marksDetails = row.MARKS

            table1.push({
                A: index + 1,
                B: row.facultyName,
                C: row.position,
                D: row.name,
                E: row.letter,
                F: row.description,
            })
        })
        data2.forEach((row, index) => {
            // const studentDetails = row.STUDENT_DETAILS
            // const marksDetails = row.MARKS

            table2.push({
                A: "",
                B: row.facultyName,
                C: row.position,
                D: row.name,
            })
        })
        // console.log(table1)
        table1 = [{ A: "" }]
            .concat(table1)
            .concat([""])
            .concat([{ B: "Summary Report" }])
            .concat(table2)

        const finalData = [...title, ...table1]

        // console.log(finalData)

        //create a new workbook
        const wb = XLSX.utils.book_new()

        const sheet = XLSX.utils.json_to_sheet(finalData, {
            skipHeader: true,
        })
        // XLSX.utils.sheet_add_json(sheet, [{ "Total Faculty": "tesing" }], {
        //   origin: -1,
        // })
        XLSX.utils.book_append_sheet(wb, sheet, "summary_report")

        // binary large object
        // Since blobs can store binary data, they can be used to store images or other multimedia files.

        const workbookBlob = workbook2blob(wb)

        var headerIndexes = []

        finalData.forEach((data, index) =>
            data["A"] === "No." ? headerIndexes.push(index) : null
        )
        // console.log("headerIndexes", headerIndexes)
        const totalRecords = data.length

        const dataInfo = {
            titleCell: "A2",
            titleRange: "A1:H2",
            tbodyRange: `A3:H${finalData.length}`,
            theadRange:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[0] + 1}:G${headerIndexes[0] + 1}`
                    : null,

            tFirstColumnRange:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
                    : null,
            tLastColumnRange:
                headerIndexes?.length >= 1
                    ? `G${headerIndexes[0] + 1}:F${totalRecords + headerIndexes[0] + 1}`
                    : null,
            theadRange1:
                headerIndexes?.length >= 2
                    ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}`
                    : null,
            tLargeCell:
                headerIndexes?.length >= 2
                    ? `B${headerIndexes[1] + 2}:B${5 + headerIndexes[1] + 1}`
                    : null,
            tFirstColumnRange1:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[1] + 1}:A${totalRecords + headerIndexes[1] + 1}`
                    : null,
            tLastColumnRange1:
                headerIndexes?.length >= 1
                    ? `H${headerIndexes[0] + 1}:H${totalRecords + headerIndexes[1] + 1}`
                    : null,
        }

        return addStyle(workbookBlob, dataInfo)
    }

    const addStyle = (workbookBlob, dataInfo) => {
        return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
            workbook.sheets().forEach((sheet) => {
                sheet.usedRange().style({
                    fontFamily: "Arial",
                    verticalAlignment: "center",
                })

                sheet.column("A").width(5)
                sheet.column("B").width(40)
                sheet.column("C").width(20)
                sheet.column("D").width(20)
                sheet.column("E").width(20)
                sheet.column("F").width(50)

                sheet.range(dataInfo.titleRange).merged(true).style({
                    bold: true,
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                })
                sheet.range(dataInfo.tLargeCell).merged(true).style({
                    bold: true,
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                })

                if (dataInfo.tbodyRange) {
                    sheet.range(dataInfo.tbodyRange).style({
                        horizontalAlignment: "center",
                    })
                }

                sheet.range(dataInfo.theadRange).style({
                    fill: "FFFD04",
                    bold: true,
                    horizontalAlignment: "center",
                })

                if (dataInfo.theadRange1) {
                    sheet.range(dataInfo.theadRange1).style({
                        fill: "808080",
                        bold: true,
                        horizontalAlignment: "center",
                        fontColor: "ffffff",
                    })
                }

                if (dataInfo.tFirstColumnRange) {
                    sheet.range(dataInfo.tFirstColumnRange).style({ bold: true })
                }

                if (dataInfo.tLastColumnRange) {
                    sheet.range(dataInfo.tLastColumnRange).style({
                        horizontalAlignment: "align left",
                    })
                }

                if (dataInfo.tFirstColumnRange1) {
                    sheet.range(dataInfo.tFirstColumnRange1).style({
                        bold: true,
                    })
                }

                if (dataInfo.tLastColumnRange1) {
                    sheet.range(dataInfo.tLastColumnRange1).style({
                        bold: true,
                    })
                }
            })

            return workbook
                .outputAsync()
                .then((workbookBlob) => URL.createObjectURL(workbookBlob))
        })
    }

    return (
        <>

            <Button
                onClick={() => {
                    createDownLoadData()
                }}
                variant="outline" className="h-8 px-2 lg:px-3">
                Export
            </Button>
        </>
    )
}

export default ExcelExportHelper

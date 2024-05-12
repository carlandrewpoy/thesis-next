import * as XLSX from "xlsx"
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate"
import { forfetch } from "./excelExportFetch"

export async function exportFunc(currentDateTime) {
  const fileName = `ACTPARTNER_(${currentDateTime})`
  console.log("fileName", fileName)
  //console.log("detailsData", detailsData)
  const result = await forfetch()
  console.log("result", result)
  //console.log("result3", result3)

  let data = result

  const createDownLoadData = () => {
    handleExport().then((url) => {
      //console.log(url)
      const downloadAnchorNode = document.createElement("a")
      downloadAnchorNode.setAttribute("href", url)
      downloadAnchorNode.setAttribute("download", `${fileName}.xlsx`)
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

    //console.log(buf)

    //create a 8 bit integer array
    const view = new Uint8Array(buf)

    //console.log(view)
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      //console.log(s.charCodeAt(i))
      view[i] = s.charCodeAt(i)
    }

    return buf
  }

  const handleExport = () => {
    const title = [
      {
        A: `Active Partnerships: Exported(${currentDateTime})`,
      },
      {},
    ]

    const tables = {
      CCIS: [
        {
          A: "No.",
          B: "College",
          C: "Partner/ Community/ NGOs",
          D: "Extensions",
          E: "Date Started",
          F: "Date Completed",
          G: "Implementors/ Delivery Units",
          H: "Supporting Docs",
        },
      ],
    }

    let forNo = 1
    data.forEach((row) => {
      tables.CCIS.push({
        A: forNo,
        B: row.name,
        C: row.partner,
        D: row.title,
        E: row.dateStarted,
        F: row.dateEnded,
        G: row.implementor,
        H: row.supportingDocs,
      })
      forNo++
    })

    const finalData = [
      ...title,
      { A: `Exported(${currentDateTime})` },
      ...tables.CCIS,
    ]

    //console.log(finalData)
    //create a new workbook
    const wb = XLSX.utils.book_new()

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    })
    XLSX.utils.book_append_sheet(wb, sheet, `${fileName}`)

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb)

    const headerIndexes: any = []

    const departmentNames = [`Exported(${currentDateTime})`]

    finalData.forEach((data, index) => {
      if (data["A"] === "No." || departmentNames.includes(data["A"])) {
        headerIndexes.push(index)
      }
    })
    // console.log("headerIndexes", headerIndexes)
    // console.log("headerlength", headerIndexes.length)
    const totalRecords = data.length

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:H2",
      tbodyRange: `A3:H${finalData.length}`,

      ////////////////aron d libogggggggggggg
      theadRangeHeader:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}`
          : null,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:H${headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${
              totalRecords + headerIndexes[headerIndexes.length - 1] + 1
            }`
          : null,

      ///////////////////////asdfasdf

      ////////////////
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
        sheet.column("B").width(10)
        sheet.column("C").width(50)
        sheet.column("D").width(50)
        sheet.column("E").width(20)
        sheet.column("F").width(20)
        sheet.column("G").width(50)
        sheet.column("H").width(50)

        sheet.range(dataInfo.titleRange).merged(true).style({
          border: true,
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        })

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "center",
          })
        }
        const theadStyle = {
          fill: "00b050",
          fontColor: "ffffff",
          // fill: "FFFD04",
          bold: true,
          horizontalAlignment: "align left",
        }
        const theadStyleHeader = {
          fill: "FFFD04",
          // fill: "FFFD04",
          bold: true,
          border: true,
          horizontalAlignment: "center",
        }
        sheet.range(dataInfo.theadRangeHeader).style(theadStyleHeader)
        sheet.range(dataInfo.theadRange).merged(true).style(theadStyle)

        if (dataInfo.tFirstColumnRange) {
          sheet.range(dataInfo.tFirstColumnRange).style({ bold: true })
        }

        if (dataInfo.tLastColumnRange) {
          sheet.range(dataInfo.tLastColumnRange).style({
            horizontalAlignment: "align left",
          })
        }
      })

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob))
    })
  }
  createDownLoadData()
}

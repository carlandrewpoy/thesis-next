import * as XLSX from "xlsx"
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate"
import { forfetch } from "./presentExportFetch"

export async function presentExport(detailsData) {
  const fileName = `PRESENTATION_(${detailsData})`
  console.log("fileName", fileName)
  //console.log("detailsData", detailsData)
  const result3 = await forfetch(detailsData)
  //console.log("result3", result3)

  let data = result3.result
  let data1 = result3.result2
  console.log("export data", data)
  console.log("presentation fetch query", result3)
  const data2 = [
    {
      totalCount: data.length,
      type: "International",
      typeCount: data1.INTERNATIONAL,
      typePercent: `${((data1.INTERNATIONAL / data.length) * 100).toFixed(2)}%`,
    },
    {
      totalCount: "",
      type: "National",
      typeCount: data1.NATIONAL,
      typePercent: `${((data1.NATIONAL / data.length) * 100).toFixed(2)}%`,
    },
    {
      totalCount: "",
      type: "Regional",
      typeCount: data1.REGIONAL,
      typePercent: `${((data1.REGIONAL / data.length) * 100).toFixed(2)}%`,
    },
  ]
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
        A: `Presentation: Filtered by: Year(${detailsData})`,
      },
      {},
    ]

    const tables = {
      CCIS: [
        {
          A: "No.",
          B: "Research Title",
          C: "Status",
          D: "Date Started",
          E: "Date Completed",
          F: "RDI Center",
          G: "Article/ Title",
          H: "Keywords",
          I: "Researchers",
          J: "Forum Title",
          K: "Venue",
          L: "Type",
          M: "Date",
          N: "Supporting Docs",
        },
      ],
      table2: [
        {
          A: "No.",
          B: "Total Research",
          C: "Type",
          D: "No. of Research",
          E: "% of Research",
        },
      ],
    }

    let forNo = 1
    data.forEach((row) => {
      tables.CCIS.push({
        A: forNo,
        B: row.projectTitle,
        C: row.status,
        D: row.startedDate,
        E: row.completedDate,
        F: row.centerName,
        G: row.articleTitle,
        H: row.keywords,
        I: row.researchers,
        J: row.forumTitle,
        K: row.venue,
        L: row.type,
        M: row.date,
        N: row.supportingDocs,
      })
      forNo++
    })

    data2.forEach((row) => {
      tables.table2.push({
        A: "",
        B: row.totalCount,
        C: row.type,
        D: row.typeCount,
        E: row?.typePercent,
      })
    })

    const finalData = [
      ...title,
      { B: "Data Table" },
      { A: `Year(${detailsData})` },
      ...tables.CCIS,
      { B: "Summary Report" },
      ...tables.table2,
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

    const departmentNames = [`Year(${detailsData})`]

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
      titleRange: "A1:N2",
      tbodyRange: `A3:N${finalData.length}`,

      ////////////////aron d libogggggggggggg
      theadRangeHeader:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:N${headerIndexes[1] + 1}`
          : null,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:N${headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${
              totalRecords + headerIndexes[headerIndexes.length - 1] + 1
            }`
          : null,

      ///////////////////////asdfasdf
      tLargeCell:
        headerIndexes?.length >= 2
          ? `B${headerIndexes[headerIndexes.length - 1] + 2}:B${
              headerIndexes[headerIndexes.length - 1] + 4
            }`
          : null,

      ////////////////
      theadRange1:
        headerIndexes?.length >= 3
          ? `A${headerIndexes[headerIndexes.length - 1] + 1}:E${
              headerIndexes[headerIndexes.length - 1] + 1
            }`
          : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[2] + 1}:A${totalRecords + headerIndexes[2] + 1}`
          : null,
      tLastColumnRange1:
        headerIndexes?.length >= 1
          ? `E${headerIndexes[headerIndexes.length - 1] + 1}:E${
              totalRecords + headerIndexes[headerIndexes.length - 1] + 1
            }`
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
        sheet.column("B").width(60)
        sheet.column("C").width(20)
        sheet.column("D").width(20)
        sheet.column("E").width(20)
        sheet.column("F").width(30)
        sheet.column("G").width(50)
        sheet.column("H").width(50)
        sheet.column("I").width(50)
        sheet.column("J").width(50)
        sheet.column("K").width(25)
        sheet.column("L").width(25)
        sheet.column("M").width(20)
        sheet.column("N").width(50)

        sheet.range(dataInfo.titleRange).merged(true).style({
          border: true,
          bold: true,
          horizontalAlignment: "align left",
          verticalAlignment: "center",
        })
        sheet.range(dataInfo.tLargeCell).merged(true).style({
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

        if (dataInfo.theadRange1) {
          sheet.range(dataInfo.theadRange1).style({
            fill: "808080",
            bold: true,
            horizontalAlignment: "center",
            border: true,
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
            horizontalAlignment: "center",
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

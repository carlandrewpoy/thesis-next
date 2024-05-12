import * as XLSX from "xlsx"
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate"
import { forfetch } from "./presentExportFetch"

export async function trainingExport(currentDateTime) {
  const fileName = `TRAININGS_(${currentDateTime})`
  console.log("fileName", fileName)
  //console.log("detailsData", detailsData)
  const result3 = await forfetch()
  //console.log("result3", result3)

  let data = result3.result
  let data1 = result3.result2
  console.log("export data", data)
  console.log("presentation fetch query", result3)
  const data2 = [
    {
      totalCount: "Overall",
      traineesCount: data1.traineesCount,
      traineesWeighted: data1.traineesWeighted,
      traineesSurveyedCount: data1.traineesSurveyedCount,
      ratePoor: data1.ratePoor,
      rateFair: data1.rateFair,
      rateSatisfactory: data1.rateSatisfactory,
      rateVerySatisfactory: data1.rateVerySatisfactory,
      rateExcellent: data1.rateExcellent,
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
        A: `Training: Exported(${currentDateTime})`,
      },
      {},
    ]

    const tables = {
      CCIS: [
        {
          A: "No.",
          B: "Training Title",
          C: "Venue",
          D: "Date Started",
          E: "Date Completed",
          F: "Duration",
          G: "No. of Trainees",
          H: "Weighted Trainees",
          I: "No. of Surveyed",
          J: "Poor",
          K: "Fair",
          L: "Satisfactory",
          M: "Very Satisfactory",
          N: "Excellent",
          O: "Poor",
          P: "Fair",
          Q: "Satisfactory",
          R: "Very Satisfactory",
          S: "Excellent",
          T: "Supporting Docs",
        },
      ],
      table2: [
        {
          F: "",
          G: "No. of Trainees",
          H: "Weighted Trainees",
          I: "No. of Surveyed",
          J: "Poor",
          K: "Fair",
          L: "Satisfactory",
          M: "Very Satisfactory",
          N: "Excellent",
        },
      ],
    }

    let forNo = 1
    data.forEach((row) => {
      tables.CCIS.push({
        A: forNo,
        B: row.title,
        C: row.venue,
        D: row.dateStarted,
        E: row.dateEnded,
        F: row.duration,
        G: row.traineesCount,
        H: row.traineesWeighted,
        I: row.traineesSurveyedCount,
        J: row.ratePoor,
        K: row.rateFair,
        L: row.rateSatisfactory,
        M: row.rateVerySatisfactory,
        N: row.rateExcellent,
        O: row.rateTimelinessPoor,
        P: row.rateTimelinessFair,
        Q: row.rateTimelinessSatisfactory,
        R: row.rateTimelinessVerySatisfactory,
        S: row.rateTimelinessExcellent,
        T: row.supportingDocs,
      })
      forNo++
    })

    data2.forEach((row) => {
      tables.table2.push({
        F: "Overall",
        G: row.traineesCount,
        H: row.traineesWeighted,
        I: row.traineesSurveyedCount,
        J: row?.ratePoor,
        K: row?.rateFair,
        L: row?.rateSatisfactory,
        M: row?.rateVerySatisfactory,
        N: row?.rateExcellent,
      })
    })

    const finalData = [
      ...title,
      { B: "Data Table" },
      { A: `Exported(${currentDateTime})` },
      ...tables.CCIS,
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

    const departmentNames = [
      `Exported(${currentDateTime})`,
      "No. of Trainees",
      "Overall",
    ]

    finalData.forEach((data, index) => {
      if (
        data["A"] === "No." ||
        departmentNames.includes(data["A"]) ||
        departmentNames.includes(data["G"]) ||
        departmentNames.includes(data["F"])
      ) {
        headerIndexes.push(index)
      }
    })
    // console.log("headerIndexes", headerIndexes)
    // console.log("headerlength", headerIndexes.length)
    const totalRecords = data.length

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:T2",
      tbodyRange: `A3:T${finalData.length}`,

      ////////////////aron d libogggggggggggg
      theadRangeHeader:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:T${headerIndexes[1] + 1}`
          : null,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:T${headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${
              totalRecords + headerIndexes[headerIndexes.length - 1] + 1
            }`
          : null,

      ///////////////////////asdfasdf

      ////////////////
      theadRange1:
        headerIndexes?.length >= 3
          ? `F${headerIndexes[headerIndexes.length - 2] + 1}:N${
              headerIndexes[headerIndexes.length - 2] + 1
            }`
          : null,
      tLastRowRange:
        headerIndexes?.length >= 3
          ? `F${headerIndexes[headerIndexes.length - 1] + 1}:N${
              headerIndexes[headerIndexes.length - 1] + 1
            }`
          : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1
          ? `F${headerIndexes[2] + 1}:F${totalRecords + headerIndexes[2] + 1}`
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
        sheet.column("C").width(40)
        sheet.column("D").width(20)
        sheet.column("E").width(20)
        sheet.column("F").width(30)
        sheet.column("G").width(20)
        sheet.column("H").width(20)
        sheet.column("I").width(20)
        sheet.column("J").width(20)
        sheet.column("K").width(20)
        sheet.column("L").width(20)
        sheet.column("M").width(20)
        sheet.column("N").width(20)
        sheet.column("O").width(20)
        sheet.column("P").width(20)
        sheet.column("Q").width(20)
        sheet.column("R").width(20)
        sheet.column("S").width(20)
        sheet.column("T").width(50)

        sheet.range(dataInfo.titleRange).merged(true).style({
          border: true,
          bold: true,
          horizontalAlignment: "align left",
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
        if (dataInfo.tLastRowRange) {
          sheet.range(dataInfo.tLastRowRange).style({
            fill: "9dd3fa",
            horizontalAlignment: "center",
            border: true,
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

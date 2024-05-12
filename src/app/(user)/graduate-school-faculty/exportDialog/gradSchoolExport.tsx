import * as XLSX from "xlsx"
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate"
import { forfetch } from "./gradSchoolExportFetch"

export async function gradSchoolExport(detailsData) {
  const fileName = `GSF_(${detailsData.schoolYear})(${detailsData.semester} ${
    detailsData.semester !== "All Semester" ? "Sem" : ""
  })`
  console.log("fileName", fileName)
  //console.log("detailsData", detailsData)
  const result3 = await forfetch(detailsData)
  //console.log("result3", result3)

  let data = result3.result
  let data1 = result3.result2
  // console.log("dataaaaa", result)
  const data2 = [
    {
      totalCount: data1.totalFaculty,
      caterogy: "A",
      categoryCount: data1.alldata.A,
      categoryPercent: `${(
        (data1.alldata.A / data1.totalFaculty) *
        100
      ).toFixed(2)}%`,
      categoryABCD: `${(
        ((data1.alldata.A +
          data1.alldata.B +
          data1.alldata.C +
          data1.alldata.D) /
          data1.totalFaculty) *
        100
      ).toFixed(2)}%`,
    },
    {
      totalCount: "",
      caterogy: "B",
      categoryCount: data1.alldata.B,
      categoryPercent: `${(
        ((data1.alldata.B + data1.alldata.C + data1.alldata.D) /
          data1.totalFaculty) *
        100
      ).toFixed(2)}%`,
    },
    {
      totalCount: "",
      caterogy: "C",
      categoryCount: data1.alldata.C,
      categoryPercent: "",
    },
    {
      totalCount: "",
      caterogy: "D",
      categoryCount: data1.alldata.D,
      categoryPercent: "",
    },
    {
      totalCount: "",
      caterogy: "E",
      categoryCount: data1.alldata.E,
      categoryPercent: `${(
        (data1.alldata.E / data1.totalFaculty) *
        100
      ).toFixed(2)}%`,
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
        A: `Graduate School Faculty: Filtered by: S.Y(${
          detailsData.schoolYear
        }) and Sem(${detailsData.semester} ${
          detailsData.semester !== "All Semester" ? "Sem" : ""
        })`,
      },
      {},
    ]

    const tables = {
      CCIS: [{ A: "CCIS Department" }],
      CHaSS: [{ A: "CHaSS Department" }],
      CAA: [{ A: "CAA Department" }],
      CED: [{ A: "CED Department" }],
      CMNS: [{ A: "CMNS Department" }],
      COFES: [{ A: "COFES Department" }],
      table2: [
        {
          A: "No.",
          B: "Total Faculty",
          C: "Category",
          D: "No. of Faculty",
          E: "% of Faculty",
          F: "% of A,B,C,D",
        },
      ],
    }

    let forNo = 1
    data.forEach((row) => {
      if (row.name == "CCIS") {
        tables.CCIS.push({
          A: forNo,
          B: row.facultyName,
          C: row.position,
          D: row.letter,
          E: row.description,
        })
        forNo++
      }
    })
    forNo = 1
    data.forEach((row) => {
      if (row.name == "CHaSS") {
        tables.CHaSS.push({
          A: forNo,
          B: row.facultyName,
          C: row.position,
          D: row.letter,
          E: row.description,
        })
        //console.log("FORNO", forNo)
        forNo = forNo + 1
      }
    })
    forNo = 1
    data.forEach((row) => {
      if (row.name == "CAA") {
        tables.CAA.push({
          A: forNo,
          B: row.facultyName,
          C: row.position,
          D: row.letter,
          E: row.description,
        })
        //console.log("FORNO", forNo)
        forNo = forNo + 1
      }
    })
    forNo = 1
    data.forEach((row) => {
      if (row.name == "CED") {
        tables.CED.push({
          A: forNo,
          B: row.facultyName,
          C: row.position,
          D: row.letter,
          E: row.description,
        })
        //console.log("FORNO", forNo)
        forNo = forNo + 1
      }
    })
    forNo = 1
    data.forEach((row) => {
      if (row.name == "CMNS") {
        tables.CMNS.push({
          A: forNo,
          B: row.facultyName,
          C: row.position,
          D: row.letter,
          E: row.description,
        })
        //console.log("FORNO", forNo)
        forNo = forNo + 1
      }
    })
    forNo = 1
    data.forEach((row) => {
      if (row.name == "COFES") {
        tables.COFES.push({
          A: forNo,
          B: row.facultyName,
          C: row.position,
          D: row.letter,
          E: row.description,
        })
        //console.log("FORNO", forNo)
        forNo = forNo + 1
      }
    })

    data2.forEach((row) => {
      tables.table2.push({
        A: "",
        B: row.totalCount,
        C: row.caterogy,
        D: row.categoryCount,
        E: row.categoryPercent,
        F: row?.categoryABCD,
      })
    })

    const finalData = [
      ...title,
      { B: "Data Table" },
      {
        A: "No.",
        B: "Faculty Name",
        C: "Position",
        D: "Engagement",
        E: "Engagement Description",
      },
      ...tables.CAA,
      ...tables.CHaSS,
      ...tables.CED,
      ...tables.CCIS,
      ...tables.CMNS,
      ...tables.COFES,
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

    const departmentNames = [
      "CCIS Department",
      "CHaSS Department",
      "CAA Department",
      "CED Department",
      "CMNS Department",
      "COFES Department",
    ]

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
      titleRange: "A1:F2",
      tbodyRange: `A3:F${finalData.length}`,

      ////////////////aron d libogggggggggggg
      theadRangeHeader:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:F${headerIndexes[0] + 1}`
          : null,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:F${headerIndexes[1] + 1}`
          : null,
      theadRangeCAA:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[2] + 1}:F${headerIndexes[2] + 1}`
          : null,
      theadRangeCHaSS:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[3] + 1}:F${headerIndexes[3] + 1}`
          : null,
      theadRangeCED:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[4] + 1}:F${headerIndexes[4] + 1}`
          : null,
      theadRangeCMNS:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[5] + 1}:F${headerIndexes[5] + 1}`
          : null,
      theadRangeCOFES:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[6] + 1}:F${headerIndexes[6] + 1}`
          : null,

      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${
              totalRecords + headerIndexes[headerIndexes.length - 1] + 1
            }`
          : null,
      tLastColumnRange:
        headerIndexes?.length >= 1
          ? `E${headerIndexes[0] + 1}:E${
              totalRecords + headerIndexes[headerIndexes.length - 1] + 1
            }`
          : null,

      ///////////////////////asdfasdf
      tLargeCell:
        headerIndexes?.length >= 2
          ? `B${headerIndexes[headerIndexes.length - 1] + 2}:B${
              headerIndexes[headerIndexes.length - 1] + 6
            }`
          : null,
      tLargeCell2:
        headerIndexes?.length >= 2
          ? `E${headerIndexes[headerIndexes.length - 1] + 3}:E${
              headerIndexes[headerIndexes.length - 1] + 5
            }`
          : null,
      tLargeCell3:
        headerIndexes?.length >= 2
          ? `F${headerIndexes[headerIndexes.length - 1] + 2}:F${
              headerIndexes[headerIndexes.length - 1] + 5
            }`
          : null,
      ////////////////
      theadRange1:
        headerIndexes?.length >= 3
          ? `A${headerIndexes[headerIndexes.length - 1] + 1}:F${
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
        sheet.column("B").width(40)
        sheet.column("C").width(20)
        sheet.column("D").width(20)
        sheet.column("E").width(20)
        sheet.column("F").width(50)

        sheet.range(dataInfo.titleRange).merged(true).style({
          border: true,
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        })
        sheet.range(dataInfo.tLargeCell).merged(true).style({
          border: true,
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        })
        sheet.range(dataInfo.tLargeCell2).merged(true).style({
          horizontalAlignment: "center",
          verticalAlignment: "center",
        })
        sheet.range(dataInfo.tLargeCell3).merged(true).style({
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
        sheet.range(dataInfo.theadRangeCHaSS).merged(true).style(theadStyle)
        sheet.range(dataInfo.theadRangeCAA).merged(true).style(theadStyle)
        sheet.range(dataInfo.theadRangeCED).merged(true).style(theadStyle)
        sheet.range(dataInfo.theadRangeCMNS).merged(true).style(theadStyle)
        sheet.range(dataInfo.theadRangeCOFES).merged(true).style(theadStyle)

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

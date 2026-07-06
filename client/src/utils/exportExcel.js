import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportExcel = (tasks) => {
  const data = tasks.map((task) => ({
    Title: task.title,
    Description: task.description,
    Status: task.status,
    Priority: task.priority,
    "Due Date": task.dueDate
      ? new Date(task.dueDate).toLocaleDateString("en-GB")
      : "No Due Date",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, "TaskFlow_Report.xlsx");
};

export default exportExcel;
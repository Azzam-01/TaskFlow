import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (tasks) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("TaskFlow Report", 14, 20);

  const tableData = tasks.map((task) => [
    task.title,
    task.status,
    task.priority,
    task.dueDate
      ? new Date(task.dueDate).toLocaleDateString("en-GB")
      : "No Due Date",
  ]);

  autoTable(doc, {
    head: [["Title", "Status", "Priority", "Due Date"]],
    body: tableData,
    startY: 30,
  });

  doc.save("TaskFlow_Report.pdf");
};

export default exportPDF;
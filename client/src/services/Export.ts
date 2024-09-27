import { DataGrid } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import { jsPDF } from "jspdf";
import { exportDataGrid } from "devextreme/pdf_exporter";

import { exportDataGrid as exportDataGridExcel } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";

export const exportPdf = ({ dj, name }: { dj: DataGrid; name: string }) => {
  const doc = new jsPDF();
  exportDataGrid({
    jsPDFDocument: doc,
    component: dj.instance,
    indent: 5,
  }).then(() => {
    doc.save(name + ".pdf");
  });
};

export const exportExcel = ({ dj, name }: { dj: DataGrid; name: string }) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(name);

  exportDataGridExcel({
    component: dj.instance,
    worksheet,
    autoFilterEnabled: true,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        name + ".xlsx",
      );
    });
  });
};

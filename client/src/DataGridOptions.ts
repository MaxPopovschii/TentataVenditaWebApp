export const viewDataGridOptions = {
  allowColumnResizing: true,
  fontSize: "10px",
  columnResizingMode: "widget" as const,
  showBorders: false,
  className: "my-grid",
  keyExpr: "ID",
  height: "100%",
};

export const editModalDataGridOptions = {
  keyExpr: "ID",
  height: "100%",
  showBorders: false,
  allowColumnResizing: true,
  columnResizingMode: "widget" as const,
  className: "my-dettail-grid",
};

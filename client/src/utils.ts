import { FieldErrors } from "react-hook-form";
import { ApiError } from "./services/openapi";
import { DataGrid } from "devextreme-react/data-grid";
import { MutableRefObject } from "react";
import _ from "lodash";

export function notificaErrori(errors: FieldErrors<any>) {
  alert(
    "Errore nella compilazione dei campi seguenti: " +
      Object.keys(errors).join(", "),
  );
}

export function notificaErroreSalva(error: Error) {
  if (error instanceof ApiError && [400].includes(error.status)) {
    alert(error.body.message);
  } else {
    alert("Si è verificato un errore sconosciuto");
  }
}

export async function handleDataGridAutocompleteOnchange({
  dg,
  val,
  dataField,
  cellInfo,
  skip = 0,
}: {
  dg: MutableRefObject<DataGrid | null>;
  val: string | null;
  dataField: string;
  cellInfo: any;
  skip?: number;
}) {
  if (val == cellInfo.value) return;
  const cellElem = dg.current?.instance.getCellElement(
    cellInfo.rowIndex,
    dataField,
  );
  const focused = cellElem?.classList.contains("dx-focused");
  dg.current?.instance.cellValue(cellInfo.rowIndex, dataField, val);
  await dg.current?.instance.saveEditData();
  if (val)
    dg.current?.instance.editCell(
      cellInfo.rowIndex,
      cellInfo.columnIndex + 1 + skip,
    );
  /*if (focused && cellElem) {
    setTimeout(() => {
      const el = dg.current?.instance
        ?.getCellElement(cellInfo.rowIndex, dataField)
        ?.querySelector("input");
      if (!el) return;
      el.focus();
    }, 0);
  }*/
}

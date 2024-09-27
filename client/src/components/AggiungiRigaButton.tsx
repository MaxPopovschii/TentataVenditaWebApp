import React, { MutableRefObject } from "react";
import { DataGrid } from "devextreme-react/data-grid";
import Nuovo from "./Nuovo";

export default function AggiungiRigaButton({
  dgRef,
  frozen,
}: {
  dgRef: MutableRefObject<DataGrid | null>;
  frozen: boolean;
}) {
  if (frozen) return null;
  return (
    <Nuovo
      onClick={async () => {
        dgRef.current?.instance.addRow();
        await dgRef.current?.instance.saveEditData();
        dgRef.current?.instance.editCell(
          dgRef.current!.instance.totalCount() - 1,
          0
        );
      }}
      title={"Aggiungi"}
    />
  );
}

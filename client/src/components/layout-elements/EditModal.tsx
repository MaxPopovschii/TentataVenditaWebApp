import React, { MutableRefObject, ReactNode, useState } from "react";
import { DataGrid } from "devextreme-react/data-grid";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { EditPopupHeader } from "./EditPopupHeader";
import AdhocModal from "./AdhocModal";

export default function EditModal<FormInterface extends FieldValues>(props: {
  body: (props: { frozen: boolean }) => ReactNode;
  nuovo: boolean;
  onCreate: () => Promise<void>;
  onEdit: () => Promise<void>;
  onDelete: () => Promise<void>;
  form: UseFormReturn<FormInterface>;
  title: string;
  dgRef?: MutableRefObject<DataGrid | null>;
  toggleTable?: () => void;
  fileUpload?: () => void;
  row?: any;
  isActive?: boolean;
}) {
  const [freeze, setFreeze] = useState(!props.nuovo);
  return (
    <AdhocModal
      header={
        <EditPopupHeader
          {...props}
          freeze={freeze}
          setFreeze={setFreeze}
          toggleTable={props.toggleTable!}
          fileUpload={props.fileUpload!}
          row={props.row}
          isActive={props.isActive}
        />
      }
    >
      {props.body({ frozen: freeze })}
    </AdhocModal>
  );
}

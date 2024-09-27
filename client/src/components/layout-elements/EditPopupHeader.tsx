import { FieldValues, UseFormReturn } from "react-hook-form";
import React, { MutableRefObject, ReactNode } from "react";
import { useModal } from "@ebay/nice-modal-react";
import { FrozenToolbar, NonFrozenToolbar } from "./EditModalToolbar";
import { DataGrid } from "devextreme-react/data-grid";

export function EditPopupHeader<FormInterface extends FieldValues>(props: {
  body: (props: { frozen: boolean }) => ReactNode;
  nuovo: boolean;
  onCreate: () => Promise<void>;
  onEdit: () => Promise<void>;
  onDelete: () => Promise<void>;
  form: UseFormReturn<FormInterface>;
  title: string;
  freeze: boolean;
  setFreeze: (val: boolean) => void;
  dgRef?: MutableRefObject<DataGrid | null>;
  toggleTable: () => void;
  fileUpload: () => void;
  row: any;
  isActive?: boolean;
}) {
  const modal = useModal();
  const onSave = props.nuovo ? props.onCreate : props.onEdit;
  const onDelete = props.onDelete;
  const form = props.form;
  const freeze = props.freeze;
  const setFreeze = props.setFreeze;
  if (freeze)
    return (
      <FrozenToolbar
        name={props.title}
        close={() => modal.remove()}
        form={form}
        onDelete={async () => {
          await onDelete();
        }}
        toggleTable={props.toggleTable}
        fileUpload={props.fileUpload}
        SetFreeze={setFreeze}
        isActive={props.isActive}
      />
    );
  else
    return (
      <NonFrozenToolbar
        onSave={async () => {
          await props.dgRef?.current?.instance.saveEditData();
          await onSave();
        }}
        name={props.title}
        close={() => modal.remove()}
        form={form}
        row={props.row}
      />
    );
}

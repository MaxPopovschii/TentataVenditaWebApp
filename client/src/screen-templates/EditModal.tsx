import { v4 } from "uuid";
import NiceModal, { NiceModalHocProps } from "@ebay/nice-modal-react";
import React, { FunctionComponent, Suspense } from "react";
import { UseFormReturn } from "react-hook-form";

export type EditModalProps = {
  ID: string | null | number;
  editProcedureId: string;
  name: string;
  masterForm?: UseFormReturn<any, any, any>;
  row?: any;
};
export type EditModal = FunctionComponent<EditModalProps & NiceModalHocProps>;

export function createEditModal(component: React.FC<EditModalProps>) {
  return () =>
    NiceModal.create((props: EditModalProps) => {
      return <Suspense>{component(props)}</Suspense>;
    });
}
export function createEditModalwithData(component: React.FC<EditModalProps>) {
  return () =>
    NiceModal.create((props: EditModalProps) => {
      return <Suspense>{component(props)}</Suspense>;
    });
}
export function showEditModal(props: {
  ID: string | null;
  name: string;
  form?: UseFormReturn<any, any, any>;
  editModal: () => EditModal;
}) {
  if (!props.editModal) return;
  const editProcedureId = v4();
  // Show a modal with arguments passed to the component as props
  NiceModal.show(props.editModal(), {
    name: props.name,
    ID: props.ID,
    editProcedureId,
    masterForm: props.form,
  });
}

export function showEditModalWithData(props: {
  ID: string | null;
  name: string;
  row?: any;
  editModal: () => EditModal;
}) {
  if (!props.editModal) return;
  const editProcedureId = v4();
  // Show a modal with arguments passed to the component as props
  NiceModal.show(props.editModal(), {
    name: props.name,
    ID: props.ID,
    editProcedureId,
    row: props.row,
  });
}

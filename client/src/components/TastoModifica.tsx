import modifica from "../assets/modifica.svg";
import React from "react";
import {
  EditModal,
  showEditModal,
  showEditModalWithData,
} from "../screen-templates/EditModal";

export default function TastoModifica(props: {
  editModal: () => EditModal;
  row: any;
  name: string;
}) {
  const row = props.row.data;
  const showAntdModal = () =>
    showEditModalWithData({
      ID: props.row.data.ID,
      name: props.name,
      editModal: props.editModal,
      row: { ...row },
    });
  return (
    <div
      style={{ width: 20, height: 20, cursor: "pointer" }}
      onClick={() => showAntdModal()}
    >
      <img src={modifica} />
    </div>
  );
}

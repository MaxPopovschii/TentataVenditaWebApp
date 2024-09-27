import { UseFormReturn } from "react-hook-form";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "devextreme-react/button";
import { colors } from "../../assets/colors";
import { Toolbar } from "./Toolbar";
import { notificaErroreSalva, notificaErrori } from "../../utils";

export function FrozenToolbar({
  name,
  close,
  form,
  SetFreeze,
  onDelete,
  toggleTable,
  fileUpload,
  isActive = false,
}: {
  name: string;
  close: () => void;
  form: UseFormReturn<any>;
  SetFreeze: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => Promise<void>;
  toggleTable: () => void;
  fileUpload: () => void;
  isActive?: boolean;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: onDelete,
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
  });
  const handleClick = () => {
    toggleTable();
  };
  const handleClickAllega = () => {
    fileUpload();
  };
  return (
    <Toolbar
      name={name}
      loading={mutation.isPending}
      close={close}
      buttons={
        <>
          <Button
            width={100}
            height={30}
            text="Allega"
            type="normal"
            stylingMode="contained"
            style={{
              fontSize: "11px",
              backGroundColor: colors.grigio,
              marginRight: "5px",
            }}
            icon="upload"
            disabled={!isActive}
            onClick={handleClickAllega}
          />
          <Button
            width={100}
            height={30}
            text="Tutti allegati"
            type="normal"
            stylingMode="contained"
            style={{
              fontSize: "11px",
              backGroundColor: colors.grigio,
              marginRight: "5px",
            }}
            icon="message"
            disabled={!isActive}
            onClick={handleClick}
          />
          <Button
            width={80}
            height={30}
            text="Chiudi"
            type="normal"
            stylingMode="contained"
            style={{
              fontSize: "11px",
              backGroundColor: colors.grigio,
              marginRight: "5px",
            }}
            icon="close"
            onClick={close}
          />
          <Button
            width={80}
            height={30}
            text="Modifica"
            type="normal"
            style={{ fontSize: "11px", marginRight: "5px" }}
            stylingMode="contained"
            icon="edit"
            onClick={() => SetFreeze(false)}
          />
          <Button
            width={80}
            height={30}
            text="Rimuovi"
            type="normal"
            style={{ fontSize: "11px", marginRight: "5px" }}
            stylingMode="contained"
            icon="trash"
            onClick={() =>
              mutation
                .mutateAsync()
                .then(() => close())
                .catch(notificaErroreSalva)
            }
          />
        </>
      }
    />
  );
}

export function NonFrozenToolbar({
  name,
  close,
  form,
  onSave,
  row,
}: {
  name: string;
  close: () => void;
  form: UseFormReturn<any>;
  onSave: () => Promise<void>;
  row: any;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: onSave,
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
  });
  return (
    <Toolbar
      name={name}
      loading={mutation.isPending}
      close={close}
      buttons={
        <>
          <Button
            width={80}
            height={30}
            text="Salva"
            type="normal"
            style={{ fontSize: "11px", marginRight: "5px" }}
            stylingMode="contained"
            icon="save"
            onClick={() =>
              form.handleSubmit(() => {
                mutation
                  .mutateAsync()
                  .then(() => close())
                  .catch(notificaErroreSalva);
              }, notificaErrori)()
            }
          />
          <Button
            width={80}
            height={30}
            text="Annulla"
            type="normal"
            stylingMode="contained"
            style={{
              fontSize: "11px",
              backGroundColor: colors.grigio,
              marginRight: "5px",
            }}
            icon="close"
            onClick={close}
          />
        </>
      }
    />
  );
}

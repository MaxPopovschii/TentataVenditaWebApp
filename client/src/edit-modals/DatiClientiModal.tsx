import React, { Suspense, useEffect, useRef, useState } from "react";
import { NumberBox } from "devextreme-react/number-box";
import { TextBox } from "devextreme-react/text-box";

import EditModal from "../components/layout-elements/EditModal";
import FieldContainer from "../components/form-elements/FieldContainer";
import { EditModalProps, createEditModal } from "../screen-templates/EditModal";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import axios from "axios";
import { useEntityForEdit } from "../data-retrieval/useEntity";
import { Clienti, ClientiView, DefaultService } from "../services/openapi";
import DataGrid from "devextreme-react/data-grid";

type FormInterface = ClientiView;
export default createEditModal(MainPage);

function MainPage(props: EditModalProps) {
  return (
    <Suspense>
      <MainPageInternal {...props}></MainPageInternal>
    </Suspense>
  );
}

function MainPageInternal({ ID, name, editProcedureId }: EditModalProps) {
  const dgRef = useRef<DataGrid | null>(null);
  const { data } = useEntityForEdit({
    id: ID ?? null,
    getter: DefaultService.clientiControllerGetForEdit,
    editProcedureId,
  });
  const form = useForm<FormInterface>({
    defaultValues: data ?? {},
  });
  return (
    <EditModal
      title={name}
      nuovo={!ID}
      isActive={false}
      dgRef={dgRef}
      form={form}
      onCreate={async () => {
        await DefaultService.clientiControllerCreate({
          requestBody: form.getValues(),
        });
      }}
      onEdit={async () => {
        await DefaultService.clientiControllerUpdate({
          requestBody: form.getValues(),
        });
      }}
      onDelete={async () => {
        await DefaultService.clientiControllerDelete({
          id: ID as string,
        });
      }}
      body={({ frozen }) => {
        return (
          <div style={{ marginBottom: 30 }}>
            <DatiClientiForm frozen={frozen} nuovo={!ID} form={form} />
          </div>
        );
      }}
    />
  );
}
export function DatiClientiForm({
  frozen,
  form,
  nuovo,
}: {
  frozen: boolean;
  form: UseFormReturn<FormInterface>;
  nuovo: boolean;
}) {
  return (
    <>
      <div style={{ padding: 5, margin: 10 }}>
        <Controller
          control={form.control}
          rules={{ required: true }}
          name={"tipoConto"}
          render={({ field }) => (
            <FieldContainer
              label={"Tipo Conto:"}
              obbligatorio={true}
              input={
                <TextBox
                  height={25}
                  labelMode={"hidden"}
                  disabled={frozen || !nuovo}
                  value={field.value ?? undefined}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>

        <Controller
          control={form.control}
          rules={{ required: true }}
          name={"codiceConto"}
          render={({ field }) => (
            <FieldContainer
              label={"Codice conto:"}
              obbligatorio={true}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  disabled={frozen || !nuovo}
                  value={field.value ?? undefined}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>

        <Controller
          control={form.control}
          name={"consumoMin"}
          render={({ field }) => (
            <FieldContainer
              label={"Consumo min:"}
              input={
                <NumberBox
                  labelMode={"hidden"}
                  height={25}
                  disabled={frozen}
                  value={field.value ?? undefined}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>

        <Controller
          control={form.control}
          name={"consumoMinCaffe"}
          render={({ field }) => (
            <FieldContainer
              label={"Consumo min caffe:"}
              input={
                <NumberBox
                  labelMode={"hidden"}
                  height={25}
                  disabled={frozen}
                  max={100000}
                  value={field.value ?? undefined}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>

        <Controller
          control={form.control}
          name={"raggruppaPerSede"}
          render={({ field }) => (
            <FieldContainer
              label={"Raggruppa per sede:"}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  disabled={frozen}
                  maxLength={1}
                  value={field.value ?? undefined}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>

        <Controller
          control={form.control}
          name={"forzaUnicoPagamento"}
          render={({ field }) => (
            <FieldContainer
              label={"Forza unico pagamento:"}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  disabled={frozen}
                  maxLength={1}
                  value={field.value ?? undefined}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>

        <Controller
          control={form.control}
          name={"ragioneSocialeCorta"}
          render={({ field }) => (
            <FieldContainer
              label={"Ragione Sociale x Contratti:"}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  disabled={frozen}
                  value={field.value ?? undefined}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>
        <Controller
          control={form.control}
          name={"ragSocBI"}
          render={({ field }) => (
            <FieldContainer
              label={"Ragione Sociale x BI:"}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  disabled={frozen}
                  value={field.value ?? undefined}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>
      </div>
    </>
  );
}

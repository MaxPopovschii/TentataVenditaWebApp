import React, { Suspense, useEffect, useRef, useState } from "react";
import SelectBox, { SelectBoxTypes } from "devextreme-react/select-box";
import { TextBox } from "devextreme-react/text-box";

import EditModal from "../components/layout-elements/EditModal";
import FieldContainer from "../components/form-elements/FieldContainer";
import { EditModalProps, createEditModal } from "../screen-templates/EditModal";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import { ClienteInput } from "../components/form-elements/lookup-fields/ClienteInput";
import { Agenti, AgentiView, DefaultService } from "../services/openapi";
import { DataGrid } from "devextreme-react";
import { useEntityForEdit } from "../data-retrieval/useEntity";
import { TecniciView } from "../services/openapi/models/TecniciView";

type FormInterface = TecniciView;
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
  console.log(ID);
  const { data } = useEntityForEdit({
    id: ID ?? null,
    getter: DefaultService.tecniciControllerGetForEdit,
    editProcedureId,
  });

  const form = useForm<FormInterface>({
    defaultValues: data ?? {},
  });

  return (
    <EditModal
      title={name}
      nuovo={!ID}
      dgRef={dgRef}
      form={form}
      onCreate={async () => {
        await DefaultService.tecniciControllerCreate({
          requestBody: form.getValues(),
        });
      }}
      onEdit={async () => {
        await DefaultService.tecniciControllerUpdate({
          requestBody: form.getValues(),
        });
      }}
      onDelete={async () => {
        await DefaultService.tecniciControllerDelete({
          requestBody: { ID: form.getValues("ID") },
        });
      }}
      body={({ frozen }) => {
        return (
          <div style={{ marginBottom: 30 }}>
            <TecniciForm frozen={frozen} nuovo={!ID} form={form} />
          </div>
        );
      }}
    />
  );
}
export function TecniciForm({
  frozen,
  nuovo,
  form,
}: {
  frozen: boolean;
  nuovo: boolean;
  form: UseFormReturn<FormInterface>;
}) {
  let tipo = form.getValues("tipo");

  let InitFornitoriFrozen: boolean = tipo != "F" || tipo == undefined;
  const [fornitoriFrozen, setFornitoriFrozen] = useState(InitFornitoriFrozen);
  return (
    <>
      <div style={{ padding: 5, margin: 10 }}>
        <Controller
          control={form.control}
          rules={{ required: true }}
          name={"codice"}
          render={({ field }) => (
            <FieldContainer
              label={"Codice:"}
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
          name={"descrizione"}
          render={({ field }) => (
            <FieldContainer
              label={"Descrizione:"}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  value={field.value ?? undefined}
                  disabled={frozen}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        ></Controller>
        <Controller
          control={form.control}
          name={"tipo"}
          render={({ field }) => (
            <FieldContainer
              label={"Tipo:"}
              input={
                <SelectBox
                  inputAttr={{ "aria-label": "Simple Product" }}
                  items={["I", "C", "F", "A"]}
                  value={field.value}
                  disabled={frozen}
                  onValueChanged={(e) => {
                    setFornitoriFrozen(e.value != "F");
                    alert(fornitoriFrozen);
                    field.onChange(e.value);
                  }}
                />
              }
            />
          )}
        ></Controller>
        <Controller
          control={form.control}
          name={"codiceFornitore"}
          key={fornitoriFrozen + ""}
          render={({ field }) => (
            <FieldContainer
              label={"Codice fornitore:"}
              input={
                <ClienteInput
                  frozen={fornitoriFrozen}
                  tipoConto={"F"}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              }
            />
          )}
        ></Controller>
        <Controller
          control={form.control}
          name={"magazzino"}
          render={({ field }) => (
            <FieldContainer
              label={"Magazzino:"}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  value={field.value ?? undefined}
                  disabled={frozen}
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

import React, { Suspense } from "react";
import { NumberBox } from "devextreme-react/number-box";
import { TextBox } from "devextreme-react/text-box";
import { Controller, useForm, UseFormReturn } from "react-hook-form";

import {
  DefaultService,
  TipologieInterventoEdit,
  TipologieInterventoService,
} from "../services/openapi";
import EditModal from "../components/layout-elements/EditModal";
import FieldContainer from "../components/form-elements/FieldContainer";

import { useEntityForEdit } from "../data-retrieval/useEntity";
import { createEditModal, EditModalProps } from "../screen-templates/EditModal";
import { TipoologiaInterventoID } from "common";
import { AttrezzatureInput } from "../components/form-elements/lookup-fields/AttrezzatureInput";

type FormInterface = TipologieInterventoEdit;
export default createEditModal(MainPage);

function MainPage(props: EditModalProps) {
  return (
    <Suspense>
      <MainPageInternal {...props}></MainPageInternal>
    </Suspense>
  );
}

function MainPageInternal({ ID, name, editProcedureId }: EditModalProps) {
  const { data } = useEntityForEdit({
    id: ID ?? null,
    getter: DefaultService.tipologieInterventoControllerGetForEdit,
    editProcedureId,
  });
  const dati = data ?? {};

  const form = useForm<FormInterface>({
    defaultValues: dati,
  });

  return (
    <EditModal
      title={name}
      nuovo={!ID}
      onCreate={async () => {
        await DefaultService.tipologieInterventoControllerCreate({
          requestBody: form.getValues(),
        });
      }}
      onEdit={async () => {
        await DefaultService.tipologieInterventoControllerUpdate({
          requestBody: form.getValues(),
        });
      }}
      onDelete={async () => {
        await DefaultService.tipologieInterventoControllerDelete({
          requestBody: {
            ID: TipoologiaInterventoID.compute({
              tipoAttrezzatura: form.getValues("tipoAttrezzatura"),
              tipoIntervento: form.getValues("tipoIntervento"),
            }),
          },
        });
      }}
      form={form}
      body={({ frozen }) => {
        return (
          <div style={{ marginBottom: 30 }}>
            <ScontiMaturatiForm frozen={frozen} form={form} nuovo={!ID} />
          </div>
        );
      }}
    />
  );
}

export function ScontiMaturatiForm({
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
          name={"tipoAttrezzatura"}
          render={({ field }) => (
            <FieldContainer
              label={"Tipo Attrezzatura:"}
              obbligatorio={true}
              input={
                <AttrezzatureInput
                  frozen={frozen || !nuovo}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              }
            />
          )}
        />
        <Controller
          control={form.control}
          rules={{ required: true }}
          name={"tipoIntervento"}
          render={({ field }) => (
            <FieldContainer
              label={"Tipo Intervento:"}
              obbligatorio={true}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  maxLength={5}
                  value={field.value ?? undefined}
                  disabled={frozen || !nuovo}
                  onValueChanged={(value) => field.onChange(value.value)}
                />
              }
            />
          )}
        />
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
                  onValueChanged={(value) => field.onChange(value.value)}
                />
              }
            />
          )}
        />
        <Controller
          control={form.control}
          name={"costo"}
          render={({ field }) => (
            <FieldContainer
              label={"Costo:"}
              input={
                <NumberBox
                  labelMode={"hidden"}
                  height={25}
                  value={field.value ?? undefined}
                  disabled={frozen}
                  onValueChanged={(value) => field.onChange(value.value)}
                />
              }
            />
          )}
        />
      </div>
    </>
  );
}

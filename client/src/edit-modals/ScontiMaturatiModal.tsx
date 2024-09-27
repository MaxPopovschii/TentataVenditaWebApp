import React, { Suspense, useEffect } from "react";
import { DateBox } from "devextreme-react/date-box";
import { NumberBox } from "devextreme-react/number-box";
import { Controller, useForm, UseFormReturn, useWatch } from "react-hook-form";

import { DefaultService, ScontiMaturatiEdit } from "../services/openapi";
import EditModal from "../components/layout-elements/EditModal";
import FieldContainer from "../components/form-elements/FieldContainer";
import { ClienteInput } from "../components/form-elements/lookup-fields/ClienteInput";
import { DestinazioneInput } from "../components/form-elements/lookup-fields/DestinazioneInput";
import { ArticoloInput } from "../components/form-elements/lookup-fields/ArticoloInput";
import { useEntityForEdit } from "../data-retrieval/useEntity";
import { GruppoMerceologicoInput } from "../components/form-elements/lookup-fields/GruppoMerceologicoInput";
import { createEditModal, EditModalProps } from "../screen-templates/EditModal";
import { ContrattoClienteInput } from "../components/form-elements/lookup-fields/ContrattoClienteInput";
import { RigheContrattoInput } from "../components/form-elements/lookup-fields/RigheContrattoInput";

type FormInterface = ScontiMaturatiEdit;
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
    getter: DefaultService.scontiMaturatiControllerGetForEdit,
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
        await DefaultService.scontiMaturatiControllerCreate({
          requestBody: form.getValues(),
        });
      }}
      onEdit={async () => {
        await DefaultService.scontiMaturatiControllerUpdate({
          requestBody: form.getValues(),
        });
      }}
      onDelete={async () => {
        await DefaultService.scontiMaturatiControllerDelete({
          requestBody: { ID: form.getValues("ID") },
        });
      }}
      form={form}
      body={({ frozen }) => {
        return (
          <div style={{ marginBottom: 30 }}>
            <ScontiMaturatiForm frozen={frozen} form={form} />
          </div>
        );
      }}
    />
  );
}

export function ScontiMaturatiForm({
  frozen,
  form,
}: {
  frozen: boolean;
  form: UseFormReturn<FormInterface>;
}) {
  const codiceArticolo =
    useWatch({ control: form.control, name: "idArticolo" }) ?? undefined;
  useEffect(() => {
    console.log("articoloId", codiceArticolo);
    if (codiceArticolo && codiceArticolo?.split("****")?.length > 1) {
      form.setValue("idArticolo", codiceArticolo?.split("****")[0]);
    }
  }, [codiceArticolo]);
  return (
    <>
      <div style={{ padding: 5, margin: 10 }}>
        <Controller
          control={form.control}
          name="dataDoc"
          render={({ field, fieldState }) => (
            <FieldContainer
              label={"Data Doc:"}
              input={
                <DateBox
                  showClearButton={true}
                  labelMode={"hidden"}
                  height={25}
                  value={field.value ?? undefined}
                  disabled={frozen}
                  onValueChanged={(value) =>
                    field.onChange(value.value ?? null)
                  }
                />
              }
            />
          )}
        />
        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <Controller
            control={form.control}
            name={"idCliente"}
            render={({ field }) => (
              <FieldContainer
                label={"Cliente:"}
                input={<ClienteInput frozen={frozen} {...field} />}
              />
            )}
          />
          <Controller
            control={form.control}
            name={"idDestinazione"}
            render={({ field }) => (
              <FieldContainer
                label={"Destinazione:"}
                input={
                  <DestinazioneInput
                    form={form}
                    contoFieldName={"idCliente"}
                    frozen={frozen}
                    {...field}
                  />
                }
              />
            )}
          />
          <Controller
            control={form.control}
            name={"nrContratto"}
            render={({ field }) => (
              <FieldContainer
                label={"Numero Contratto:"}
                input={
                  <ContrattoClienteInput
                    form={form}
                    contoFieldNameConto={"idCliente"}
                    contoFieldNameDestinazione={"codiceDestinazione"}
                    frozen={frozen}
                    {...field}
                  />
                }
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            control={form.control}
            name={"idRiga"}
            render={({ field }) => (
              <FieldContainer
                label={"Riga Contratto:"}
                input={
                  <RigheContrattoInput
                    form={form}
                    contrattoFieldName={"nrContratto"}
                    frozen={frozen}
                    {...field}
                  />
                }
              />
            )}
            rules={{ required: true }}
          />
        </div>
        <Controller
          control={form.control}
          name={"idArticolo"}
          render={({ field }) => (
            <FieldContainer
              label={"Articolo:"}
              input={<ArticoloInput frozen={frozen} {...field} />}
            />
          )}
        />
        <Controller
          control={form.control}
          name={"gruppoMerc"}
          render={({ field }) => (
            <FieldContainer
              label={"Gruppo Merceologico:"}
              input={<GruppoMerceologicoInput frozen={frozen} {...field} />}
            />
          )}
        />
        <Controller
          control={form.control}
          name={"qtaDoc"}
          render={({ field }) => (
            <FieldContainer
              label={"Quota Documento:"}
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
        <Controller
          control={form.control}
          name={"qtaSconto"}
          render={({ field }) => (
            <FieldContainer
              label={"Quota Sconto:"}
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
        <Controller
          control={form.control}
          name="importoDoc"
          render={({ field, fieldState }) => (
            <FieldContainer
              label={"Importo documento:"}
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
        <Controller
          control={form.control}
          name="importoSconto"
          render={({ field, fieldState }) => (
            <FieldContainer
              label={"Importo Sconto:"}
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

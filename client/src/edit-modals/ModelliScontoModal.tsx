import React, { Suspense } from "react";
import { TextBox } from "devextreme-react/text-box";
import { SelectBox } from "devextreme-react/select-box";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import {
  DefaultService,
  ScontiModelliEdit,
  ScontiModelliService,
} from "../services/openapi";
import EditModal from "../components/layout-elements/EditModal";
import FieldContainer from "../components/form-elements/FieldContainer";
import SiNoInput from "../components/form-elements/SiNoInput";
import NumericInput from "../components/form-elements/NumericInput";
import { useEntityForEdit } from "../data-retrieval/useEntity";
import { createEditModal, EditModalProps } from "../screen-templates/EditModal";

type FormInterface = ScontiModelliEdit;

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
    getter: DefaultService.scontiModelliControllerGetForEdit,
    editProcedureId,
  });
  const form = useForm<FormInterface>({
    defaultValues: data ?? {},
  });
  return (
    <EditModal
      title={name}
      nuovo={!data}
      onCreate={async () => {
        await DefaultService.scontiModelliControllerCreate({
          requestBody: form.getValues(),
        });
      }}
      onEdit={async () => {
        await DefaultService.scontiModelliControllerUpdate({
          requestBody: form.getValues(),
        });
      }}
      onDelete={async () => {
        await DefaultService.scontiModelliControllerDelete({
          requestBody: { ID: form.getValues("ID") },
        });
      }}
      form={form}
      body={({ frozen }) => {
        return <ModelliScontoForm frozen={frozen} form={form} nuovo={!ID} />;
      }}
    />
  );
}

export function ModelliScontoForm({
  frozen,
  form,
  nuovo,
}: {
  frozen: boolean;
  nuovo: boolean;
  form: UseFormReturn<ScontiModelliEdit>;
}) {
  return (
    <>
      <div style={{ padding: 5, margin: 10 }}>
        <Controller
          control={form.control}
          name="ID"
          render={({ field, fieldState }) => (
            <FieldContainer
              label={"Numero"}
              obbligatorio={true}
              input={
                <TextBox
                  labelMode={"hidden"}
                  height={25}
                  value={field.value}
                  disabled={frozen || !nuovo}
                  onValueChanged={(value) => field.onChange(value.value)}
                />
              }
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          control={form.control}
          name="descrizione"
          render={({ field, fieldState }) => (
            <FieldContainer
              label={"Descrizione"}
              input={
                <TextBox
                  disabled={frozen}
                  height={25}
                  labelMode={"hidden"}
                  label="Select company"
                  value={field.value ?? undefined}
                  onValueChanged={(value) => field.onChange(value.value)}
                />
              }
            />
          )}
        />
        <Controller
          control={form.control}
          name="tipoSconto"
          render={({ field, fieldState }) => (
            <FieldContainer
              label="Tipo Sconto"
              input={
                <SelectBox
                  height={25}
                  disabled={frozen}
                  items={["posticipato", "anticipato"]}
                  value={field.value}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            ></FieldContainer>
          )}
        />
        <Controller
          control={form.control}
          name="abilitaImportoLimiteMax"
          render={({ field, fieldState }) => (
            <FieldContainer
              label=" Abilita Imp Max:"
              input={<SiNoInput {...field} frozen={frozen} />}
            />
          )}
        />
        <Controller
          control={form.control}
          name="abilitaQtaSogliaMinima"
          render={({ field, fieldState }) => (
            <FieldContainer
              label=" Abilita Qtn Minima:"
              input={<SiNoInput {...field} frozen={frozen} />}
            />
          )}
        />
        <Controller
          control={form.control}
          name="abilitaQtaOmaggiare"
          render={({ field, fieldState }) => (
            <FieldContainer
              label=" Abilita Qtn Om:"
              input={<SiNoInput {...field} frozen={frozen} />}
            />
          )}
        />
        <Controller
          control={form.control}
          name="applicaNotaCredito"
          render={({ field, fieldState }) => (
            <FieldContainer
              label="Applica Nota Credito:"
              input={<SiNoInput {...field} frozen={frozen} />}
            />
          )}
        />

        <Controller
          control={form.control}
          name="nrMesiBaseCalcolo"
          render={({ field, fieldState }) => (
            <FieldContainer
              label=" nr Mesi Calcolo:"
              input={<NumericInput {...field} frozen={frozen} />}
            />
          )}
        />
        <Controller
          control={form.control}
          name="scontaValoreMerce"
          render={({ field, fieldState }) => (
            <FieldContainer
              label="Valore(merce):"
              input={
                <SelectBox
                  height={25}
                  disabled={frozen}
                  items={["valore", "merce"]}
                  value={field.value}
                  onValueChanged={(e) => field.onChange(e.value)}
                />
              }
            />
          )}
        />
      </div>
    </>
  );
}

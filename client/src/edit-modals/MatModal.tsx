import React, { Suspense, useRef } from "react";
import { EditModalProps, createEditModal } from "../screen-templates/EditModal";
import { DefaultService, MopDettRequestPar } from "../services/openapi";
import EditModal from "../components/layout-elements/EditModal";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import DataGrid from "devextreme-react/data-grid";
import { useEntityForEdit } from "../data-retrieval/useEntity";
import FieldContainer from "../components/form-elements/FieldContainer";
import { DateBox, NumberBox, TextBox } from "devextreme-react";

type FormInterface = MopDettRequestPar;

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
    getter: DefaultService.mopDettControllergetForEdit,
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
      isActive={false}
      onEdit={async () => {
        await DefaultService.mopDettControllerUpdate({
          requestBody: form.getValues(),
        });
      }}
      body={({ frozen }) => {
        return (
          <div style={{ marginBottom: 30 }}>
            <FormMat form={form} nuovo={!ID} frozen={frozen}></FormMat>
          </div>
        );
      }}
    />
  );
}

export function FormMat({
  form,
  nuovo,
  frozen,
}: {
  form: UseFormReturn<FormInterface>;
  nuovo: boolean;
  frozen: boolean;
}) {
  return (
    <>
      <div style={{ padding: 5, marginLeft: "5px", marginRight: "5px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, marginRight: 25 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Controller
                control={form.control}
                name="serial"
                render={({ field }) => (
                  <FieldContainer
                    label="Serial:"
                    input={
                      <TextBox
                        value={field.value}
                        disabled={frozen || !nuovo}
                        onValueChanged={(e) => field.onChange(e.value)}
                      ></TextBox>
                    }
                  ></FieldContainer>
                )}
              ></Controller>
              <Controller
                control={form.control}
                name="numRow"
                render={({ field }) => (
                  <FieldContainer
                    label="Numero riga:"
                    input={
                      <NumberBox
                        disabled={frozen || !nuovo}
                        value={field.value}
                        onValueChanged={(e) => field.onChange(e.value)}
                      ></NumberBox>
                    }
                  ></FieldContainer>
                )}
              ></Controller>
              <Controller
                control={form.control}
                name="dataMat"
                render={({ field }) => (
                  <FieldContainer
                    label="Data:"
                    input={
                      <DateBox
                        disabled={frozen || !nuovo}
                        value={field.value ?? undefined}
                        onValueChanged={(e) => field.onChange(e.value)}
                      ></DateBox>
                    }
                  ></FieldContainer>
                )}
              ></Controller>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

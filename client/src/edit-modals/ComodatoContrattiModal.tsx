import React, {
  MutableRefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { DataGrid } from "devextreme-react/data-grid";
import { DateBox } from "devextreme-react/date-box";
import { NumberBox } from "devextreme-react/number-box";
import { TextBox } from "devextreme-react/text-box";
import { Controller, useForm, UseFormReturn, useWatch } from "react-hook-form";

import {
  ComodatoContrattiDettEdit,
  ComodatoContrattiMastBasic,
  DefaultService,
} from "../services/openapi";
import EditModal from "../components/layout-elements/EditModal";
import {
  Column,
  Editing,
  Scrolling,
  Sorting,
} from "devextreme-react/data-grid";
import ElencoDettagli from "../components/layout-elements/ElencoDettagli";
import FieldContainer from "../components/form-elements/FieldContainer";
import { ClienteInput } from "../components/form-elements/lookup-fields/ClienteInput";
import { DestinazioneInput } from "../components/form-elements/lookup-fields/DestinazioneInput";
import { ArticoloInput } from "../components/form-elements/lookup-fields/ArticoloInput";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { useEntityForEdit, useGeneratedID } from "../data-retrieval/useEntity";
import { createEditModal, EditModalProps } from "../screen-templates/EditModal";
import { DocInput } from "../components/form-elements/lookup-fields/DocInput";
import { KeyArtInput } from "../components/form-elements/lookup-fields/KeyArtInput";
import { MatricolaInput } from "../components/form-elements/lookup-fields/MatricolaInput";
import { DocRigheInput } from "../components/form-elements/lookup-fields/DocRigheInput";
import { editModalDataGridOptions } from "../DataGridOptions";
import { handleDataGridAutocompleteOnchange } from "../utils";
import _ from "lodash";
import AggiungiRigaButton from "../components/AggiungiRigaButton";
import ElencoAllegatiGrid from "../screens/Allegati/ElencoAllegatiGrid";
import FileUpload from "../components/FileUploader";

type FormInterface = ComodatoContrattiMastBasic;
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
  const [isClicked, setIsClicked] = useState(false);
  const [upload, setUpload] = useState(false);
  const { data } = useEntityForEdit({
    id: ID ?? null,
    getter: DefaultService.comodatoContrattiControllerGetForEdit,
    editProcedureId,
  });
  const [info, setInfo] = useState({
    collegamentoATabella: "RAVAS_COFFEE_CONTR_COMODATO_MAST",
    collegamentoACampo: "NRO_CONTRATTO",
    valoreCampo: "",
  });
  const { numero: generatedNumero } = useGeneratedID({
    id: ID ?? null,
    idGenerator: DefaultService.comodatoContrattiControllerGenerateNewNumero,
    editProcedureId,
  }) ?? { numero: null };
  const { dettagli, ...dati } = data ?? {
    dettagli: [] as ComodatoContrattiDettEdit[],
    numero: generatedNumero ?? undefined,
  };
  const form = useForm<FormInterface>({
    defaultValues: dati,
  });
  let dettagliContratto = dettagli;
  const [store] = useState(
    () =>
      new ArrayStore({
        key: "ID",
        data: dettagliContratto,
        onInserted: function (values, key) {
          values.ID = "new_" + key;
        },
      })
  );
  const [dataSource] = useState(
    () =>
      new DataSource({
        store,
        reshapeOnPush: true,
      })
  );
  const toggleTable = () => {
    setInfo({
      ...info,
      valoreCampo: data?.numero.toString()!,
    });
    setIsClicked(true);
    setUpload(false);
  };
  const fileUpload = () => {
    setInfo({
      ...info,
      valoreCampo: data?.numero.toString()!,
    });
    setIsClicked(true);
    setUpload(true);
  };
  const isActive = true;
  return (
    <EditModal
      isActive={isActive}
      title={name}
      nuovo={!ID}
      dgRef={dgRef}
      onCreate={async () => {
        await DefaultService.comodatoContrattiControllerCreate({
          requestBody: {
            contratto: form.getValues(),
            dettagli: await dataSource.load(),
          },
        });
      }}
      onEdit={async () => {
        await DefaultService.comodatoContrattiControllerUpdate({
          requestBody: {
            contratto: form.getValues(),
            dettagli: await dataSource.load(),
          },
        });
      }}
      onDelete={async () => {
        await DefaultService.comodatoContrattiControllerDelete({
          requestBody: { ID: form.getValues("ID") },
        });
      }}
      form={form}
      body={({ frozen }) => {
        return (
          <div style={{ marginBottom: 30 }}>
            {!isClicked && (
              <div>
                <ContrattiScontoForm frozen={frozen} form={form} />
                <DettagliContratto
                  data={dataSource}
                  frozen={frozen}
                  form={form}
                  dgRef={dgRef}
                />
              </div>
            )}
            {isClicked && !upload && <ElencoAllegatiGrid form={info} />}
            {isClicked && upload && <FileUpload props={info} />}
          </div>
        );
      }}
      toggleTable={toggleTable}
      fileUpload={fileUpload}
    />
  );
}

export function ContrattiScontoForm({
  frozen,
  form,
}: {
  frozen: boolean;
  form: UseFormReturn<FormInterface>;
}) {
  return (
    <>
      <div style={{ padding: 5, margin: 10 }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, marginRight: 25 }}>
            <div>
              <Controller
                control={form.control}
                name={"numero"}
                render={({ field }) => (
                  <FieldContainer
                    obbligatorio={true}
                    label="Nro Contratto"
                    input={
                      <NumberBox
                        labelMode={"hidden"}
                        height={25}
                        disabled={frozen}
                        value={field.value ?? undefined}
                        onValueChanged={(val) => field.onChange(val.value)}
                      />
                    }
                  />
                )}
                rules={{ required: true }}
              />
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
            </div>
            <Controller
              control={form.control}
              name="dataContratto"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Data:"}
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

            <div>
              <Controller
                control={form.control}
                name="dataAttivazioneContratto"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data Attivazione:"}
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

              <Controller
                control={form.control}
                name="dataChiusuraContratto"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data Chiusura:"}
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
            </div>
          </div>
          <div style={{ flex: 2 }}>
            <Controller
              control={form.control}
              name="consegnaUtente"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Consegna Utente:"}
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
              name="consegnaNroPratica"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Nro pratica di consegna:"}
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
              name="consegnaSerialDoc"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Documento consegna:"}
                  input={
                    <DocInput
                      value={field.value}
                      frozen={frozen}
                      onChange={(val) => field.onChange(val)}
                      form={form}
                      contoFieldName={"idCliente"}
                      causali={window.appConfig.causaliDoc.consegnaComodato}
                    />
                  }
                />
              )}
            />

            <Controller
              control={form.control}
              name="consegnaDataFirma"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Data Firma Consegna:"}
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
            <Controller
              control={form.control}
              name="ritiroUtente"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Ritiro Utente:"}
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
              name="ritiroNroPratica"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Nro pratica di ritiro:"}
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
              name="ritiroSerialDoc"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Documento Ritiro:"}
                  input={
                    <DocInput
                      value={field.value}
                      frozen={frozen}
                      onChange={(val) => field.onChange(val)}
                      form={form}
                      contoFieldName={"idCliente"}
                      causali={window.appConfig.causaliDoc.ritiroComodato}
                    />
                  }
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function DettagliContratto({
  data,
  frozen,
  form,
  dgRef,
}: {
  data?: DataSource;
  frozen: boolean;
  form: UseFormReturn<ComodatoContrattiMastBasic, any, undefined>;
  dgRef: MutableRefObject<DataGrid | null>;
}) {
  return (
    <div>
      <ElencoDettagli
        title={"Contratti"}
        buttons={<AggiungiRigaButton dgRef={dgRef} frozen={frozen} />}
      >
        <DataGrid
          {...editModalDataGridOptions}
          dataSource={data}
          ref={(ref) => (dgRef.current = ref)}
        >
          <Sorting mode="none" />
          <Scrolling mode="virtual" />
          {!frozen && (
            <Editing
              mode="cell"
              confirmDelete={false}
              allowAdding={false}
              allowDeleting={true}
              allowUpdating={true}
              newRowPosition={"last"}
            />
          )}
          <Column
            width={200}
            allowEditing={true}
            showEditorAlways={true}
            dataField={"keyArt"}
            editCellRender={(cellInfo) => (
              <KeyArt
                frozen={false}
                dg={dgRef}
                displayMode={frozen ? "SHOW" : "EDIT"}
                dataField={"keyArt"}
                cellInfo={cellInfo}
              />
            )}
            caption="ARTICOLO (COD. RIC.)"
          ></Column>

          <Column
            width={200}
            allowEditing={false}
            dataField={"codiceArticolo"}
            cellRender={(cellInfo) => (
              <Articoli
                dg={dgRef}
                dataField={"codiceArticolo"}
                cellInfo={cellInfo}
              />
            )}
            caption="ARTICOLO"
          />

          <Column
            width={200}
            caption="MATRICOLA"
            allowEditing={true}
            showEditorAlways={true}
            dataField={"idMatricola"}
            editCellRender={(cellInfo) => (
              <Matricola
                dg={dgRef}
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dataField={"idMatricola"}
              />
            )}
          />

          <Column
            width={200}
            caption="DOCUMENTO CONSEGNA"
            allowEditing={true}
            showEditorAlways={true}
            dataField={"consegnaSerialRif"}
            editCellRender={(cellInfo) => (
              <Documenti
                form={form}
                dg={dgRef}
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dataField={"consegnaSerialRif"}
                causali={window.appConfig.causaliDoc.consegnaComodato}
              />
            )}
          />
          <Column
            width={200}
            caption="RIGA CONSEGNA"
            allowEditing={true}
            showEditorAlways={true}
            dataField={"idRigaConsegna"}
            editCellRender={(cellInfo) => (
              <RigheDocumento
                fieldDocumento="consegnaSerialRif"
                dg={dgRef}
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dataField={"idRigaConsegna"}
              />
            )}
          />
          <Column
            width={200}
            caption="DOCUMENTO RITIRO"
            allowEditing={true}
            showEditorAlways={true}
            dataField={"ritiroSerialRif"}
            editCellRender={(cellInfo) => (
              <Documenti
                form={form}
                dg={dgRef}
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dataField={"ritiroSerialRif"}
                causali={window.appConfig.causaliDoc.ritiroComodato}
              />
            )}
          />
          <Column
            width={200}
            caption="RIGA RITRIO"
            allowEditing={true}
            showEditorAlways={true}
            dataField={"idRigaRitiro"}
            editCellRender={(cellInfo) => (
              <RigheDocumento
                fieldDocumento="ritiroSerialRif"
                dg={dgRef}
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dataField={"idRigaRitiro"}
              />
            )}
          />
        </DataGrid>
      </ElencoDettagli>
    </div>
  );
}

function KeyArt({
  frozen,
  cellInfo,
  displayMode,
  dg,
  dataField,
}: {
  frozen: boolean;
  cellInfo: any;
  displayMode: "EDIT" | "SHOW";
  dg: MutableRefObject<DataGrid | null>;
  dataField: string;
}) {
  return (
    <div className="field-container">
      <div className="value">
        <KeyArtInput
          frozen={frozen}
          displayMode={displayMode}
          value={cellInfo.value}
          onChange={(val) =>
            handleDataGridAutocompleteOnchange({
              val,
              dg,
              dataField,
              cellInfo,
              skip: -1,
            })
          }
        />
      </div>
    </div>
  );
}

function Articoli({
  cellInfo,
  dg,
  dataField,
}: {
  cellInfo: any;
  dg: MutableRefObject<DataGrid | null>;
  dataField: string;
}) {
  return (
    <div className="field-container">
      <div className="value">
        <ArticoloInput
          keyArt={cellInfo.data.keyArt ?? null}
          frozen={true}
          displayMode={"SHOW"}
          value={cellInfo.value}
          onChange={(val) => {
            console.log(
              "My store is",
              cellInfo,
              _.cloneDeep(
                (dg.current?.instance.getDataSource().store() as any)._array
              )
            );
            return handleDataGridAutocompleteOnchange({
              val,
              dg,
              dataField,
              cellInfo,
            });
          }}
        />
      </div>
    </div>
  );
}

function Matricola({
  displayMode,
  cellInfo,
  dataField,
  dg,
}: {
  displayMode: "SHOW" | "EDIT";
  cellInfo: any;
  dg: MutableRefObject<DataGrid | null>;
  dataField: string;
}) {
  return (
    <div className="field-container">
      <div className="value">
        <MatricolaInput
          frozen={false}
          value={cellInfo.value}
          onChange={(val) =>
            handleDataGridAutocompleteOnchange({ val, dg, dataField, cellInfo })
          }
          articoloId={cellInfo.data.codiceArticolo}
          displayMode={displayMode}
        />
      </div>
    </div>
  );
}

function Documenti({
  displayMode,
  cellInfo,
  dataField,
  form,
  dg,
  causali,
}: {
  displayMode: "SHOW" | "EDIT";
  cellInfo: any;
  dg: MutableRefObject<DataGrid | null>;
  form: UseFormReturn<any>;
  dataField: string;
  causali: string[] | null;
}) {
  return (
    <div className="field-container">
      <div className="value">
        <DocInput
          frozen={false}
          value={cellInfo.value}
          onChange={(val) =>
            handleDataGridAutocompleteOnchange({ val, dg, dataField, cellInfo })
          }
          causali={causali}
          contoFieldName={"idCliente"}
          form={form}
          displayMode={displayMode}
        />
      </div>
    </div>
  );
}

function RigheDocumento({
  displayMode,
  cellInfo,
  dataField,
  fieldDocumento,
  dg,
}: {
  displayMode: "SHOW" | "EDIT";
  cellInfo: any;
  dg: MutableRefObject<DataGrid | null>;
  fieldDocumento: string;
  dataField: string;
}) {
  return (
    <div className="field-container">
      <div className="value">
        <DocRigheInput
          frozen={false}
          value={cellInfo.value}
          onChange={(val) =>
            handleDataGridAutocompleteOnchange({ val, dg, dataField, cellInfo })
          }
          idDocumento={cellInfo.data[fieldDocumento]}
          displyMode={displayMode}
        />
      </div>
    </div>
  );
}

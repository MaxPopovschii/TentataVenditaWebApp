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
import { TextArea } from "devextreme-react/text-area";
import { Sorting } from "devextreme-react/data-grid";
import { Controller, useForm, UseFormReturn, useWatch } from "react-hook-form";

import {
  DefaultService,
  ScontiContrattiDettEdit,
  ScontiContrattiMastBasic,
} from "../services/openapi";
import EditModal from "../components/layout-elements/EditModal";
import { Column, Editing, Scrolling } from "devextreme-react/data-grid";
import ElencoDettagli from "../components/layout-elements/ElencoDettagli";
import FieldContainer from "../components/form-elements/FieldContainer";
import { ClienteInput } from "../components/form-elements/lookup-fields/ClienteInput";
import { DestinazioneInput } from "../components/form-elements/lookup-fields/DestinazioneInput";
import { ScontoModelliInput } from "../components/form-elements/lookup-fields/ScontoModelliInput";
import { useModelloSconto } from "../data-retrieval/contratti-sconto/useModelloSconto";
import { ArticoloInput } from "../components/form-elements/lookup-fields/ArticoloInput";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { useEntityForEdit, useGeneratedID } from "../data-retrieval/useEntity";
import { GruppoMerceologicoInput } from "../components/form-elements/lookup-fields/GruppoMerceologicoInput";
import { createEditModal, EditModalProps } from "../screen-templates/EditModal";
import { editModalDataGridOptions } from "../DataGridOptions";
import { handleDataGridAutocompleteOnchange } from "../utils";
import AggiungiRigaButton from "../components/AggiungiRigaButton";

type FormInterface = ScontiContrattiMastBasic;
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
    getter: DefaultService.scontiContrattiControllerGetForEdit,
    editProcedureId,
  });
  const { ID: generatedID } = useGeneratedID({
    id: ID ?? null,
    idGenerator: DefaultService.scontiContrattiControllerGenerateNewId,
    editProcedureId,
  }) ?? { ID: null };
  const { dettagli, ...dati } = data ?? {
    dettagli: [] as ScontiContrattiDettEdit[],
    ID: generatedID ?? undefined,
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
  return (
    <EditModal
      title={name}
      dgRef={dgRef}
      nuovo={!ID}
      onCreate={async () => {
        await DefaultService.scontiContrattiControllerCreate({
          requestBody: {
            contratto: form.getValues(),
            dettagli: await store.load(),
          },
        });
      }}
      onEdit={async () => {
        await DefaultService.scontiContrattiControllerUpdate({
          requestBody: {
            contratto: form.getValues(),
            dettagli: await store.load(),
          },
        });
      }}
      onDelete={async () => {
        await DefaultService.scontiContrattiControllerDelete({
          requestBody: { ID: form.getValues("ID") },
        });
      }}
      form={form}
      body={({ frozen }) => {
        return (
          <div style={{ marginBottom: 30 }}>
            <ContrattiScontoForm frozen={frozen} form={form} />
            <DettagliContratto
              data={dataSource}
              frozen={frozen}
              dgRef={dgRef}
            />
          </div>
        );
      }}
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
  const IdModelloContratto = useWatch({
    control: form.control,
    name: "codiceModello",
  });
  const modelloSconto = useModelloSconto({ id: IdModelloContratto });
  const importoScontareMaxDisabled = modelloSconto.isSuccess
    ? !modelloSconto.data?.abilitaImportoLimiteMax
    : undefined;

  const QtnOmaggiareDisabled = modelloSconto.isSuccess
    ? !modelloSconto.data?.abilitaQtaOmaggiare
    : undefined;

  const QtnSogliaMinimaDisabled = modelloSconto.isSuccess
    ? !modelloSconto.data?.abilitaQtaSogliaMinima
    : undefined;

  useEffect(() => {
    if (importoScontareMaxDisabled) form.setValue("importoScontareMax", null);
    if (QtnOmaggiareDisabled) form.setValue("totQtaOmaggiata", null);
    if (QtnSogliaMinimaDisabled) form.setValue("qtaSogliaMinima", null);
  }, [
    importoScontareMaxDisabled,
    QtnOmaggiareDisabled,
    QtnSogliaMinimaDisabled,
  ]);
  return (
    <>
      <div style={{ padding: 5, margin: 10 }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, marginRight: 25 }}>
            <Controller
              control={form.control}
              name="ID"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Numero:"}
                  obbligatorio={true}
                  input={
                    <TextBox
                      labelMode={"hidden"}
                      height={25}
                      value={field.value}
                      disabled={frozen}
                      onValueChanged={(value) => field.onChange(value.value)}
                    />
                  }
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={form.control}
              name="codiceModello"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Tipo (Modello):"}
                  obbligatorio={true}
                  input={
                    <ScontoModelliInput
                      frozen={frozen}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  }
                />
              )}
              rules={{ required: true }}
            />
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
            </div>

            <div>
              <Controller
                control={form.control}
                name="dataInizioValidita"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data validità:"}
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
                name="mesiDurataContratto"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Mesi durata contratto:"}
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
                name="dataFineValidita"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data fine validità:"}
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
                name="dataChiusura"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data chiusura:"}
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
                name="motivoChiusura"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Motivo Chiusura:"}
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
                name="dataEsaurimentoPrevista"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data esaurimento Prevista:"}
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
                name="dataEsaurimentoEffettiva"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data esaurimento Effettiva:"}
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
                name="dataUltimaElaborazione"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data Ultima Elaborazione:"}
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
              name="importoScontareMax"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Importo Da scontare max:"}
                  input={
                    <TextBox
                      labelMode={"hidden"}
                      height={25}
                      value={field.value?.toString() ?? ""}
                      disabled={
                        frozen ||
                        importoScontareMaxDisabled ||
                        importoScontareMaxDisabled === undefined
                      }
                      onValueChanged={(value) => {
                        if (value.value)
                          field.onChange(parseFloat(value.value));
                        else field.onChange(null);
                      }}
                    />
                  }
                />
              )}
            />
            <Controller
              control={form.control}
              name="importoScontareErogato"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Importo Sconto Erogato:"}
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
              name="importoScontareResiduo"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Importo Sconto Residuo:"}
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
            <div style={{ marginTop: 40, marginBottom: 40 }}>
              <Controller
                control={form.control}
                name="qtaSogliaMinima"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Quantità soglia minima:"}
                    input={
                      <TextBox
                        labelMode={"hidden"}
                        height={25}
                        value={field.value?.toString() ?? ""}
                        disabled={
                          frozen ||
                          QtnSogliaMinimaDisabled ||
                          QtnSogliaMinimaDisabled === undefined
                        }
                        onValueChanged={(value) => {
                          if (value.value)
                            field.onChange(parseFloat(value.value));
                          else field.onChange(null);
                        }}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={form.control}
                name="totQtaOmaggiata"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Tot Quantità omaggiata:"}
                    input={
                      <TextBox
                        labelMode={"hidden"}
                        height={25}
                        value={field.value?.toString() ?? ""}
                        disabled={
                          frozen ||
                          QtnOmaggiareDisabled ||
                          QtnOmaggiareDisabled === undefined
                        }
                        onValueChanged={(value) => {
                          if (value.value)
                            field.onChange(parseFloat(value.value));
                          else field.onChange(null);
                        }}
                      />
                    }
                  />
                )}
              />
            </div>
            <div style={{ marginTop: 40, marginBottom: 40 }}>
              <Controller
                control={form.control}
                name="kgMinimoSettimana"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Kg minimo ww:"}
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
                name="kgMinimoMese"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Kg minimo mese:"}
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
                name="kgMinimoAnno"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Kg minimo anno:"}
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
            <Controller
              control={form.control}
              name="note"
              render={({ field, fieldState }) => (
                <FieldContainer
                  label={"Note:"}
                  input={
                    <TextArea
                      labelMode={"hidden"}
                      height={100}
                      value={field.value ?? undefined}
                      disabled={frozen}
                      onValueChanged={(value) => field.onChange(value.value)}
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
  dgRef,
}: {
  data?: DataSource;
  frozen: boolean;
  dgRef: MutableRefObject<DataGrid | null>;
}) {
  return (
    <div>
      <ElencoDettagli
        title={"Contratti"}
        buttons={<AggiungiRigaButton dgRef={dgRef} frozen={frozen} />}
      >
        <DataGrid
          dataSource={data}
          ref={(ref) => (dgRef.current = ref)}
          {...editModalDataGridOptions}
        >
          <Sorting mode="none" />
          <Scrolling mode="virtual" />
          {!frozen && (
            <Editing
              newRowPosition={"last"}
              mode="cell"
              confirmDelete={false}
              allowAdding={false}
              allowDeleting={true}
              allowUpdating={true}
            />
          )}

          <Column
            allowEditing={true}
            showEditorAlways={true}
            dataField={"codiceArticolo"}
            editCellRender={(cellInfo) => (
              <Articoli
                frozen={false}
                dg={dgRef}
                displayMode={frozen ? "SHOW" : "EDIT"}
                dataField={"codiceArticolo"}
                cellInfo={cellInfo}
              />
            )}
            width={300}
            caption="ARTICOLO"
          ></Column>
          <Column
            caption="GRUPPO MERCEOLOGICO"
            width={300}
            allowEditing={true}
            showEditorAlways={true}
            dataField={"codiceGruppoMerc"}
            editCellRender={(cellInfo) => (
              <GruppoMerceologico
                dg={dgRef}
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dataField={"codiceGruppoMerc"}
              />
            )}
          />
          <Column
            dataField="qtaSogliaMinima"
            caption="QTA MINIMA"
            dataType={"number"}
            width={100}
          />
          <Column
            dataField="qtaOmaggiare"
            dataType={"number"}
            caption="QTA OMAGGIO"
            width={100}
          />
          <Column
            dataField="dataInizioValidita"
            dataType="date"
            caption="INIZIO"
            width={100}
          />
          <Column
            dataField="dataFineValidita"
            dataType="date"
            caption="FINE"
            width={100}
          />
          <Column
            dataField="totImportoScontato"
            dataType="number"
            caption="TOT. IMP. SCON."
            width={100}
          />
          <Column
            dataField="totQtaScontata"
            dataType="number"
            caption="TOT. QTA. SCON."
            width={100}
          />
          <Column
            dataField="kgMinimoSettimana"
            dataType="number"
            caption="KG WEEK"
            width={100}
          />
          <Column
            dataField="kgMinimoMese"
            dataType="number"
            caption="KG MESE"
            width={100}
          />
          <Column
            dataField="kgMinimoAnno"
            dataType="number"
            caption="KG ANNO"
            width={100}
          />
        </DataGrid>
      </ElencoDettagli>
    </div>
  );
}

function Articoli({
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
        <ArticoloInput
          frozen={frozen}
          displayMode={displayMode}
          value={cellInfo.value}
          onChange={(val) =>
            handleDataGridAutocompleteOnchange({ val, dg, dataField, cellInfo })
          }
        />
      </div>
    </div>
  );
}

function GruppoMerceologico({
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
        <GruppoMerceologicoInput
          frozen={false}
          value={cellInfo.value}
          onChange={(val) =>
            handleDataGridAutocompleteOnchange({ val, dg, dataField, cellInfo })
          }
          displayMode={displayMode}
        />
      </div>
    </div>
  );
}

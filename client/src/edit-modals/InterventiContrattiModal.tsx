import React, {
  MutableRefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Column,
  DataGrid,
  Editing,
  Format,
  Scrolling,
  Sorting,
} from "devextreme-react/data-grid";
import { DateBox } from "devextreme-react/date-box";
import { NumberBox } from "devextreme-react/number-box";
import { Controller, useForm, UseFormReturn, useWatch } from "react-hook-form";

import {
  DefaultService,
  InterventiDettEdit,
  InterventiMastBasic,
} from "../services/openapi";
import EditModal from "../components/layout-elements/EditModal";
import ElencoDettagli from "../components/layout-elements/ElencoDettagli";
import FieldContainer from "../components/form-elements/FieldContainer";
import { ClienteInput } from "../components/form-elements/lookup-fields/ClienteInput";
import { ArticoloInput } from "../components/form-elements/lookup-fields/ArticoloInput";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { useEntityForEdit, useGeneratedID } from "../data-retrieval/useEntity";
import { createEditModal, EditModalProps } from "../screen-templates/EditModal";
import { MatricolaInput } from "../components/form-elements/lookup-fields/MatricolaInput";
import { DocInput } from "../components/form-elements/lookup-fields/DocInput";
import { AttrezzatureInput } from "../components/form-elements/lookup-fields/AttrezzatureInput";
import { TipologiaInterventoInput } from "../components/form-elements/lookup-fields/TipologieInterventoInput";
import { editModalDataGridOptions } from "../DataGridOptions";
import { nomiSchermate } from "../NomiSchermate";
import { MagazzinoInput } from "../components/form-elements/lookup-fields/MagazzinoInput";
import { handleDataGridAutocompleteOnchange } from "../utils";
import TextBox from "devextreme-react/text-box";
import AggiungiRigaButton from "../components/AggiungiRigaButton";
import { ContoID } from "common";
import ElencoAllegatiInt from "../screens/Allegati/ElencoAllegatiInt";
import FileUpload from "../components/FileUploader";
import { useArticolo } from "../data-retrieval/general/useArticolo";
import { useMatricola } from "../data-retrieval/general/useMatricola";
import { DestinazioneInput } from "../components/form-elements/lookup-fields/DestinazioneInput";
import { TecnicoInput } from "../components/form-elements/lookup-fields/TecnicoInput";
import { useTecnico } from "../data-retrieval/general/useTecnico";
import { TecnicoID } from "../../../common/src/IDSystem/TecniciID";
import { useSuspenseQuery } from "@tanstack/react-query";

type FormInterface = InterventiMastBasic;
export default createEditModal(MainPage);

function MainPage(props: EditModalProps) {
  return (
    <Suspense>
      <MainPageInternal {...props}></MainPageInternal>
    </Suspense>
  );
}

function MainPageInternal({
  ID,
  name,
  editProcedureId,
  masterForm,
}: EditModalProps) {
  const dgRef = useRef<DataGrid | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [upload, setUpload] = useState(false);
  const { data } = useEntityForEdit({
    id: ID ?? null,
    getter: DefaultService.interventiMasterControllerGetForEdit,
    editProcedureId,
  });
  const [info, setInfo] = useState({
    collegamentoATabella: "RAVAS_COFFEE_INTERVENTI_MAST",
    collegamentoACampo: "ID",
    valoreCampo: "",
  });
  const { numero: generatedNumero } = useGeneratedID({
    id: ID ?? null,
    idGenerator: DefaultService.interventiMasterControllerGenerateNewNumero,
    editProcedureId,
  }) ?? { numero: null };

  const { dettagli, ...dati } = data ?? {
    dettagli: [] as InterventiDettEdit[],
    numero: generatedNumero ?? undefined,
    idCliente: masterForm?.getValues("idCliente") ?? undefined,
    idMatricola: masterForm?.getValues("idMatricola") ?? undefined,
    codiceArticolo: masterForm?.getValues("idArticolo") ?? undefined,
  };

  const form = useForm<FormInterface>({
    defaultValues: dati,
  });

  const codiceArticolo = useWatch({
    control: form.control,
    name: "codiceArticolo",
  });

  let famArticolo = useArticolo({ id: codiceArticolo ?? null }).data?.arcodfam;
  console.log("famArt", famArticolo);

  const idMatricola = useWatch({
    control: form.control,
    name: "idMatricola",
  });
  const idTecnico = useWatch({
    control: form.control,
    name: "tecnico",
  });
  const matFor = useMatricola({ id: idMatricola ?? null }).data?.lnk_matfor;
  const tecnico = useTecnico({
    id: idTecnico ? TecnicoID.parse(idTecnico).codice : null,
  }).data;

  useEffect(() => {
    if (tecnico?.tipo == "F" && tecnico.codiceFornitore) {
      form.setValue(
        "idFornitore",
        ContoID.compute({ antipcon: "F", ancodice: tecnico.codiceFornitore })
      );
    }
  }, [tecnico?.codice]);

  useEffect(() => {
    form.setValue("matricolaFornitore", matFor ?? null);
    console.log("matfor", matFor);
  }, [matFor]);

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
      valoreCampo: data?.numero,
    });
    setIsClicked(true);
    setUpload(false);
  };
  const fileUpload = () => {
    setInfo({
      ...info,
      valoreCampo: data?.numero,
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
        await DefaultService.interventiMasterControllerCreate({
          requestBody: {
            contratto: form.getValues(),
            dettagli: await store.load(),
          },
        });
      }}
      onEdit={async () => {
        await DefaultService.interventiMasterControllerUpdate({
          requestBody: {
            contratto: form.getValues(),
            dettagli: await store.load(),
          },
        });
      }}
      onDelete={async () => {
        await DefaultService.interventiMasterControllerDelete({
          requestBody: { ID: form.getValues("ID") },
        });
      }}
      form={form}
      body={({ frozen }) => {
        return (
          <div style={{ marginBottom: 30 }}>
            {!isClicked && (
              <div>
                <ContrattiInterventoForm
                  frozen={frozen}
                  form={form}
                  nuovo={!ID}
                />
                <DettagliContratto
                  data={dataSource}
                  frozen={frozen}
                  famArt={famArticolo}
                />
              </div>
            )}
            {isClicked && !upload && <ElencoAllegatiInt form={info} />}
            {isClicked && upload && <FileUpload props={info} />}
          </div>
        );
      }}
      toggleTable={toggleTable}
      fileUpload={fileUpload}
    />
  );
}

export function ContrattiInterventoForm({
  frozen,
  form,
  nuovo,
}: {
  frozen: boolean;
  form: UseFormReturn<FormInterface>;
  nuovo: boolean;
}) {
  const now = new Date();
  var layoutType = localStorage.getItem("layoutType");
  const idArticolo =
    useWatch({ control: form.control, name: "codiceArticolo" }) ?? undefined;

  useEffect(() => {
    if (idArticolo && idArticolo?.split("****")?.length > 1) {
      console.log("articoloId", idArticolo);
      console.log("set id matricola", idArticolo?.split("****")[0]);
      form.setValue("idMatricola", idArticolo?.split("****")[1]);
      form.setValue("codiceArticolo", idArticolo?.split("****")[0]);
    }
  }, [idArticolo]);
  const data = JSON.parse(localStorage.getItem("primaRiga") as string);
  console.log(data);
  return (
    <>
      <div style={{ padding: 5, marginLeft: "5px", marginRight: "5px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, marginRight: 25 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Controller
                control={form.control}
                name="numero"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FieldContainer
                    whidth={70}
                    label={"Numero:"}
                    obbligatorio={true}
                    input={
                      <NumberBox
                        height={25}
                        disabled={frozen || !nuovo}
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={form.control}
                name="dataEsecuzione"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data Esecuzione:"}
                    whidth={100}
                    input={
                      <DateBox
                        showClearButton={true}
                        height={25}
                        displayFormat={"dd/MM/yyyy"}
                        type="date"
                        value={nuovo ? now : field.value ?? undefined}
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
                name="dataInserimento"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Data Inserimento:"}
                    whidth={100}
                    input={
                      <DateBox
                        showClearButton={true}
                        displayFormat={"dd/MM/yyyy"}
                        height={25}
                        type="date"
                        value={nuovo ? now : field.value ?? undefined}
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
                name="tipoRichiesta"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Tipo Richiesta:"}
                    whidth={80}
                    input={
                      <TextBox
                        height={25}
                        disabled={frozen}
                        value={
                          layoutType == "operator" && nuovo
                            ? "Revisione presso officina"
                            : field.value ?? undefined
                        }
                        onValueChanged={(value) => field.onChange(value.value)}
                      />
                    }
                  />
                )}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Controller
                control={form.control}
                name="descrizione"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    label={"Descrizione:"}
                    whidth={70}
                    input={
                      <TextBox
                        height={25}
                        disabled={frozen}
                        value={field.value ?? undefined}
                        onValueChanged={(value) => field.onChange(value.value)}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={form.control}
                name="note"
                render={({ field, fieldState }) => (
                  <FieldContainer
                    whidth={100}
                    label={"Note:"}
                    input={
                      <TextBox
                        height={25}
                        disabled={frozen}
                        value={field.value ?? undefined}
                        onValueChanged={(value) => field.onChange(value.value)}
                      />
                    }
                  />
                )}
              />
            </div>
            <div
              style={{
                marginTop: 5,
                marginBottom: 5,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ flex: 1 }}>
                <Controller
                  control={form.control}
                  name={"idCliente"}
                  render={({ field }) => (
                    <FieldContainer
                      whidth={70}
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
                      whidth={70}
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
              <div style={{ flex: 1 }}>
                <Controller
                  control={form.control}
                  name={"tecnico"}
                  render={({ field }) => (
                    <FieldContainer
                      whidth={100}
                      label={"Tecnico:"}
                      input={
                        <TecnicoInput
                          frozen={frozen}
                          value={field.value}
                          onChange={(val) => field.onChange(val)}
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name={"idFornitore"}
                  render={({ field }) => (
                    <FieldContainer
                      whidth={100}
                      label={"Fornitore:"}
                      input={
                        <ClienteInput
                          frozen={frozen}
                          value={field.value}
                          onChange={(val) => field.onChange(val)}
                          tipoConto="F"
                        />
                      }
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Controller
                  control={form.control}
                  name={"codiceArticolo"}
                  render={({ field }) => (
                    <FieldContainer
                      whidth={70}
                      label={"Articolo:"}
                      input={
                        <ArticoloInput
                          frozen={frozen}
                          value={nuovo ? data.articolo : field.value}
                          onChange={(val) => field.onChange(val)}
                        />
                      }
                    />
                  )}
                />

                <Controller
                  control={form.control}
                  name={"idMatricola"}
                  render={({ field }) => (
                    <FieldContainer
                      whidth={100}
                      label={"Matricola:"}
                      input={
                        <MatricolaInput
                          frozen={frozen}
                          form={form}
                          articoloFieldName={"codiceArticolo"}
                          value={nuovo ? data.matricola : field.value}
                          onChange={(val) => field.onChange(val)}
                        />
                      }
                    />
                  )}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Controller
                  control={form.control}
                  name={"serialeDoc"}
                  render={({ field }) => (
                    <FieldContainer
                      whidth={70}
                      label={"Documento:"}
                      input={
                        <DocInput
                          frozen={frozen}
                          form={form}
                          contoFieldName={"idFornitore"}
                          causali={window.appConfig.causaliDoc.intervento}
                          value={field.value}
                          onChange={(val) => field.onChange(val)}
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name={"matricolaFornitore"}
                  render={({ field }) => (
                    <FieldContainer
                      whidth={100}
                      label={"Matricola Fornitore:"}
                      input={
                        <TextBox
                          height={25}
                          disabled={frozen}
                          value={
                            nuovo
                              ? data.matricolaFornitore
                              : field.value ?? undefined
                          }
                          onChange={(value) => field.onChange(value)}
                        />
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DettagliContratto({
  data,
  frozen,
  famArt,
}: {
  data: DataSource;
  frozen: boolean;
  famArt?: string | null;
}) {
  const dgRef = useRef<DataGrid | null>(null);
  return (
    <div>
      <ElencoDettagli
        title={nomiSchermate.interventi.interventi}
        buttons={<AggiungiRigaButton dgRef={dgRef} frozen={frozen} />}
      >
        <DataGrid
          ref={(ref) => (dgRef.current = ref)}
          dataSource={data}
          onInitNewRow={(e) => {
            e.data.codiceTipoAttrezzatura = famArt;
          }}
          {...editModalDataGridOptions}
        >
          <Sorting mode="none" />
          <Scrolling mode="virtual" />
          {!frozen && (
            <Editing
              newRowPosition={"last"}
              confirmDelete={false}
              mode="cell"
              allowAdding={false}
              allowDeleting={true}
              allowUpdating={true}
              onChangesChange={(ev) => {
                ev.map((el) => {
                  console.log("el", el);
                  if (el.data.prezzo || el.data.qta) {
                    const rowindex = dgRef.current?.instance.getRowIndexByKey(
                      el.key
                    )!;
                    const quantita =
                      el.data.qta ??
                      dgRef.current?.instance.cellValue(rowindex, "qta");

                    const prezzo =
                      el.data.prezzo ??
                      dgRef.current?.instance.cellValue(rowindex, "prezzo");
                    console.log("rowindex quantita prezzo", rowindex);
                    el.data.netto = prezzo * quantita;
                  }
                });
              }}
            />
          )}

          <Column
            allowEditing={true}
            showEditorAlways={true}
            editCellRender={(cellInfo) => (
              <TipoAttrezzatura
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dg={dgRef}
                dataField={"codiceTipoAttrezzatura"}
              />
            )}
            dataField={"codiceTipoAttrezzatura"}
            width={200}
            caption="TIPO ATTREZZATURA"
          ></Column>
          <Column
            allowEditing={true}
            width={200}
            showEditorAlways={true}
            editCellRender={(cellInfo) => (
              <TipoIntervento
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dg={dgRef}
                dataField={"idTipoIntervento"}
              />
            )}
            dataField={"idTipoIntervento"}
            caption="TIPO INTERVENTO"
          ></Column>
          <Column caption="NOTE" dataField="note" minWidth={200} />

          <Column
            allowEditing={true}
            showEditorAlways={true}
            width={200}
            editCellRender={(cellInfo) => (
              <Magazzino
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dg={dgRef}
                dataField={"codiceMagazzino"}
              />
            )}
            dataField={"codiceMagazzino"}
            caption="MAGAZZINO"
          />
          <Column
            allowEditing={true}
            showEditorAlways={true}
            width={200}
            editCellRender={(cellInfo) => (
              <Servizio
                displayMode={frozen ? "SHOW" : "EDIT"}
                cellInfo={cellInfo}
                dg={dgRef}
                dataField={"codiceServizio"}
              />
            )}
            dataField={"codiceServizio"}
            caption="SERVIZIO"
          />

          <Column dataField="qta" dataType="number" caption="QTA'" width={50} />
          <Column
            dataField="prezzo"
            dataType="number"
            caption="PREZZO"
            width={100}
          >
            <Format type="currency" precision={2} />
          </Column>
          <Column
            dataField="netto"
            dataType="number"
            caption="NETTO"
            width={100}
          >
            <Format type="currency" precision={2} />
          </Column>
        </DataGrid>
      </ElencoDettagli>
    </div>
  );
}

function Servizio({
  displayMode,
  cellInfo,
  dg,
  dataField,
}: {
  displayMode: "SHOW" | "EDIT";
  cellInfo: any;
  dg: MutableRefObject<DataGrid | null>;
  dataField: string;
}) {
  return (
    <div className="field-container">
      <div className="value">
        <ArticoloInput
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

function TipoAttrezzatura({
  displayMode,
  cellInfo,
  dg,
  dataField,
}: {
  displayMode: "SHOW" | "EDIT";
  cellInfo: any;
  dg: MutableRefObject<DataGrid | null>;
  dataField: string;
}) {
  const inputRef = useRef<any>(null);
  return (
    <div className="field-container">
      <div className="value">
        <AttrezzatureInput
          inputRef={inputRef}
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
function TipoIntervento({
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
        <TipologiaInterventoInput
          frozen={false}
          value={cellInfo.value}
          onChange={(val) =>
            handleDataGridAutocompleteOnchange({ val, dg, dataField, cellInfo })
          }
          displayMode={displayMode}
          idTipoAttrezzatura={cellInfo.data.codiceTipoAttrezzatura}
        />
      </div>
    </div>
  );
}

function Magazzino({
  displayMode,
  cellInfo,
  dg,
  dataField,
}: {
  displayMode: "SHOW" | "EDIT";
  cellInfo: any;
  dg: MutableRefObject<DataGrid | null>;
  dataField: string;
}) {
  return (
    <div className="field-container">
      <div className="value">
        <MagazzinoInput
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

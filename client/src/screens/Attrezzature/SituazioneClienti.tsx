import { useSuspenseQuery } from "@tanstack/react-query";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiFileDocumentOutline, mdiWrenchCogOutline } from "@mdi/js";
import {
  Column,
  DataGrid,
  Export,
  Format,
  Scrolling,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import FieldContainer from "../../components/form-elements/FieldContainer";
import { ClienteInput } from "../../components/form-elements/lookup-fields/ClienteInput";
import { DefaultService } from "../../services/openapi";
import ViewScreenTabs from "../../screen-templates/ViewScreenTabs";
import { Button } from "devextreme-react";
import { colors } from "../../assets/colors";
import DraggableDialog from "../../screen-templates/CustomizedDialog";
import { exportExcel } from "../../services/Export";

interface FormInterface {
  ragione_sociale: string;
  In_Uso: string;
}

export default function () {
  const [sendGet, setSendGet] = useState<boolean>(false);
  const form = useForm<FormInterface>({
    defaultValues: {
      ragione_sociale: "",
      In_Uso: "S",
    },
  });

  const ragione_sociale =
    useWatch({ control: form.control, name: "ragione_sociale" }) ?? undefined;
  const In_Uso =
    useWatch({ control: form.control, name: "In_Uso" }) ?? undefined;

  useEffect(() => {
    setSendGet(false);
  }, [ragione_sociale, In_Uso]);

  const DataGridRef = useRef<DataGrid | null>(null);

  const list1 = (
    <SituazioneMaterialeDataGrid
      DataGridRef={DataGridRef}
      ragione_sociale={ragione_sociale}
      In_Uso={In_Uso}
    />
  );
  const list2 = (
    <ListiniDataGrid
      ragione_sociale={ragione_sociale}
      DataGridRef={DataGridRef}
    />
  );
  const list3 = (
    <PrezziPersonaliDataGrid codice="100" DataGridRef={DataGridRef} />
  );
  const filtri = (
    <>
      <div>
        <div>
          <Controller
            control={form.control}
            name={"ragione_sociale"}
            render={({ field }) => (
              <FieldContainer
                label={"Nome del cliente:"}
                input={
                  <ClienteInput
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                    }}
                  ></ClienteInput>
                }
              ></FieldContainer>
            )}
          ></Controller>
        </div>
        <div>
          <Controller
            control={form.control}
            name={"In_Uso"}
            render={({ field }) => (
              <FieldContainer
                label={"Strumenti in uso:"}
                input={
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                      sx={{
                        width: 100,
                        height: 25,
                        fontSize: "12px",
                        right: "9px",
                        borderRadius: "2px",
                        fontWeight: "bold",
                      }}
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                    >
                      <MenuItem
                        value={"S"}
                        sx={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        SI
                      </MenuItem>
                      <MenuItem
                        value={"N"}
                        sx={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        NO
                      </MenuItem>
                      <MenuItem
                        value={"SN"}
                        sx={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        TUTTI
                      </MenuItem>
                    </Select>
                  </FormControl>
                }
              ></FieldContainer>
            )}
          ></Controller>
        </div>
        <div style={{ justifyContent: "flex-start", display: "flex" }}>
          <Button
            onClick={() => {
              setSendGet(true);
            }}
            stylingMode="outlined"
            height={20}
            style={{ backgroundColor: colors.azzurro }}
          >
            <p
              style={{
                color: "white",
                flex: 1,
                fontSize: "13px",
                fontFamily: "Open Sans",
              }}
            >
              CERCA
            </p>
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <ViewScreenTabs
        name="Situazioni Clienti"
        list1={list1}
        list2={list2}
        list3={list3}
        filtri={filtri}
        sendGet={sendGet}
        DataGridRef={DataGridRef}
      />
    </>
  );
}

function SituazioneMaterialeDataGrid({
  DataGridRef,
  ragione_sociale,
  In_Uso,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  ragione_sociale: string;
  In_Uso: string;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["situazioniMaterialiList", ragione_sociale, In_Uso],
    queryFn: () =>
      DefaultService.situazioneMaterialiControllerList({
        ragioneSociale: ragione_sociale,
        inUso: In_Uso,
      }),
  });
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [selectedRowLista, setSelectedRowLista] = useState<any>(null);
  const [openLista, setOpenLista] = useState<boolean>(false);
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  const closeDoc = () => {
    setOpenDoc(false);
  };
  const closeLista = () => {
    setOpenLista(false);
  };
  return (
    <>
      <DataGrid
        dataSource={data}
        ref={(r) => (DataGridRef.current = r)}
        showBorders={true}
        height="100%"
        rowAlternationEnabled={true}
        onCellPrepared={(e) => {
          if (e.rowType === "header") {
            e.cellElement.style.backgroundColor = "#A9A9A9";
            e.cellElement.style.color = "white";
            e.cellElement.style.fontWeight = "bold";
            e.cellElement.style.fontSize = "12px";
          }
          if (e.rowType === "data" && e.data.age > 30) {
            e.cellElement.style.backgroundColor = "#f9f9f9";
          }
          if (e.rowType === "data" && e.data.age <= 30) {
            e.cellElement.style.backgroundColor = "#fff";
          }
        }}
        style={{
          fontSize: "10px",
          overflow: "hidden",
        }}
        keyExpr={"articolo"}
      >
        <Scrolling mode="virtual" />
        <Column
          width={50}
          cellRender={(rowData) => (
            <IconButton
              sx={{ height: 30 }}
              onClick={() => {
                setSelectedRowData(rowData.data)!!;
                setSelectedRowLista(null);
                setOpenDoc(true);
              }}
              title="STORICO DOCUMENTI"
            >
              <Icon path={mdiFileDocumentOutline} size={1} />
            </IconButton>
          )}
        />
        <Column
          width={50}
          cellRender={(rowData) => (
            <IconButton
              sx={{ height: 30 }}
              onClick={() => {
                setSelectedRowLista(rowData.data)!!;
                setSelectedRowData(null);
                setOpenLista(true);
              }}
              title="LISTA INTERVENTI"
            >
              <Icon path={mdiWrenchCogOutline} size={1} />
            </IconButton>
          )}
        />
        <Column
          dataField="articolo"
          caption="ARTICOLO"
          alignment="center"
          width={100}
        />
        <Column
          dataField="descrizione_articolo"
          caption="DESC"
          alignment="center"
        />
        <Column
          dataField="matricola_fornitore"
          caption="MAT FOR"
          alignment="center"
          width={100}
        />
        <Column
          dataField="matricola_interna"
          caption="MAT IN"
          alignment="center"
          width={100}
        />
        <Column
          dataField="giorniUtilizzoInUso"
          caption="GG IN USO"
          alignment="center"
          width={80}
        />
        <Column
          dataField="importo_acquisto"
          caption="IMPORTO"
          alignment="center"
          width={100}
        >
          <Format type="currency" precision={2} />
        </Column>
        <Column
          dataField="nr_doc_consegna"
          caption="NR DOC"
          alignment="center"
          width={80}
        />
        <Column
          dataField="alfa_doc_consegna"
          caption="ALFA DOC"
          alignment="center"
          width={100}
        />
        <Column
          dataField="data_doc_consegna"
          caption="DATA CONSEGNA"
          dataType="date"
          format="dd/MM/yyyy"
          alignment="center"
          width={150}
        />
        <Column
          dataField="In_Uso"
          caption="IN USO"
          alignment="center"
          width={80}
        />
        <Column
          dataField="ragione_sociale"
          caption="RAG SOC"
          alignment="center"
        />
        <Summary>
          <TotalItem
            column="importo_acquisto"
            summaryType="sum"
            valueFormat="currency"
          />
        </Summary>
      </DataGrid>
      {selectedRowData && (
        <div>
          <DraggableDialog
            list={
              <MaterialiDocTutti
                matricola_interna={selectedRowData.matricola_interna}
                DataGridRef={DataGridRef}
              />
            }
            isOpen={openDoc}
            close={closeDoc}
            DataGridRef={DataGridRef}
            sendGet={true}
            name="STORICO DOCUMENTI ATTREZZATURA"
          />
        </div>
      )}
      {selectedRowLista && (
        <div>
          <DraggableDialog
            list={
              <ListaInterventiDataGrid
                DataGridRef={DataGridRef}
                matricola={selectedRowLista.matricola_interna}
              />
            }
            close={closeLista}
            isOpen={openLista}
            DataGridRef={DataGridRef}
            sendGet={true}
            name="LISTA INTERVENTI ESEGUITI SU ATTREZZATURA"
          />
        </div>
      )}
    </>
  );
}

function MaterialiDocTutti({
  matricola_interna,
  DataGridRef,
}: {
  matricola_interna: string;
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["materialiDocTuttiControllerList", matricola_interna],
    queryFn: () =>
      DefaultService.materialiDocTuttiControllerList({
        mtcodmat: matricola_interna,
      }),
  });
  return (
    <>
      <DataGrid
        dataSource={data}
        ref={(r) => (DataGridRef.current = r)}
        keyExpr={"MTKEYSAL"}
        showBorders={true}
        height="100%"
        width="100%"
        rowAlternationEnabled={true}
        onCellPrepared={(e) => {
          if (e.rowType === "header") {
            e.cellElement.style.backgroundColor = "#A9A9A9";
            e.cellElement.style.color = "white";
            e.cellElement.style.fontWeight = "bold";
            e.cellElement.style.fontSize = "12px";
          }
          if (e.rowType === "data" && e.data.age > 30) {
            e.cellElement.style.backgroundColor = "#f9f9f9";
          }
          if (e.rowType === "data" && e.data.age <= 30) {
            e.cellElement.style.backgroundColor = "#fff";
          }
        }}
        style={{
          fontSize: "10px",
          overflow: "hidden",
        }}
      >
        <Column dataField="MTKEYSAL" caption="ARTICOLO" alignment="center" />
        <Column dataField="MTCODMAT" caption="MATRICOLA" alignment="center" />
        <Column dataField="MVTIPDOC" caption="TIPO DOC" alignment="center" />
        <Column dataField="MVNUMDOC" caption="NUMERO DOC" alignment="center" />
        <Column
          dataField="MVDATDOC"
          caption="DATA DOC"
          dataType="date"
          format="dd/MM/yyyy"
          alignment="center"
        />
        <Column
          dataField="MVNUMFAT"
          caption="NUMERO FATTURA"
          alignment="center"
        />
        <Column dataField="ANDESCRI" caption="RAG SOC" alignment="center" />
        <Column
          dataField="magazzino_carico"
          caption="CARICO"
          alignment="center"
        />
        <Column
          dataField="magazzino_scarico"
          caption="SCARICO"
          alignment="center"
        />
        <Column dataField="TDDESDOC" caption="DESC DOC" alignment="center" />
      </DataGrid>
    </>
  );
}

function ListaInterventiDataGrid({
  matricola,
  DataGridRef,
}: {
  matricola: string;
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["listaInterventiControllerGetByMatricola", matricola],
    queryFn: () =>
      DefaultService.listaInterventiControllerGetByMatricola({ matricola }),
  });
  return (
    <>
      <DataGrid
        dataSource={data}
        ref={(r) => (DataGridRef.current = r)}
        keyExpr={"numero"}
        showBorders={true}
        height="100%"
        width="100%"
        rowAlternationEnabled={true}
        onCellPrepared={(e) => {
          if (e.rowType === "header") {
            e.cellElement.style.backgroundColor = "#A9A9A9";
            e.cellElement.style.color = "white";
            e.cellElement.style.fontWeight = "bold";
            e.cellElement.style.fontSize = "12px";
          }
          if (e.rowType === "data" && e.data.age > 30) {
            e.cellElement.style.backgroundColor = "#f9f9f9";
          }
          if (e.rowType === "data" && e.data.age <= 30) {
            e.cellElement.style.backgroundColor = "#fff";
          }
        }}
        style={{
          fontSize: "10px",
          overflow: "hidden",
        }}
      >
        <Column
          dataField="numero"
          caption="NUM"
          width={50}
          alignment="center"
        ></Column>
        <Column
          dataField="dataEsecuzione"
          dataType="date"
          caption="DATA"
          format="dd/MM/yyyy"
          alignment="center"
        ></Column>
        <Column
          dataField="internoEsterno"
          caption="I/E"
          width={50}
          alignment="center"
        />
        <Column
          dataField="nomeTecnico"
          caption="NOME TECNICO"
          alignment="center"
        />
        <Column
          dataField="tipoRichiesta"
          caption="TIPO RICHIESTA"
          alignment="center"
        />
        <Column
          dataField="articolo"
          caption="ARTICOLO"
          width={80}
          alignment="center"
        />
        <Column
          dataField="matricola"
          caption="MATRICOLA"
          width={90}
          alignment="center"
        />
        <Column
          dataField="matricolaFornitore"
          caption="MATR FORN"
          width={120}
          alignment="center"
        />
        <Column
          dataField="costo"
          caption="COSTO"
          dataType="number"
          alignment="center"
        >
          <Format type="currency" precision={2} />
        </Column>
        <Column
          dataField="noteInterne"
          caption="NOTE INTERNE"
          alignment="center"
        />
        <Column
          dataField="tipoIntervento"
          caption="TIPO INTERVENTO"
          alignment="center"
        />
        <Column
          dataField="noteIntervento"
          caption="NOTE INTERVENTO"
          width={300}
          alignment="center"
        />
        <Summary>
          <TotalItem
            column="costo"
            summaryType="sum"
            valueFormat={"currency"}
          />
        </Summary>
      </DataGrid>
    </>
  );
}
function ListiniDataGrid({
  ragione_sociale,
  DataGridRef,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  ragione_sociale: string;
}) {
  const conto = useSuspenseQuery({
    queryKey: ["contiControllerGetConto", ragione_sociale],
    queryFn: () =>
      DefaultService.contiControllerGetConto({
        id: ragione_sociale,
      }),
  });
  const codice_listino = conto.data.annumlis;
  const { data } = useSuspenseQuery({
    queryKey: ["listiniControllerView", codice_listino],
    queryFn: () =>
      DefaultService.listiniControllerView({
        codice_listino,
      }),
  });
  return (
    <>
      <DataGrid
        dataSource={data}
        ref={(r) => (DataGridRef.current = r)}
        showBorders={true}
        rowAlternationEnabled={true}
        height="100%"
        onCellPrepared={(e) => {
          if (e.rowType === "header") {
            e.cellElement.style.backgroundColor = "#A9A9A9";
            e.cellElement.style.color = "white";
            e.cellElement.style.fontWeight = "bold";
            e.cellElement.style.fontSize = "12px";
          }
          if (e.rowType === "data" && e.data.age > 30) {
            e.cellElement.style.backgroundColor = "#f9f9f9";
          }
          if (e.rowType === "data" && e.data.age <= 30) {
            e.cellElement.style.backgroundColor = "#fff";
          }
        }}
        style={{
          fontSize: "10px",
          overflow: "hidden",
        }}
      >
        <Scrolling mode="infinite" />
        <Column
          dataField="codice_articolo"
          caption="COD ART"
          alignment="center"
        />
        <Column
          dataField="descrizione_articolo"
          caption="DES ART"
          alignment="center"
        />
        <Column dataField="LICODART" alignment="center" />
        <Column
          dataField="codice_listino"
          caption="COD LIST"
          alignment="center"
        />
        <Column
          dataField="descrizione_listino"
          caption="DES LIST"
          alignment="center"
        />
        <Column dataField="prezzo" caption="PREZZO" alignment="center">
          <Format type="currency" />
        </Column>
        <Column
          dataField="data_attivazione"
          dataType="date"
          format="dd/MM/yyyy"
          caption="DATA ATT"
          alignment="center"
        />
        <Column
          dataField="fine_validita"
          dataType="date"
          caption="FINE VAL"
          alignment="center"
        />
      </DataGrid>
    </>
  );
}

function PrezziPersonaliDataGrid({
  codice,
  DataGridRef,
}: {
  codice: string;
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const data = [
    { id: "1", name: "Simus" },
    { id: "2", name: "Karl" },
    { id: "3", name: "Boh" },
    { id: "5", name: "Bob" },
    { id: "6", name: "Bob" },
    { id: "7", name: "Bob" },
    { id: "8", name: "Bob" },
    { id: "9", name: "Bob" },
    { id: "10", name: "Bob" },
    { id: "11", name: "Bob" },
    { id: "12", name: "Bob" },
    { id: "13", name: "Bob" },
  ];
  return (
    <>
      <DataGrid
        dataSource={data}
        ref={(r) => (DataGridRef.current = r)}
        showBorders={true}
        rowAlternationEnabled={true}
        onCellPrepared={(e) => {
          if (e.rowType === "header") {
            e.cellElement.style.backgroundColor = "#A9A9A9";
            e.cellElement.style.color = "white";
            e.cellElement.style.fontWeight = "bold";
            e.cellElement.style.fontSize = "12px";
          }
          if (e.rowType === "data" && e.data.age > 30) {
            e.cellElement.style.backgroundColor = "#f9f9f9";
          }
          if (e.rowType === "data" && e.data.age <= 30) {
            e.cellElement.style.backgroundColor = "#fff";
          }
        }}
        style={{
          fontSize: "10px",
          overflow: "hidden",
        }}
      >
        <Scrolling mode="virtual" />
      </DataGrid>
    </>
  );
}

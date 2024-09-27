import { DataGrid } from "devextreme-react";
import React, { useEffect, useRef, useState } from "react";
import TastoModifica from "../../components/TastoModifica";
import {
  Column,
  FilterRow,
  Format,
  HeaderFilter,
  Scrolling,
  Search,
} from "devextreme-react/data-grid";
import { viewDataGridOptions } from "../../DataGridOptions";
import ViewScreen from "../../screen-templates/ViewScreen";
import { nomiSchermate } from "../../NomiSchermate";
import { DefaultService, ListaInterventiBasic } from "../../services/openapi";
import { useSuspenseQuery } from "@tanstack/react-query";
import InterventiContrattiModal from "../../edit-modals/InterventiContrattiModal";
import { useForm, useWatch } from "react-hook-form";

interface FormInterface {
  tipoAttrezzatura: string | null;
  idCliente: string | null;
  idArticolo: string | null;
  idMatricola: string | null;
}

export default function () {
  const [sendGet, setSendGet] = useState<boolean>(false);
  const form = useForm<FormInterface>({
    defaultValues: {
      tipoAttrezzatura: null,
      idCliente: null,
      idArticolo: null,
      idMatricola: null,
    },
  });
  const tipoAttrezzatura =
    useWatch({ control: form.control, name: "tipoAttrezzatura" }) ?? undefined;
  const idCliente =
    useWatch({ control: form.control, name: "idCliente" }) ?? undefined;
  const idArticolo =
    useWatch({ control: form.control, name: "idArticolo" }) ?? undefined;
  const idMatricola =
    useWatch({ control: form.control, name: "idMatricola" }) ?? undefined;

  useEffect(() => {
    setSendGet(false);
  }, [tipoAttrezzatura, idCliente, idArticolo, idMatricola]);

  useEffect(() => {
    console.log("articoloId", idArticolo);
    if (idArticolo && idArticolo?.split("****")?.length > 1) {
      console.log("set id matricola", idArticolo?.split("****")[0]);
      form.setValue("idMatricola", idArticolo?.split("****")[1]);
      form.setValue("idArticolo", idArticolo?.split("****")[0]);
    }
  }, [idArticolo]);

  const DataGridRef = useRef<DataGrid | null>(null);
  const list = <ListaInterventiDataGrid DataGridRef={DataGridRef} />;
  return (
    <ViewScreen
      name={"Lista Interventi"}
      list={list}
      editModal={InterventiContrattiModal}
      DataGridRef={DataGridRef}
      sendGet={true}
      form={form}
    />
  );
}

function ListaInterventiDataGrid({
  DataGridRef,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data: dati } = useSuspenseQuery({
    queryKey: ["listaInterventiControllerList"],
    queryFn: () => DefaultService.listaInterventiControllerList(),
  });
  const [firstRowData, setFirstRowData] = useState<ListaInterventiBasic[]>([
    dati[0],
  ]);
  localStorage.setItem("primaRiga", JSON.stringify(firstRowData[0]));
  return (
    <DataGrid
      dataSource={dati}
      ref={(r) => (DataGridRef.current = r)}
      {...viewDataGridOptions}
      onContentReady={(rowValue) =>
        rowValue.component
          .selectRowsByIndexes([0])
          .then((value) => setFirstRowData(value))
      }
    >
      <FilterRow visible={true} applyFilter={"auto"} />
      <Scrolling mode="virtual" />
      <Column
        width={26}
        cellRender={(row) => (
          <TastoModifica
            row={row}
            editModal={InterventiContrattiModal}
            name={nomiSchermate.interventi.interventi}
          />
        )}
      />

      <Column
        dataField="numero"
        caption="NUM"
        width={50}
        alignment="left"
      ></Column>
      <Column
        dataField="dataEsecuzione"
        dataType="date"
        caption="DATA"
        width={80}
        alignment="left"
      ></Column>
      <Column
        dataField="internoEsterno"
        caption="I/E"
        width={50}
        alignment="left"
      />
      <Column
        dataField="nomeTecnico"
        caption="NOME TECNICO"
        width={200}
        alignment="left"
      />
      <Column
        dataField="tipoRichiesta"
        caption="TIPO RICHIESTA"
        width={200}
        alignment="left"
      />
      <Column
        dataField="articolo"
        caption="ARTICOLO"
        width={80}
        alignment="left"
      />
      <Column
        dataField="ardesart"
        caption="DESCRIZIONE ARTICOLO"
        alignment="left"
      />
      <Column
        dataField="matricola"
        caption="MATRICOLA"
        width={90}
        alignment="left"
      />
      <Column
        dataField="matricolaFornitore"
        caption="MATR FORN"
        width={120}
        alignment="left"
      />
      <Column
        dataField="descrizione"
        caption="DESCRIZIONE INTERVENTO"
        alignment="left"
      />
      <Column
        dataField="tipoIntervento"
        caption="TIPO INTERVENTO"
        alignment="left"
      />
      <Column
        dataField="noteIntervento"
        caption="DESCRIZIONE DETTAGLI"
        width={200}
        alignment="left"
      />
      <Column
        dataField="costo"
        caption="COSTO"
        dataType="number"
        width={70}
        alignment="left"
      >
        <Format type="currency" precision={2} />
      </Column>
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

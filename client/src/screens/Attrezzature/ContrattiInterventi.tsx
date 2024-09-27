import React, { useEffect, useRef, useState } from "react";
import FieldContainer from "../../components/form-elements/FieldContainer";

import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  Scrolling,
  Search,
} from "devextreme-react/data-grid";
import { DefaultService } from "../../services/openapi";
import { useSuspenseQuery } from "@tanstack/react-query";
import "devextreme/dist/css/dx.light.css";
import ViewScreen from "../../screen-templates/ViewScreen";
import TastoModifica from "../../components/TastoModifica";
import { ClienteInput } from "../../components/form-elements/lookup-fields/ClienteInput";
import { AttrezzatureInput } from "../../components/form-elements/lookup-fields/AttrezzatureInput";
import { ArticoloInput } from "../../components/form-elements/lookup-fields/ArticoloInput";
import { Controller, useForm, useWatch } from "react-hook-form";
import { MatricolaInput } from "../../components/form-elements/lookup-fields/MatricolaInput";
import interventiContrattiModal from "../../edit-modals/InterventiContrattiModal";
import Nuovo from "../../components/Nuovo";
import { viewDataGridOptions } from "../../DataGridOptions";
import { nomiSchermate } from "../../NomiSchermate";

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
  const list = (
    <ContrattiInterventoDataGrid
      DataGridRef={DataGridRef}
      tipoAttrezzatura={tipoAttrezzatura}
      idCliente={idCliente}
      idMatricola={idMatricola}
      idArticolo={idArticolo}
    />
  );
  const filtri = (
    <>
      <Controller
        control={form.control}
        name={"tipoAttrezzatura"}
        render={({ field }) => (
          <FieldContainer
            label={"Tipo Attrezzatura:"}
            input={
              <AttrezzatureInput
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            }
          />
        )}
      />

      <Controller
        control={form.control}
        name={"idCliente"}
        render={({ field }) => (
          <FieldContainer
            label={"Cliente:"}
            input={
              <ClienteInput
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            }
          />
        )}
      />

      <Controller
        control={form.control}
        name={"idArticolo"}
        render={({ field }) => (
          <FieldContainer
            label={"Articolo:"}
            input={
              <ArticoloInput
                value={field.value}
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
            label={"Matricola:"}
            input={
              <MatricolaInput
                form={form}
                articoloFieldName={"idArticolo"}
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            }
          />
        )}
      />
      <div style={{ justifyContent: "flex-end", display: "flex" }}>
        <Nuovo onClick={() => setSendGet(true)} title="OK"></Nuovo>
      </div>
    </>
  );
  return (
    <ViewScreen
      name={nomiSchermate.interventi.interventi}
      list={list}
      editModal={interventiContrattiModal}
      filtri={filtri}
      DataGridRef={DataGridRef}
      sendGet={sendGet}
      form={form}
    />
  );
}

function ContrattiInterventoDataGrid({
  DataGridRef,
  tipoAttrezzatura,
  idCliente,
  idMatricola,
  idArticolo,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  tipoAttrezzatura: string | undefined;
  idCliente: string | undefined;
  idMatricola: string | undefined;
  idArticolo: string | undefined;
}) {
  const { data } = useSuspenseQuery({
    queryKey: [
      "interventiMasterControllerList",
      tipoAttrezzatura,
      idCliente,
      idMatricola,
      idArticolo,
    ],
    queryFn: () =>
      DefaultService.interventiMasterControllerList({
        tipoAttrezzatura,
        idCliente,
        idArticolo,
        idMatricola,
      }),
  });
  return (
    <DataGrid
      dataSource={data}
      ref={(r) => (DataGridRef.current = r)}
      {...viewDataGridOptions}
    >
      <FilterRow visible={true} applyFilter={"auto"} />
      <Scrolling mode="virtual" />
      <Column
        width={50}
        cellRender={(row) => (
          <TastoModifica
            row={row}
            editModal={interventiContrattiModal}
            name={nomiSchermate.interventi.interventi}
          />
        )}
      />
      <Column dataField="numero" caption="NUMERO" width={80}></Column>
      <Column
        dataField="dataEsecuzione"
        dataType="date"
        format={"dd/MM/yyyy"}
        caption="DATA ESECUZIONE"
      ></Column>

      <Column
        dataField="dataInserimento"
        dataType="date"
        format={"dd/MM/yyyy"}
        caption="DATA INSERIMENTO"
      ></Column>
      <Column dataField="codiceArticolo" caption="ARTICOLO" />
      <Column dataField="articolo.ardesart" caption="DESCRIZIONE ARTICOLO" />
      <Column dataField="conto.andescri" caption="CLIENTE" />
      <Column dataField="codiceMatricola" caption="MATRICOLA" />

      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

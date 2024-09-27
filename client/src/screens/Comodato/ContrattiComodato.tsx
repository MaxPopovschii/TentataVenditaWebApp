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
import { CheckBox } from "devextreme-react/check-box";

import { DefaultService } from "../../services/openapi";
import { useSuspenseQuery } from "@tanstack/react-query";
import "devextreme/dist/css/dx.light.css";
import ViewScreen from "../../screen-templates/ViewScreen";
import TastoModifica from "../../components/TastoModifica";
import { ClienteInput } from "../../components/form-elements/lookup-fields/ClienteInput";
import { Controller, useForm, useWatch } from "react-hook-form";
import Nuovo from "../../components/Nuovo";
import { DestinazioneInput } from "../../components/form-elements/lookup-fields/DestinazioneInput";
import ComodatoContrattiModal from "../../edit-modals/ComodatoContrattiModal";
import { viewDataGridOptions } from "../../DataGridOptions";
import { nomiSchermate } from "../../NomiSchermate";
import { MatricolaInput } from "../../components/form-elements/lookup-fields/MatricolaInput";
import { ArticoloInput } from "../../components/form-elements/lookup-fields/ArticoloInput";

interface FormInterface {
  codiceArticolo: string | null;
  idMatricola: string | null;
  idCliente: string | null;
  idDestinazione: string | null;
  alsoClosed: boolean | null;
}

export default function () {
  const [sendGet, setSendGet] = useState<boolean>(false);
  const form = useForm<FormInterface>({
    defaultValues: {
      codiceArticolo: null,
      idCliente: null,
      idDestinazione: null,
      alsoClosed: false,
      idMatricola: null,
    },
  });

  const idCliente =
    useWatch({ control: form.control, name: "idCliente" }) ?? undefined;
  const codiceArticolo =
    useWatch({ control: form.control, name: "codiceArticolo" }) ?? undefined;
  const idMatricola =
    useWatch({ control: form.control, name: "idMatricola" }) ?? undefined;
  const idDestinazione =
    useWatch({ control: form.control, name: "idDestinazione" }) ?? undefined;
  const alsoClosed =
    useWatch({ control: form.control, name: "alsoClosed" }) ?? undefined;

  useEffect(() => {
    setSendGet(false);
  }, [idDestinazione, idCliente, alsoClosed, idMatricola, codiceArticolo]);
  useEffect(() => {
    console.log("articoloId", codiceArticolo);
    if (codiceArticolo && codiceArticolo?.split("****")?.length > 1) {
      console.log("set id matricola", codiceArticolo?.split("****")[0]);
      form.setValue("idMatricola", codiceArticolo?.split("****")[1]);
      form.setValue("codiceArticolo", codiceArticolo?.split("****")[0]);
    }
  }, [codiceArticolo]);

  const DataGridRef = useRef<DataGrid | null>(null);
  const list = (
    <ContrattiComodatoDataGrid
      DataGridRef={DataGridRef}
      idDestinazione={idDestinazione}
      idCliente={idCliente}
      alsoClosed={alsoClosed}
      idMatricola={idMatricola}
      codiceArticolo={codiceArticolo}
    />
  );
  const filtri = (
    <>
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
        name={"idDestinazione"}
        render={({ field }) => (
          <FieldContainer
            label={"Destinazione:"}
            input={
              <DestinazioneInput
                contoFieldName="idCliente"
                form={form}
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            }
          />
        )}
      />
      <Controller
        control={form.control}
        name={"codiceArticolo"}
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
                articoloFieldName={"codiceArticolo"}
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            }
          />
        )}
      />
      <Controller
        control={form.control}
        name={"alsoClosed"}
        render={({ field }) => (
          <FieldContainer
            label={"Anche contratti chiusi:"}
            input={
              <CheckBox
                value={alsoClosed}
                onValueChanged={(val) => field.onChange(val.value)}
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
      name={nomiSchermate.comodato.contratti}
      list={list}
      sendGet={sendGet}
      editModal={ComodatoContrattiModal}
      filtri={filtri}
      DataGridRef={DataGridRef}
    />
  );
}

function ContrattiComodatoDataGrid({
  DataGridRef,
  idCliente,
  idDestinazione,
  alsoClosed,
  codiceArticolo,
  idMatricola,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  idDestinazione: string | undefined;
  idCliente: string | undefined;
  alsoClosed: boolean | undefined;
  codiceArticolo: string | undefined;
  idMatricola: string | undefined;
}) {
  const { data } = useSuspenseQuery({
    queryKey: [
      "contrattiComodato",
      idDestinazione,
      idCliente,
      alsoClosed,
      idMatricola,
      codiceArticolo,
    ],
    queryFn: () =>
      DefaultService.comodatoContrattiControllerList({
        alsoClosed,
        idCliente,
        idDestinazione,
        idMatricola,
        codiceArticolo,
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
            editModal={ComodatoContrattiModal}
            name={"Contratti Comodato"}
          />
        )}
      />
      <Column
        dataField="numero"
        caption="NUMERO"
        width={80}
        alignment="center"
      ></Column>
      <Column
        dataField="dataContratto"
        dataType="date"
        caption="DATA CONTRATTO"
        alignment="center"
      ></Column>
      <Column
        dataField="dataAttivazioneContratto"
        dataType="date"
        caption="DATA ATTIVAZIONE CONTRATTO"
        alignment="center"
      ></Column>
      <Column
        dataField="dataChiusuraContratto"
        dataType="date"
        caption="DATA CHIUSURA CONTRATTO"
        alignment="center"
      ></Column>
      <Column dataField="conto.andescri" caption="CLIENTE" alignment="center" />
      <Column dataField="note" caption="NOTE" alignment="center" />
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

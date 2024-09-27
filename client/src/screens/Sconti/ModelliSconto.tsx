import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  Scrolling,
  Search,
} from "devextreme-react/data-grid";

import { useSuspenseQuery } from "@tanstack/react-query";
import { DefaultService } from "../../services/openapi";
import ModelliScontoModal from "../../edit-modals/ModelliScontoModal";
import React, { useRef } from "react";
import ViewScreen from "../../screen-templates/ViewScreen";
import TastoModifica from "../../components/TastoModifica";
import { viewDataGridOptions } from "../../DataGridOptions";
import { nomiSchermate } from "../../NomiSchermate";

export default function () {
  const DataGridRef = useRef<DataGrid | null>(null);
  const list = <ModelliScontoDataGrid DataGridRef={DataGridRef} />;

  return (
    <>
      <ViewScreen
        name={nomiSchermate.sconti.modelli}
        sendGet={true}
        list={list}
        editModal={ModelliScontoModal}
        DataGridRef={DataGridRef}
      />
    </>
  );
}

function ModelliScontoDataGrid({
  DataGridRef,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data: dati } = useSuspenseQuery({
    queryKey: ["scontiModelliControllerList"],
    queryFn: () => DefaultService.scontiModelliControllerList(),
  });

  return (
    <DataGrid dataSource={dati} ref={DataGridRef} {...viewDataGridOptions}>
      <FilterRow visible={true} applyFilter={"auto"} />
      <Scrolling mode="virtual" />
      <Column
        width={50}
        cellRender={(row) => (
          <TastoModifica
            row={row}
            editModal={ModelliScontoModal}
            name={nomiSchermate.sconti.modelli}
          />
        )}
      />
      <Column dataField="ID" width={140} caption="CODICE"></Column>
      <Column
        dataField="descrizione"
        width={300}
        caption="DESCRIZIONE"
      ></Column>
      <Column dataField="tipoSconto" caption="TIPO DI SCONTO" />
      <Column dataField="scontaValoreMerce" caption="VALORE/MERCE" />
      <Column
        dataField="nrMesiBaseCalcolo"
        dataType="number"
        caption="NR MESI"
      />
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

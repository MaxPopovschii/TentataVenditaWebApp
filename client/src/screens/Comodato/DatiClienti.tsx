import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  Scrolling,
  Search,
} from "devextreme-react/data-grid";
import React, { useRef } from "react";
import ViewScreen from "../../screen-templates/ViewScreen";
import TastoModifica from "../../components/TastoModifica";

import { viewDataGridOptions } from "../../DataGridOptions";
import DatiClientiModal from "../../edit-modals/DatiClientiModal";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DefaultService } from "../../services/openapi";

export default function () {
  const DataGridRef = useRef<DataGrid | null>(null);
  const list = <DatiClientiDataGrid DataGridRef={DataGridRef} />;

  return (
    <>
      <ViewScreen
        name={"Dati clienti"}
        list={list}
        sendGet={true}
        editModal={DatiClientiModal}
        DataGridRef={DataGridRef}
      />
    </>
  );
}

function DatiClientiDataGrid({
  DataGridRef,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["clienti"],
    queryFn: () => DefaultService.clientiControllerGet(),
  });

  return (
    <DataGrid
      dataSource={data}
      ref={DataGridRef}
      {...viewDataGridOptions}
      keyExpr={"codiceConto"}
    >
      <FilterRow visible={true} applyFilter={"auto"} />
      <Scrolling mode="virtual" />
      <Column
        width={50}
        cellRender={(row) => (
          <TastoModifica
            row={row}
            editModal={DatiClientiModal}
            name={"Dati clienti"}
          />
        )}
      />
      <Column
        dataField="tipoConto"
        minWidth={30}
        width={90}
        caption="TIPO CONTO"
        dataType="number"
        alignment="left"
      ></Column>
      <Column
        dataField="codiceConto"
        minWidth={150}
        caption="CODICE CONTO"
        alignment="left"
      ></Column>

      <Column
        dataField="consumoMin"
        minWidth={50}
        width={90}
        caption="CONSUMO MIN"
        dataType="number"
        alignment="left"
      ></Column>
      <Column
        minWidth={150}
        dataField="consumoMinCaffe"
        caption="CONSUMO MIN CAFFE"
        dataType="number"
        alignment="left"
      />
      <Column
        minWidth={150}
        dataField="raggruppaPerSede"
        caption="RAGGRUPPA PER SEDE"
        alignment="left"
      ></Column>
      <Column
        minWidth={150}
        dataField="forzaUnicoPagamento"
        caption="FORZA UNICO PAGAMENTO"
        alignment="left"
      ></Column>
      <Column
        minWidth={150}
        dataField="ragioneSocialeCorta"
        caption="RAGIONE SOCIALE x CONTRATTI"
        alignment="left"
      ></Column>
      <Column
        minWidth={150}
        dataField="ragSocBI"
        caption="RAGIONE SOCIALE x BI"
        alignment="left"
      ></Column>
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

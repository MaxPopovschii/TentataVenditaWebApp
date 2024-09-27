import {
  Column,
  DataGrid,
  FilterRow,
  Format,
  HeaderFilter,
  Scrolling,
  Search,
} from "devextreme-react/data-grid";
import { useSuspenseQuery } from "@tanstack/react-query";

import { DefaultService } from "../../services/openapi";
import React, { useRef } from "react";
import ViewScreen from "../../screen-templates/ViewScreen";
import TastoModifica from "../../components/TastoModifica";

import TipologieInterventoModal from "../../edit-modals/TipologieInterventoModal";
import { viewDataGridOptions } from "../../DataGridOptions";
import { nomiSchermate } from "../../NomiSchermate";

export default function () {
  const DataGridRef = useRef<DataGrid | null>(null);
  const list = <TipologieInterventoDataGrid DataGridRef={DataGridRef} />;

  return (
    <>
      <ViewScreen
        name={nomiSchermate.interventi.tipologie}
        list={list}
        sendGet={true}
        editModal={TipologieInterventoModal}
        DataGridRef={DataGridRef}
      />
    </>
  );
}

function TipologieInterventoDataGrid({
  DataGridRef,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data: dati } = useSuspenseQuery({
    queryKey: ["tipologieInterventoControllerList"],
    queryFn: () => DefaultService.tipologieInterventoControllerList(),
  });

  return (
    <DataGrid
      dataSource={dati}
      ref={DataGridRef}
      {...viewDataGridOptions}
      onInitNewRow={(d) => {
        d.data = { tipoAttrezzatura: null };
      }}
    >
      <FilterRow visible={true} applyFilter={"auto"} />
      <Scrolling mode="virtual" />
      <Column
        width={50}
        cellRender={(row) => (
          <TastoModifica
            row={row}
            editModal={TipologieInterventoModal}
            name={nomiSchermate.interventi.tipologie}
          />
        )}
      />
      <Column
        dataField="tipoAttrezzatura"
        minWidth={150}
        caption="TIPO ATTREZZATURA"
      ></Column>
      <Column
        dataField="famArti.fadescri"
        minWidth={150}
        caption="DESCRIZIONE ATTREZZATURA"
      ></Column>

      <Column
        dataField="tipoIntervento"
        minWidth={150}
        caption="TIPO INTERVENTO"
      ></Column>
      <Column minWidth={150} dataField="descrizione" caption="DESCRIZIONE" />
      <Column
        minWidth={150}
        dataField="costo"
        dataType="number"
        caption="COSTO"
      >
        <Format type="currency" precision={2} />
      </Column>
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

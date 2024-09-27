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
import ScontiMaturatiModal from "../../edit-modals/ScontiMaturatiModal";
import { viewDataGridOptions } from "../../DataGridOptions";
import { nomiSchermate } from "../../NomiSchermate";

export default function () {
  const DataGridRef = useRef<DataGrid | null>(null);
  const list = <ScontiMaturatiDataGrid DataGridRef={DataGridRef} />;

  return (
    <>
      <ViewScreen
        name={nomiSchermate.sconti.maturati}
        sendGet={true}
        list={list}
        editModal={ScontiMaturatiModal}
        DataGridRef={DataGridRef}
      />
    </>
  );
}

function ScontiMaturatiDataGrid({
  DataGridRef,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data: dati } = useSuspenseQuery({
    queryKey: ["scontiMaturatiControllerList"],
    queryFn: () => DefaultService.scontiMaturatiControllerList(),
  });

  return (
    <div style={{ minWidth: 900, height: "100%" }}>
      <DataGrid dataSource={dati} ref={DataGridRef} {...viewDataGridOptions}>
        <FilterRow visible={true} applyFilter={"auto"} />
        <Scrolling mode="virtual" />
        <Column
          cellRender={(row) => (
            <TastoModifica
              row={row}
              editModal={ScontiMaturatiModal}
              name={nomiSchermate.sconti.maturati}
            />
          )}
          width={50}
        />
        <Column dataField="nrContratto" caption="NUMERO CONTRATTO"></Column>
        <Column dataField="rigaContratto" caption="RIGA CONTRATTO"></Column>
        <Column dataField="dataDoc" dataType="date" caption="DATA DOCUMENTO" />
        <Column dataField="conto.andescri" caption="CLIENTE" />
        <Column dataField="articolo.ardesart" caption="ARTICOLO" />
        <Column
          dataField="gruppoMerc"
          dataType="number"
          caption="GRUPPO MERCEOLOGICO"
        />
        <Column dataField="importoDoc" caption="IMPORTO DOCUMENTO">
          <Format type="currency" precision={2} />
        </Column>
        <Column
          dataField="importoSconto"
          dataType="number"
          caption="IMPORTO SCONTO"
        >
          <Format type="currency" precision={2} />
        </Column>
        <Column
          dataField="qtaSconto"
          dataType="number"
          caption="QUANTITA' SCONTO"
        />
        <HeaderFilter>
          <Search enabled={true} />
        </HeaderFilter>
      </DataGrid>
    </div>
  );
}

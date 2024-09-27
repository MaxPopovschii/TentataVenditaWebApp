import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  Scrolling,
  Search,
} from "devextreme-react/data-grid";
import React, { useEffect, useRef, useState } from "react";
import ViewScreen from "../../screen-templates/ViewScreen";
import TastoModifica from "../../components/TastoModifica";

import { viewDataGridOptions } from "../../DataGridOptions";
import TecniciModal from "../../edit-modals/TecniciModal";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DefaultService } from "../../services/openapi";
import { isItemsArray } from "devextreme/common/data/custom-store";

export default function () {
  const DataGridRef = useRef<DataGrid | null>(null);
  const list = <TecniciDataGrid DataGridRef={DataGridRef} />;

  return (
    <>
      <ViewScreen
        name={"Tecnici"}
        list={list}
        sendGet={true}
        editModal={TecniciModal}
        DataGridRef={DataGridRef}
      />
    </>
  );
}

function TecniciDataGrid({
  DataGridRef,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["Tecnici"],
    queryFn: () => DefaultService.tecniciControllerList(),
  });
  //#MARTELLATA: il codiceFornitore non si sa per quale motivo era una stringa contenente un array json serializzato con [tipo,codice]
  //            quindi, lo deserializziamo e prendiamo il secondo valore che corrisponde al vero codiceFornitore
  //            NB: non tutti gli elementi di data, hanno il campo 'CodiceFornitore' popolato così: alcusi si, altri sono vuoti, e altri sono popolati correttamente
  for (let i = 0; i < data.length; i++) {
    let t = data[i];
    try {
      let parsered = JSON.parse(t.codiceFornitore);
      if (parsered.constructor == Array && (parsered.length ?? 0) > 1)
        t.codiceFornitore = parsered[1];
    } catch (err) {}
  }
  return (
    <DataGrid
      dataSource={data}
      ref={DataGridRef}
      {...viewDataGridOptions}
      keyExpr={"codice"}
    >
      <FilterRow visible={true} applyFilter={"auto"} />
      <Scrolling mode="virtual" />
      <Column
        width={50}
        cellRender={(row) => (
          <TastoModifica row={row} editModal={TecniciModal} name={"Tecnici"} />
        )}
      />
      <Column
        dataField="codice"
        caption="CODICE"
        dataType="string"
        alignment="left"
      ></Column>
      <Column
        dataField="descrizione"
        caption="DESCRIZIONE"
        alignment="left"
      ></Column>

      <Column dataField="tipo" caption="TIPO" alignment="left"></Column>
      <Column
        dataField="codiceFornitore"
        caption="CODICE FORNITORE"
        alignment="left"
      />
      <Column
        dataField="magazzino"
        caption="MAGAZZINO"
        alignment="left"
      ></Column>
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

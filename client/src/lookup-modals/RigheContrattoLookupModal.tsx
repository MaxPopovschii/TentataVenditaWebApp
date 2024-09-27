import React from "react";

import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  Scrolling,
  Search,
  Selection,
} from "devextreme-react/data-grid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DefaultService } from "../services/openapi";
import NiceModal from "@ebay/nice-modal-react";
import { LookupModal } from "../screen-templates/LookupModal";

export default () =>
  NiceModal.create((props: { idContratto: string }) => (
    <RigheContrattoModal {...props} />
  ));

function RigheContrattoModal(props: { idContratto: string }) {
  return (
    <LookupModal
      name={"Righe del contratto " + props.idContratto}
      renderGrid={(renderProps) => (
        <RigheContrattoScontoDataGrid {...props} {...renderProps} />
      )}
    />
  );
}
function RigheContrattoScontoDataGrid({
  idContratto,
  onSelect,
}: {
  idContratto: string;
  onSelect: (ID: string | null) => void;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["scontiContrattiControllerGetRigheContratto", idContratto],
    queryFn: () =>
      DefaultService.scontiContrattiControllerGetRigheContratto({
        id: idContratto,
      }),
  });
  const onSelectionChanged = (evt) => {
    onSelect(evt.selectedRowKeys[0] ?? null);
  };
  return (
    <DataGrid
      height="100%"
      dataSource={data}
      allowColumnResizing={true}
      keyExpr="ID"
      showBorders={false}
      className="my-grid"
      onSelectionChanged={onSelectionChanged}
    >
      <Selection mode="single" />
      <FilterRow visible={true} applyFilter={"auto"} />
      <Scrolling mode="virtual" />
      <Column dataField="humanReadableID" width={140} caption="Riga" />
      <Column dataField="codiceGruppoMerc" caption="Gruppo merc." />
      <Column dataField="codiceArticolo" caption="Cod. art." />
      <Column dataField="articolo.ardesart" caption="Articolo" />
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

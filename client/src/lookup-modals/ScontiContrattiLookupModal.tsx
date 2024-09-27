import React, { Suspense } from "react";

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
  NiceModal.create((props: { contoId: string }) => (
    <ContrattoScontoModal {...props} />
  ));

function ContrattoScontoModal(props: { contoId: string }) {
  return (
    <LookupModal
      name={
        <Suspense>
          <ModalName contoId={props.contoId} />
        </Suspense>
      }
      renderGrid={(renderProps) => (
        <ContrattoScontoDataGrid {...props} {...renderProps} />
      )}
    />
  );
}

function ModalName({ contoId }: { contoId: string }) {
  const { data: conto } = useSuspenseQuery({
    queryKey: ["contiControllerGetConto", contoId],
    queryFn: () => DefaultService.contiControllerGetConto({ id: contoId }),
  });
  return (
    <>
      {"Contratti di sconto del cliente " +
        conto.humanReadableID +
        " " +
        conto.andescri}
    </>
  );
}

function ContrattoScontoDataGrid({
  contoId,
  onSelect,
}: {
  contoId: string;
  onSelect: (ID: string | null) => void;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["scontiContrattiControllerGetSearchContrattiByConto", contoId],
    queryFn: () =>
      DefaultService.scontiContrattiControllerGetSearchContrattiByConto({
        id: contoId,
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
      <Column dataField="humanReadableID" width={140} caption="Nr contratto" />
      <Column dataField="descrizione" caption="DESCRIZIONE" />
      <Column
        dataField="dataChiusura"
        dataType="date"
        caption="DATA CHIUSURA"
      />
      <Column dataField="importoScontareMax" caption="IMPORTO MAX" />
      <Column dataField="importoScontareErogato" caption="IMPORTO EROGATA" />
      <Column dataField="importoScontareResiduo" caption="IMPORTO RESIDUO" />
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

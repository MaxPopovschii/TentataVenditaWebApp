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
  NiceModal.create((props: { contoId: string; causali: string[] | null }) => (
    <DocMastModal {...props} />
  ));

function DocMastModal(props: { contoId: string; causali: string[] | null }) {
  return (
    <LookupModal
      name={
        <Suspense>
          <ModalName contoId={props.contoId} />
        </Suspense>
      }
      renderGrid={(renderProps) => (
        <DocMastModalDataGrid {...props} {...renderProps} />
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
      {"Documenti del cliente " + conto.humanReadableID + " " + conto.andescri}
    </>
  );
}

function DocMastModalDataGrid({
  contoId,
  onSelect,
  causali,
}: {
  contoId: string;
  onSelect: (ID: string | null) => void;
  causali: string[] | null;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["scontiContrattiControllerGetSearchContrattiByConto", contoId],
    queryFn: () =>
      DefaultService.docControllerGetDocByConto({
        id: contoId,
        causali: causali?.join(",") ?? null,
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
      <Column dataField="tipoDoc.tddesdoc" caption="TIPO DOCUMENTO" />
      <Column dataField="mvnumfat" caption="NR. ESTERNO" />
      <Column dataField="mvnumdoc" caption="NR. DOC" alignment="left" />
      <Column dataField="mvalfdoc" caption="SERIE" />
      <Column dataField="mvdatdoc" caption="DATA" dataType="date" />
      <Column dataField="conto.andescri" caption="CLIENTE" />
      <Column dataField="destinazione.ddnomdes" caption="DESTINAZIONE" />
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

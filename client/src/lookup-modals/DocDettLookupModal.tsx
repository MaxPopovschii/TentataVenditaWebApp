import React, { Suspense } from "react";

import {
  Column,
  DataGrid,
  FilterRow,
  Format,
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
  NiceModal.create((props: { docId: string }) => <DocDettModal {...props} />);

function DocDettModal(props: { docId: string }) {
  return (
    <LookupModal
      name={
        <Suspense>
          <ModalName docId={props.docId} />
        </Suspense>
      }
      renderGrid={(renderProps) => (
        <DocDettModalDataGrid {...props} {...renderProps} />
      )}
    />
  );
}

function ModalName({ docId }: { docId: string }) {
  const { data: conto } = useSuspenseQuery({
    queryKey: ["docControllerGet", docId],
    queryFn: () => DefaultService.docControllerGet({ id: docId }),
  });
  return <>{"Righe del documento " + conto.humanReadableID}</>;
}

function DocDettModalDataGrid({
  docId,
  onSelect,
}: {
  docId: string;
  onSelect: (ID: string | null) => void;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["scontiContrattiControllerGetSearchContrattiByConto", docId],
    queryFn: () =>
      DefaultService.docControllerGetDettagiDoc({
        id: docId,
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
      <Column dataField="cproword" caption="RIGA" />
      <Column dataField="articolo.ID" caption="ARTICOLO" />
      <Column dataField="mvdesart" caption="DESCRIZIONE" alignment="left" />
      <Column dataField="mvunimis" caption="UM" />
      <Column dataField="mvqtamov" caption="QTA" />
      <Column dataField="mvprezzo" caption="PREZZO">
        <Format type="currency" precision={2} />
      </Column>
      <Column dataField="destinazione.ddnomdes" caption="NETTO">
        <Format type="currency" precision={2} />
      </Column>
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

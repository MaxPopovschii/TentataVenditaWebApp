import React, { Suspense, useRef, useState } from "react";
import FieldContainer from "../../components/form-elements/FieldContainer";
import {
  Column,
  DataGrid,
  FilterRow,
  Format,
  HeaderFilter,
  Scrolling,
  Search,
} from "devextreme-react/data-grid";
import { CheckBox } from "devextreme-react/check-box";
import { DefaultService } from "../../services/openapi";
import { useSuspenseQuery } from "@tanstack/react-query";
import "devextreme/dist/css/dx.light.css";
import { ScontoModelliInput } from "../../components/form-elements/lookup-fields/ScontoModelliInput";
import ViewScreen from "../../screen-templates/ViewScreen";
import TastoModifica from "../../components/TastoModifica";
import ScontiContrattiModal from "../../edit-modals/ScontiContrattiModal";
import { viewDataGridOptions } from "../../DataGridOptions";
import { nomiSchermate } from "../../NomiSchermate";

export default function () {
  const [codiceModello, setCodiceModello] = useState<string | null>(null);
  const [alsoClosed, setAlsoClosed] = useState<boolean | undefined>(false);
  const DataGridRef = useRef<DataGrid | null>(null);
  const list = (
    <Suspense>
      <ContrattiScontoDataGrid
        DataGridRef={DataGridRef}
        codiceModello={codiceModello}
        alsoClosed={alsoClosed}
      />
    </Suspense>
  );
  const filtri = (
    <>
      <FieldContainer
        label=" Modelli Sconto:"
        input={
          <ScontoModelliInput
            value={codiceModello}
            onChange={(val) => setCodiceModello(val)}
          />
        }
      />
      <FieldContainer
        label=" Anche contratti chiusi:"
        input={
          <CheckBox
            value={alsoClosed}
            onValueChanged={() => setAlsoClosed(!alsoClosed)}
          />
        }
      />
    </>
  );
  return (
    <ViewScreen
      name={nomiSchermate.sconti.contratti}
      sendGet={true}
      list={list}
      editModal={ScontiContrattiModal}
      filtri={filtri}
      DataGridRef={DataGridRef}
    />
  );
}

function ContrattiScontoDataGrid({
  codiceModello,
  alsoClosed,
  DataGridRef,
}: {
  codiceModello: string | null;
  alsoClosed?: boolean;
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["scontiContrattiControllerList", alsoClosed, codiceModello],
    queryFn: () =>
      DefaultService.scontiContrattiControllerList({
        codiceModello: codiceModello ?? undefined,
        alsoClosed,
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
            editModal={ScontiContrattiModal}
            name={nomiSchermate.sconti.contratti}
          />
        )}
      />
      <Column dataField="ID" width={140} caption="NUMERO"></Column>
      <Column
        dataField="dataContratto"
        dataType="date"
        caption="DATA"
        format="dd/MM/yyyy"
      ></Column>
      <Column dataField="descrizione" caption="DESCRIZIONE" />
      <Column dataField="conto.andescri" caption="CLIENTE" />
      <Column
        dataField="dataChiusura"
        dataType="date"
        caption="DATA CHIUSURA"
        format="dd/MM/yyyy"
      />
      <Column
        dataField="importoScontareMax"
        alignment="right"
        caption="IMPORTO MAX"
      >
        <Format type="currency" precision={2} />
      </Column>
      <Column
        dataField="importoScontareErogato"
        alignment="right"
        caption="IMPORTO EROGATA"
      >
        <Format type="currency" precision={2} />
      </Column>
      <Column
        dataField="importoScontareResiduo"
        alignment="right"
        caption="IMPORTO RESIDUO"
      >
        <Format type="currency" precision={2} />
      </Column>
      <Column
        dataField="dataUltimaElaborazione"
        dataType="date"
        caption="DATA ULTIMA ELABORAZIONE"
      ></Column>
      <HeaderFilter>
        <Search enabled={true} />
      </HeaderFilter>
    </DataGrid>
  );
}

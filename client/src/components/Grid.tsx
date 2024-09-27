import React, { useEffect, useState } from "react";
import DataGrid, {
  Scrolling,
  Selection,
  Editing,
  FilterRow,
  Column,
} from "devextreme-react/data-grid";
import AlertDialog from "./AlertDialog";
import { viewDataGridOptions } from "../DataGridOptions";
const Grid = ({ data }) => {
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (data.hasOwnProperty("error") || data.hasOwnProperty("msg")) {
      setIsError(true);
    }
  }, [data]);
  return (
    <div>
      {isError && <AlertDialog data={data} />}
      {!isError && (
        <div>
          <h2 className={"content-block"}>Ravasio Sconti</h2>
          <DataGrid
            {...viewDataGridOptions}
            height={560}
            dataSource={data}
            columnHidingEnabled={true}
            allowColumnResizing={true}
            columnResizingMode={"widget"}
            keyExpr="agente_codice"
          >
            <FilterRow visible={true} />
            <Scrolling mode="infinite" />
            <Selection mode="single" />

            <Column dataField="agente_nome" width={120} />
            <Column dataField="ragione_sociale" width={270} />
            <Column dataField="nr_contratto" width={70} />
            <Column dataField="descrizione_contratto" width={170} />
            <Column dataField="esito_elaborazione" width={200} />
            <Column dataField="percentuale_applicata" width={70} />
            <Column dataField="qta_targhet" width={70} />
            <Column dataField="limite_importo" width={70} />
            <Column dataField="valore_vendite_trovato" width={100} />
            <Column dataField="qta_vendite_trovata" width={100} />
            <Column dataField="prezzo_trovato" width={100} />
            <Column dataField="kg_da_omaggiare" width={100} />
          </DataGrid>
        </div>
      )}
    </div>
  );
};

export default Grid;

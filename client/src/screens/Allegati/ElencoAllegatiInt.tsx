import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  Scrolling,
  Search,
} from "devextreme-react/data-grid";
import { useState, useEffect } from "react";
import React from "react";

import TastoModifica from "../../components/TastoModifica";

import { viewDataGridOptions } from "../../DataGridOptions";

import AllegatiContrattiModal from "../../edit-modals/AllegatiContrattiModal";

export default function ElencoAllegatiInt({ form }) {
  const [data, setData] = useState([]);
  const params = new URLSearchParams({
    ...form,
  });
  useEffect(() => {
    fetch(`http://localhost:3000/allegati/list?${params}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.error(e));
  }, []);
  const handleShowFile = (e) => {
    window.open(
      `http://localhost:3000/allegati/files/${e.data.nomeFileArchiviato.trim()}`
    );
  };
  const handleRemoveData = (e) => {
    fetch(`http://localhost:3000/allegati/delete/${e.data.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data)))
      .catch((e) => console.log(e));
  };
  return (
    <div style={{ margin: "auto", width: "1200px" }}>
      <h2 className={"content-block"}>Allegati</h2>
      <DataGrid
        dataSource={data}
        {...viewDataGridOptions}
        keyExpr="dataArchiviazione"
        allowColumnResizing={true}
        columnResizingMode={"widget"}
        onRowDblClick={handleShowFile}
        onRowRemoved={handleRemoveData}
      >
        <FilterRow visible={true} key={"id"} />
        <Scrolling mode="virtual" />
        <Column
          width={50}
          cellRender={(row) => (
            <TastoModifica
              row={row}
              editModal={AllegatiContrattiModal}
              name={"ALLEGATI"}
            />
          )}
        />
        <Column dataField="nomeFileArchiviato" caption="NOME FILE" />
        <Column dataField="estensione" caption="ESTENSIONE" width={170} />
        <Column dataField="tipoFile" caption="TIPO ALLEGATO" width={100} />
        <Column dataField="descrizione" caption="DESCRIZIONE" width={170} />
        <Column
          dataField="dataArchiviazione"
          dataType="date"
          caption="DATA ALLEGATO"
          width={150}
        />
        <Column dataField="note" caption="NOTE" />
        <HeaderFilter>
          <Search enabled={true} />
        </HeaderFilter>
      </DataGrid>
    </div>
  );
}

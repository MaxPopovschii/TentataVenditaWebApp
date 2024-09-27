import { Popup } from "devextreme-react/popup";
import React from "react";
import { DettagliContratto } from "./edit-modals/InterventiContrattiModal";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";

const store = new ArrayStore({
  data: [
    {
      ID: "CIAO",
      codiceTipoAttrezzatura: "Prova",
      netto: 12.24,
    },
  ],
  key: "ID",
});
const ds = new DataSource({ store });
export default function Test() {
  return (
    <Popup visible={true}>
      <DettagliContratto data={ds} frozen={false} />
    </Popup>
  );
}

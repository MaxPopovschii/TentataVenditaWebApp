import DataGrid from "devextreme-react/data-grid";
import { ReactNode, Suspense } from "react";
import TitoloPagina from "../components/layout-elements/TitoloPagina";
import React from "react";
import Filtri from "../components/layout-elements/Filltri";
import Elenco from "../components/layout-elements/Elenco";
import { CustomLoading } from "../components/CustomLoading";

interface Props {
  name: string;
  list?: ReactNode;
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  filtri?: ReactNode;
  sendGet: boolean;
}

export default function ViewScreenMat(props: Props) {
  return (
    <>
      <TitoloPagina title={props.name} />
      {!!props.filtri && <Filtri>{props.filtri}</Filtri>}
      <Elenco title={props.name} buttons={props.sendGet ? <></> : <></>}>
        {props.sendGet ? (
          <Suspense fallback={<CustomLoading></CustomLoading>}>
            {props.list}
          </Suspense>
        ) : (
          <div style={{ alignItems: "center" }}>
            <p style={{ textAlign: "center", fontSize: 15 }}>
              Impostare il filtro per visualizzare l'elenco
            </p>
          </div>
        )}
      </Elenco>
    </>
  );
}

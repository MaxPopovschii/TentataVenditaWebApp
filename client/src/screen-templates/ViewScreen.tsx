import React, { ReactNode, Suspense } from "react";

import { DataGrid } from "devextreme-react/data-grid";
import { exportExcel, exportPdf } from "../services/Export";
import TitoloPagina from "../components/layout-elements/TitoloPagina";
import Filtri from "../components/layout-elements/Filltri";
import Elenco from "../components/layout-elements/Elenco";
import Nuovo from "../components/Nuovo";
import ButtonGray from "../components/ButttonGray";
import { CustomLoading } from "../components/CustomLoading";
import { EditModal, showEditModal } from "./EditModal";
import { UseFormReturn } from "react-hook-form";

interface Props {
  name: string;
  list?: ReactNode;
  editModal: () => EditModal;
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  filtri?: ReactNode;
  sendGet: boolean;
  form?: UseFormReturn<any, any, any>;
}

export default function ViewScreen(props: Props) {
  const showModalFn = () =>
    showEditModal({
      ID: null,
      editModal: props.editModal,
      name: props.name,
      form: props.form,
    });
  const exportPdfFn = () =>
    exportPdf({
      name: props.name,
      dj: props.DataGridRef.current!,
    });

  const exportExcelFn = () =>
    exportExcel({
      name: props.name,
      dj: props.DataGridRef.current!,
    });

  return (
    <>
      <TitoloPagina title={props.name} />
      {!!props.filtri && <Filtri>{props.filtri}</Filtri>}
      <Elenco
        title={props.name}
        buttons={
          props.sendGet ? (
            <>
              <div style={{ marginRight: 11 }}>
                <Nuovo onClick={() => showModalFn()} />
              </div>
              <div style={{ marginRight: 11 }}>
                <ButtonGray
                  onClick={() => exportPdfFn()}
                  title="Pdf"
                  icon="print"
                />
              </div>
              <ButtonGray
                onClick={() => exportExcelFn()}
                title="Excel"
                icon="exportxlsx"
              />
            </>
          ) : (
            <></>
          )
        }
      >
        {props.sendGet ? (
          <Suspense fallback={<CustomLoading />}>{props.list}</Suspense>
        ) : (
          <div style={{ alignItems: "center" }}>
            <p style={{ textAlign: "center", fontSize: 20 }}>
              Impostare il filtro per visualizzare l'elenco
            </p>
          </div>
        )}
      </Elenco>
    </>
  );
}

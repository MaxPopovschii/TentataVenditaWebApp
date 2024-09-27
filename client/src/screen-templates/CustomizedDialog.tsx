import React from "react";
import { ReactNode, Suspense } from "react";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import Elenco from "../components/layout-elements/Elenco";
import { DataGrid } from "devextreme-react";
import { IconButton } from "@mui/material";
import Icon from "@mdi/react";
import { mdiFileExcelOutline } from "@mdi/js";
import { CustomLoading } from "../components/CustomLoading";
import { exportExcel } from "../services/Export";

interface Props {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  name: string;
  list?: ReactNode;
  sendGet: boolean;
  isOpen: boolean;
  close: () => void;
}
export default function DraggableDialog(props: Props) {
  const exportExcelFn = () =>
    exportExcel({
      name: props.name,
      dj: props.DataGridRef.current!,
    });
  return (
    <React.Fragment>
      <Popup
        visible={props.isOpen}
        hideOnOutsideClick
        dragEnabled={true}
        position="center"
        resizeEnabled={true}
        onHiding={props.close}
        title={props.name}
        defaultHeight="auto"
        enableBodyScroll={true}
        showCloseButton
        dragOutsideBoundary={true}
      >
        <Elenco
          title={props.name}
          buttons={
            props.sendGet ? (
              <>
                <IconButton
                  sx={{ height: 30 }}
                  onClick={exportExcelFn}
                  title="EXPORT TO EXCEL"
                >
                  <Icon path={mdiFileExcelOutline} size={1} />
                </IconButton>
              </>
            ) : (
              <></>
            )
          }
        >
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
      </Popup>
    </React.Fragment>
  );
}

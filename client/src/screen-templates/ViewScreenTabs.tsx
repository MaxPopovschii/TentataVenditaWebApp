import { ReactNode, Suspense } from "react";
import TitoloPagina from "../components/layout-elements/TitoloPagina";
import Filtri from "../components/layout-elements/Filltri";
import Elenco from "../components/layout-elements/Elenco";
import { CustomLoading } from "../components/CustomLoading";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, IconButton } from "@mui/material";
import { colors } from "../assets/colors";
import { exportExcel } from "../services/Export";
import { DataGrid } from "devextreme-react";
import Icon from "@mdi/react";
import { mdiFileExcelOutline } from "@mdi/js";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface Props {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  name: string;
  list1?: ReactNode;
  list2?: ReactNode;
  list3?: ReactNode;
  filtri?: ReactNode;
  sendGet: boolean;
}

export default function ViewScreenTabs(props: Props) {
  const [value, setValue] = React.useState(0);
  const exportExcelFn = () =>
    exportExcel({
      name: props.name,
      dj: props.DataGridRef.current!,
    });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  let urlp = new URL(window.location.href);
  let urlParams = new URLSearchParams(urlp.searchParams);
  var layoutType = urlParams.get("type");
  if (layoutType == undefined || layoutType == null) {
    layoutType = localStorage.getItem("layoutType");
    if (layoutType == null || layoutType == "" || layoutType == undefined) {
      layoutType = "operator";
    }
  } else {
    localStorage.setItem("layoutType", layoutType);
  }
  return (
    <>
      <TitoloPagina title={props.name} />
      {!!props.filtri && <Filtri>{props.filtri}</Filtri>}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: colors.azzurro,
                color: colors.azzurro,
              },
            }}
          >
            <Tab
              label="Interventi"
              sx={{ fontSize: "10px", fontWeight: "bold" }}
            />
            {(layoutType == "administrator" || layoutType == "vendite") && (
              <Tab
                label="Listini"
                sx={{ fontSize: "10px", fontWeight: "bold" }}
              />
            )}
            {(layoutType == "administrator" || layoutType == "vendite") && (
              <Tab
                label="Prezzi Personali"
                sx={{ fontSize: "10px", fontWeight: "bold" }}
              />
            )}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
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
                {props.list1}
              </Suspense>
            ) : (
              <div style={{ alignItems: "center" }}>
                <p style={{ textAlign: "center", fontSize: 15 }}>
                  Impostare il filtro per visualizzare l'elenco
                </p>
              </div>
            )}
          </Elenco>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
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
                {props.list2}
              </Suspense>
            ) : (
              <div style={{ alignItems: "center" }}>
                <p style={{ textAlign: "center", fontSize: 15 }}>
                  Impostare il filtro per visualizzare l'elenco
                </p>
              </div>
            )}
          </Elenco>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
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
                {props.list3}
              </Suspense>
            ) : (
              <div style={{ alignItems: "center" }}>
                <p style={{ textAlign: "center", fontSize: 15 }}>
                  Impostare il filtro per visualizzare l'elenco
                </p>
              </div>
            )}
          </Elenco>
        </CustomTabPanel>
      </Box>
    </>
  );
}

import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/App.scss";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Home from "./screens/Home/Home";
import ModelliSconto from "./screens/Sconti/ModelliSconto";
import Layout from "./components/Layout";
import "devextreme/dist/css/dx.light.css";
import ContrattiSconto from "./screens/Sconti/ContrattiSconto";
import ElencoAllegatiGrid from "./screens/Allegati/ElencoAllegatiGrid";
import ScontiMaturati from "./screens/Sconti/ScontiMaturati";
import "@fontsource/open-sans";
import "@fontsource/open-sans/300.css";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import { ApiError, OpenAPI } from "./services/openapi";
import CustomError from "./components/CustomError";
import TipologiaIntervento from "./screens/Attrezzature/TipologiaIntervento";
import ContrattiInterventi from "./screens/Attrezzature/ContrattiInterventi";
import ContrattiComodato from "./screens/Comodato/ContrattiComodato";
import Globalize from "globalize";
import supplemental from "devextreme-cldr-data/supplemental.json";
import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/date";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/message";

// Dictionaries for the German language
import itMessages from "devextreme/localization/messages/it.json";
import itCldrData from "devextreme-cldr-data/it.json";
import config from "devextreme/core/config";
import { FileUploader } from "devextreme-react";
import RavasioSconti from "./screens/Sconti/RavasioSconti";
import Tecnici from "./screens/Attrezzature/Tecnici";
import DatiClienti from "./screens/Comodato/DatiClienti";
import LayoutWarehouse from "./components/LayoutWarehouse";
import HomeWarehouse from "./screens/Home/HomeWarehouse";
import ListaInterventi from "./screens/Attrezzature/ListaInterventi";
import Maturazioni from "./screens/Allegati/Maturazioni";
import Analisi from "./screens/Attrezzature/SituazioneClienti";
import HomeVendite from "./screens/Home/HomeVendite";
import LayoutVendite from "./components/LayoutVendite";
import SituazioneClienti from "./screens/Attrezzature/SituazioneClienti";

Globalize.load(supplemental, itCldrData);
Globalize.loadMessages(itMessages);
Globalize.locale("it-IT");
config({ defaultCurrency: "EUR", defaultUseCurrencyAccountingStyle: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error) => {
        if (error instanceof ApiError && [404, 500].includes(error.status))
          return false;
        return count < 3;
      },
    },
  },
});
try {
  OpenAPI.BASE = process.env.SERVER_URL!;
} catch (e) {
  OpenAPI.BASE = "";
}
OpenAPI.BASE = OpenAPI.BASE || window.appConfig.serverUrl;
let urlp = new URL(window.location.href);
let urlParams = new URLSearchParams(urlp.searchParams);

var layoutType = urlParams.get("type"); //.filter((p) => (p.key = "type"));
if (layoutType == undefined || layoutType == null) {
  layoutType = localStorage.getItem("layoutType");
  if (layoutType == null || layoutType == "" || layoutType == undefined) {
    layoutType = "operator";
  }
} else {
  localStorage.setItem("layoutType", layoutType);
}
let layout: ReactNode;
let children: RouteObject[] = [];
if (layoutType == "administrator") {
  layout = <Layout />;
  children = [
    { path: "/", element: <Home /> },
    { path: "/modelli-sconto", element: <ModelliSconto /> },
    { path: "/contratti-sconto", element: <ContrattiSconto /> },
    { path: "/sconti-maturati", element: <ScontiMaturati /> },
    { path: "/elaborazione-sconti", element: <RavasioSconti /> },
    { path: "/tecnici", element: <Tecnici /> },
    { path: "/tipologie-intervento", element: <TipologiaIntervento /> },
    { path: "/interventi", element: <ContrattiInterventi /> },
    { path: "/contratti-comodato", element: <ContrattiComodato /> },
    { path: "/dati-clienti", element: <DatiClienti /> },
    { path: "/elenco-allegati", element: <ElencoAllegatiGrid form={{}} /> },
    { path: "/aggiungi-allegati", element: <FileUploader /> },
    { path: "/lista-interventi", element: <ListaInterventi /> },
    { path: "/maturazioni", element: <Maturazioni /> },
    { path: "/situazioni-clienti", element: <SituazioneClienti /> },
  ];
} else if (layoutType == "operator") {
  layout = <LayoutWarehouse />;
  children = [
    { path: "/", element: <HomeWarehouse /> },
    { path: "/tecnici", element: <Tecnici /> },
    { path: "/tipologie-intervento", element: <TipologiaIntervento /> },
    { path: "/interventi", element: <ContrattiInterventi /> },
    { path: "/elenco-allegati", element: <ElencoAllegatiGrid form={{}} /> },
    { path: "/aggiungi-allegati", element: <FileUploader /> },
    { path: "/lista-interventi", element: <ListaInterventi /> },
    { path: "/situazioni-clienti", element: <SituazioneClienti /> },
  ];
} else if (layoutType == "vendite") {
  layout = <LayoutVendite />;
  children = [
    { path: "/", element: <HomeVendite /> },
    { path: "/tecnici", element: <Tecnici /> },
    { path: "/tipologie-intervento", element: <TipologiaIntervento /> },
    { path: "/interventi", element: <ContrattiInterventi /> },
    { path: "/elenco-allegati", element: <ElencoAllegatiGrid form={{}} /> },
    { path: "/aggiungi-allegati", element: <FileUploader /> },
    { path: "/lista-interventi", element: <ListaInterventi /> },
    { path: "/situazioni-clienti", element: <SituazioneClienti /> },
  ];
}
const router = createBrowserRouter([
  {
    errorElement: <CustomError />,
    path: "/",
    element: layout,
    children: children,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <NiceModal.Provider>
      <RouterProvider router={router} />
    </NiceModal.Provider>
  </QueryClientProvider>
);

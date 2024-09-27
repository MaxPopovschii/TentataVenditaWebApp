import { NavigateOptions, Outlet, useNavigate } from "react-router-dom";
import { Menu } from "devextreme-react/menu";
import React from "react";
import { nomiSchermate } from "../NomiSchermate";
import logoRavasio from "../assets/logo192.png";
export default function () {
  const data = [
    {
      id: "1",
      text: nomiSchermate.sconti.sec,
      items: [
        {
          id: "1_1",
          text: nomiSchermate.sconti.contratti,
          url: "/contratti-sconto",
        },
        {
          id: "1_2",
          text: nomiSchermate.sconti.modelli,
          url: "/modelli-sconto",
        },
        {
          id: "1_3",
          text: nomiSchermate.sconti.maturati,
          url: "/sconti-maturati",
        },
        {
          id: "1_4",
          text: nomiSchermate.elaborazione.name,
          url: "/elaborazione-sconti",
        },
      ],
    },
    {
      id: "2",
      text: nomiSchermate.comodato.sec,
      items: [
        {
          id: "2_1",
          text: nomiSchermate.comodato.contratti,
          url: "/contratti-comodato",
        },
        {
          id: "2_2",
          text: "Dati aggiuntivi dei clienti",
          url: "/dati-clienti",
        },
        {
          id: "2_3",
          text: "Maturazioni",
          url: "/maturazioni",
        },
      ],
    },
    {
      id: "3",
      text: nomiSchermate.interventi.sec,
      items: [
        {
          id: "3_1",
          text: "Anagrafica Interventi",
          url: "/interventi",
        },
        {
          id: "3_2",
          text: nomiSchermate.interventi.tipologie,
          url: "/tipologie-intervento",
        },
        {
          id: "3_3",
          text: "Tecnici",
          url: "/tecnici",
        },
        {
          id: "3_4",
          text: "Lista Interventi",
          url: "/lista-interventi",
        },
        {
          id: "3_5",
          text: "Situazioni Clienti",
          url: "/situazioni-clienti",
        },
      ],
    },
  ];
  let urlp = new URL(window.location.href);
  let urlParams = new URLSearchParams(urlp.searchParams);

  var layoutType = urlParams.get("type");
  const params: NavigateOptions = {
    state: {
      type: layoutType,
    },
  };
  {
  }
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div className="header-bar">
          <button
            className="logo invisible-button"
            style={{
              margin: 5,
              color: "white",
              marginRight: 50,
            }}
          >
            <p
              className="header-title"
              onClick={() => navigate("/", { ...params })}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={logoRavasio}
                alt={"Ravasio"}
                width={115}
                height={115}
                style={{
                  width: 60,
                  height: 60,
                  verticalAlign: "center",
                  marginRight: 20,
                }}
              />{" "}
              Torrefazione{" "}
            </p>
          </button>
          <Menu
            dataSource={data}
            displayExpr="text"
            showFirstSubmenuMode={{
              name: "onHover",
              delay: { show: 0, hide: 500 },
            }}
            orientation={"horizontal"}
            onItemClick={(el) => {
              el.event?.preventDefault();
              if (el.itemData?.url) navigate(el.itemData.url);
            }}
          />
        </div>
        <div
          style={{
            padding: 15,
            flex: 1,
            overflowY: "auto",
            overflowX: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

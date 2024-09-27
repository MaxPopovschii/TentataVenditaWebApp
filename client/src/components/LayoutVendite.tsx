import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "devextreme-react/menu";
import React from "react";
import { nomiSchermate } from "../NomiSchermate";
import logoRavasio from "../assets/logo192.png";
export default function () {
  const data = [
    {
      id: "3",
      text: nomiSchermate.interventi.sec,
      items: [
        {
          id: "3_1",
          text: nomiSchermate.interventi.interventi,
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
              onClick={() => navigate("/")}
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

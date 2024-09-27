import { useNavigate } from "react-router-dom";
import tipoIntervento from "../../assets/tipi_di_intervento.svg";
import { colors } from "../../assets/colors";
import contratti from "../../assets/contratti.svg";
import maturati from "../../assets/maturati.svg";
import modelli from "../../assets/modelli_sconto.svg";
import React from "react";
import { nomiSchermate } from "../../NomiSchermate";

export default function () {
  return (
    <>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div className="home-item-div ">
          <p style={{ marginBottom: 20 }}>
            {nomiSchermate.interventi.sec.toUpperCase()}
          </p>
          <div>
            <ImgButton
              img={contratti}
              title={nomiSchermate.interventi.interventi}
              url={"/interventi"}
              color={colors.arancione}
            />
            <ImgButton
              img={maturati}
              title={"Lista Interventi"}
              url={"/lista-interventi"}
              color={colors.arancione}
            />
          </div>
          <ImgButton
            img={modelli}
            title={"Situazioni Clienti"}
            url={"/situazioni-clienti"}
            color={colors.arancione}
          />
          <div style={{ justifyContent: "center" }}>
            ___________________________________
          </div>
          <div>
            <ImgButton
              img={modelli}
              title={nomiSchermate.interventi.tipologie}
              url={"/tipologie-intervento"}
              color={colors.verde}
            />
            <ImgButton
              img={tipoIntervento}
              title={"Tecnici"}
              url={"/tecnici"}
              color={colors.verde}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ImgButton({
  img,
  color,
  title,
  url,
}: {
  img: string;
  title: string;
  url: string;
  color: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      style={{
        cursor: "pointer",
        textAlign: "center",
        background: "none",
        border: "none",
        justifyContent: "center",
        marginTop: 50,
      }}
      onClick={() => navigate(url)}
    >
      <div
        style={{
          backgroundColor: color,
          borderRadius: 35,
          width: 70,
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          boxShadow: "6px 0px 12px 1px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ height: 35, width: 35 }}>
          <img src={img} alt="" />
        </div>
      </div>
      <p>{title}</p>
    </button>
  );
}

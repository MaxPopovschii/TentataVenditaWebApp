import React, { ReactElement, ReactNode } from "react";
import { colors } from "../../assets/colors";
import Nuovo from "../Nuovo";

export default function ElencoDettagli(props: {
  buttons?: ReactNode;
  children?: ReactNode;
  title: string;
}) {
  return (
    <>
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          borderColor: colors.grigio,
          borderWidth: 1,
          borderStyle: "solid",
          paddingLeft: 5,
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <p style={{ marginRight: 5 }}>Dettagli</p>
          <p> {props.title}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            margin: 5,
          }}
        >
          {props.buttons}
        </div>
        <div style={{ height: "400px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflowX: "auto",
            }}
            className={"elenco-dettagli-container"}
          >
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}

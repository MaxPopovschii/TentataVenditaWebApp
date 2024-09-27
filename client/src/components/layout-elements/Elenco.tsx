import React, { ReactElement, ReactNode } from "react";
import { colors } from "../../assets/colors";

export default function Elenco(props: {
  buttons?: ReactNode;
  children?: ReactNode;
  title: string;
}) {
  return (
    <div
      style={{
        borderColor: colors.grigio,
        borderWidth: 1,
        borderStyle: "solid",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        {props.buttons}
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: "400px" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowX: "auto",
            paddingBottom: 0,
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

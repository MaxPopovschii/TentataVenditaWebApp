import React, { ReactElement, ReactNode } from "react";
import { colors } from "../../assets/colors";

export default function Filtri(props: { children?: ReactNode }) {
  return (
    <div
      style={{
        borderColor: colors.grigio,
        borderWidth: 1,
        borderStyle: "solid",
        padding: 3,
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      ></div>
      {props.children}
    </div>
  );
}

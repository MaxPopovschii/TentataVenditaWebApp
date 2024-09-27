import nuovo from "../assets/nuovo.svg";
import { colors } from "../assets/colors";
import React from "react";
export default function Nuovo({
  onClick,
  title,
}: {
  onClick: () => void;
  title?: string;
}) {
  return (
    <>
      <button
        className="invisible-button"
        style={{
          backgroundColor: colors.azzurro,
          minWidth: 70,
          height: 30,
          borderRadius: 2,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          justifyItems: "center",
          display: "flex",
        }}
        onClick={onClick}
      >
        <p
          style={{
            color: "white",
            flex: 1,
            fontSize: "13px",
            fontFamily: "Open Sans",
          }}
        >
          {title ?? "Nuovo"}
        </p>
        <div
          style={{
            height: 15,
            width: 15,
            margin: 5,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <img src={nuovo} />
        </div>
      </button>
    </>
  );
}

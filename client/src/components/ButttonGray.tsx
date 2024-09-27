import nuovo from "../assets/nuovo.svg";
import { colors } from "../assets/colors";
import React from "react";
export default function ButtonGray({
  onClick,
  title,
  icon,
}: {
  onClick: () => void;
  title: string;
  icon: string;
}) {
  return (
    <>
      <button
        className="invisible-button"
        style={{
          backgroundColor: colors.grigio,
          width: 70,
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
            flex: 1,
            fontSize: "13px",
            fontFamily: "Open Sans",
          }}
        >
          {title}
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
          className={"dx-icon-" + icon}
        ></div>
      </button>
    </>
  );
}

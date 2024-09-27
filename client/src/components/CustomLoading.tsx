import { LoadIndicator } from "devextreme-react/load-indicator";
import React from "react";

export function CustomLoading({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      <LoadIndicator
        id="large-indicator"
        height={height ?? 60}
        width={width ?? 60}
      />
    </div>
  );
}

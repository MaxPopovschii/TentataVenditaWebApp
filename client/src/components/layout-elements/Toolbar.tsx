import React, { ReactNode } from "react";
import { CustomLoading } from "../CustomLoading";

export function Toolbar(props: {
  name: string | ReactNode;
  loading: boolean;
  buttons: ReactNode;
  close: () => void;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          Visualizza <strong>{props.name}</strong>
        </div>
        <div style={{ marginLeft: "auto", display: "flex" }}>
          {props.loading ? (
            <div style={{ height: 30, width: 80 }}>
              <CustomLoading height={30} width={30} />
            </div>
          ) : (
            props.buttons
          )}
        </div>
      </div>
    </>
  );
}

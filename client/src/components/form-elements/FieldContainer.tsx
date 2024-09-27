import React, { ReactNode } from "react";

export interface FieldContainerProps {
  label: string;
  input: ReactNode;
  obbligatorio?: boolean;
  whidth?: number;
}

export default function FieldContainer(props: FieldContainerProps) {
  return (
    <div className="field-container">
      <div
        className="label"
        style={props.whidth ? { width: props.whidth } : {}}
      >
        {props.label}
        {!!props.obbligatorio && (
          <span className={"stellina-obbligatorio"}>*</span>
        )}
      </div>
      <div className="value">{props.input}</div>
    </div>
  );
}

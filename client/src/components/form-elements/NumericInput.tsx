import { NumberBox } from "devextreme-react/number-box";
import React from "react";

export default function NumericInput(props: {
  frozen: boolean;
  value: number | null;
  onChange: (val: number | null) => void;
}) {
  return (
    <NumberBox
      disabled={props.frozen}
      height={25}
      onValueChanged={(e) => props.onChange(e.value)}
      value={props.value ?? undefined}
      showSpinButtons={true}
    />
  );
}

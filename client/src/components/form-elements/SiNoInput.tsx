import { RadioGroup } from "devextreme-react/radio-group";
import React from "react";

export default function SiNoInput(props: {
  frozen: boolean;
  value: boolean | null;
  onChange: (val: boolean | null) => void;
}) {
  return (
    <RadioGroup
      disabled={props.frozen}
      height={25}
      items={["SI", "NO"]}
      layout="horizontal"
      value={props.value ? "SI" : props.value === false ? "NO" : undefined}
      onValueChanged={(e) => props.onChange(e.value == "SI")}
    />
  );
}

import React, { ReactNode } from "react";

export default function AutocompleteContainer(props: {
  inputTools?: ReactNode;
  valueDescription?: ReactNode;
  valueExtendedDescription?: ReactNode;
  input: ReactNode;
}) {
  return (
    <>
      <div className={"value-row"}>
        <div className="input">{props.input}</div>
        {!!props.inputTools && (
          <div className={"input-tools"}>{props.inputTools}</div>
        )}
        <div className={"row-break"}></div>
        {!!props.valueDescription && (
          <div className={"value-description"}>{props.valueDescription}</div>
        )}
      </div>
      {!!props.valueExtendedDescription && (
        <div className={"value-row"}>
          <div className="value-extended-description">
            {props.valueExtendedDescription}
          </div>
        </div>
      )}
    </>
  );
}

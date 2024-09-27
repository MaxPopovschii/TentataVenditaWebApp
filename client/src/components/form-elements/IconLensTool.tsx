import React from "react";

export function IconLensTool({
  onClick,
  disabled,
}: {
  onClick: () => Promise<void>;
  disabled?: boolean;
}) {
  return (
    <i
      className="dx-icon-find"
      style={{
        fontSize: "1.5em",
        cursor: "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={() => !disabled && onClick()}
    ></i>
  );
}

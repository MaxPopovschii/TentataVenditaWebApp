import React from "react";

export default function TitoloPagina(props: { title: string }) {
  return (
    <div>
      <p style={{ fontWeight: "bold", fontSize: "12px" }}>{props.title} </p>
    </div>
  );
}

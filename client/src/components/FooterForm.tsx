import { Button } from "devextreme-react/button";
import React from "react";

const Footer = ({ onClick }) => {
  return (
    <footer
      style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
    >
      <Button onClick={onClick} icon="save" style={{ marginRight: "30px" }}>
        Salva
      </Button>
      <Button icon="remove" style={{ marginRight: "30px" }}>
        Annulla
      </Button>
    </footer>
  );
};
export default Footer;

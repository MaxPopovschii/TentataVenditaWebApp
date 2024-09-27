import { Button } from "devextreme-react/button";
import { colors } from "../../assets/colors";
import React, { ReactNode } from "react";
import { useModal } from "@ebay/nice-modal-react";
import { Toolbar } from "./Toolbar";

export function LookupModalToolbar({
  name,
  selectedId,
}: {
  name: string | ReactNode;
  selectedId: string | null;
}) {
  const modal = useModal();
  const reject = () => {
    modal.reject("No selection made");
    modal.remove();
  };
  const resolve = () => {
    if (!selectedId) return;
    modal.resolve(selectedId);
    modal.remove();
  };
  return (
    <Toolbar
      name={name}
      loading={false}
      close={reject}
      buttons={
        <>
          <Button
            width={80}
            height={30}
            text="Seleziona"
            type="normal"
            style={{ fontSize: "11px", marginRight: "5px" }}
            stylingMode="contained"
            disabled={!selectedId}
            icon="check"
            onClick={() => resolve()}
          />
          <Button
            width={80}
            height={30}
            text="Annulla"
            type="normal"
            stylingMode="contained"
            style={{
              fontSize: "11px",
              backGroundColor: colors.grigio,
              marginRight: "5px",
            }}
            icon="close"
            onClick={reject}
          />
        </>
      }
    />
  );
}

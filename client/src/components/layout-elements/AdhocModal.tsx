import { ModalTopBar } from "./ModalTopBar";
import { Popup } from "devextreme-react/popup";
import { useModal } from "@ebay/nice-modal-react";
import React from "react";

export default function AdhocModal({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const modal = useModal();
  return (
    <Popup
      resizeEnabled={true}
      wrapperAttr={{ class: "ahr" }}
      visible={modal.visible}
      onHiding={() => modal.remove()}
      titleComponent={ModalTopBar}
    >
      <div className="popup-content">
        <div className={"popup-header"}>{header}</div>
        <div className={"popup-body-container"}>
          <div className={"popup-body"}>{children}</div>
        </div>
      </div>
    </Popup>
  );
}

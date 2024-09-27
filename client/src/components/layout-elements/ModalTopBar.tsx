import React from "react";
import { useModal } from "@ebay/nice-modal-react";

export function ModalTopBar() {
  const modal = useModal();
  return (
    <div className={"top-bar"}>
      <button className={"invisible-button"} onClick={() => modal.remove()}>
        <i className="dx-icon-close" style={{ color: "white", margin: 5 }}></i>
      </button>
    </div>
  );
}

import React, { ReactNode, Suspense, useState } from "react";
import { useModal } from "@ebay/nice-modal-react";
import { Popup } from "devextreme-react/popup";
import { LookupModalToolbar } from "../components/layout-elements/LookupModalToolbar";
import { ModalTopBar } from "../components/layout-elements/ModalTopBar";
import AdhocModal from "../components/layout-elements/AdhocModal";

export function LookupModal<TProps>(
  props: TProps & {
    name: string | ReactNode;
    renderGrid: (props: {
      onSelect: (ID: string | null) => void;
    }) => React.ReactElement;
  },
) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <AdhocModal
      header={<LookupModalToolbar name={props.name} selectedId={selectedId} />}
    >
      <Suspense fallback={<p>Caricamento in corso...</p>}>
        {props.renderGrid({ onSelect: setSelectedId })}
      </Suspense>
    </AdhocModal>
  );
}

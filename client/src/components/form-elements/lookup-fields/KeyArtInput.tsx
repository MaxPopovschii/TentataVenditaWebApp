import React from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";

import { KeyArtView } from "../../../services/openapi";
import {
  keyArtDS,
  useKeyArtLookup,
} from "../../../data-retrieval/general/useKeyArt";

type TConfig = {
  basicItemType: KeyArtView;
  fullItemType: KeyArtView;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

export function KeyArtInput({
  value,
  onChange,
  displayMode,
  frozen,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
}) {
  return (
    <InputComponent
      displayedIDComputer={(id) => id}
      descriptionComputer={(obj) => obj.cadesart}
      frozen={frozen}
      dataSource={keyArtDS}
      displayMode={displayMode}
      lookupHook={useKeyArtLookup}
      mode={"Autocomplete"}
      value={value}
      onChange={onChange}
    />
  );
}

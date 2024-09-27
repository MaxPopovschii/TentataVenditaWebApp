import React from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";

import { MagazzinoView } from "../../../services/openapi";
import {
  magazzinoDS,
  useMagazzinoLookup,
} from "../../../data-retrieval/general/useMagazzino";

type TConfig = {
  basicItemType: MagazzinoView;
  fullItemType: MagazzinoView;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

export function MagazzinoInput({
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
      descriptionComputer={(obj) => obj.mgdesmag}
      frozen={frozen}
      dataSource={magazzinoDS}
      displayMode={displayMode}
      lookupHook={useMagazzinoLookup}
      mode={"Autocomplete"}
      value={value}
      onChange={onChange}
    />
  );
}

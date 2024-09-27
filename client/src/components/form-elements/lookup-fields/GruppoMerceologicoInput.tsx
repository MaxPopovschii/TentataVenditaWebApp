import React from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";

import {
  gruppoMerceologicoDS,
  useGruppoMerceologicoLookup,
} from "../../../data-retrieval/general/useGruppoMerceologico";
import { GrupmercView } from "../../../services/openapi";

type TConfig = {
  basicItemType: GrupmercView;
  fullItemType: GrupmercView;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

export function GruppoMerceologicoInput({
  value,
  onChange,
  frozen,
  displayMode,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
}) {
  return (
    <InputComponent
      frozen={frozen}
      displayedIDComputer={(id) => id}
      descriptionComputer={(obj) => obj.gmdescri}
      dataSource={gruppoMerceologicoDS}
      lookupHook={useGruppoMerceologicoLookup}
      mode={"Autocomplete"}
      value={value}
      displayMode={displayMode}
      onChange={onChange}
    />
  );
}

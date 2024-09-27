import React from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";
import {
  modelliScontoDS,
  useModelloScontoLookup,
} from "../../../data-retrieval/contratti-sconto/useModelloSconto";
import {
  ScontiModelliLookup,
  ScontiModelliBasicLookup,
} from "../../../services/openapi";

type TConfig = {
  basicItemType: ScontiModelliBasicLookup;
  fullItemType: ScontiModelliLookup;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

export function ScontoModelliInput({
  value,
  onChange,
  frozen,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
}) {
  return (
    <InputComponent
      frozen={frozen}
      displayedIDComputer={(id) => id}
      descriptionComputer={(obj) => obj.descrizione}
      dataSource={modelliScontoDS}
      lookupHook={useModelloScontoLookup}
      mode={"Autocomplete"}
      value={value}
      onChange={onChange}
    />
  );
}

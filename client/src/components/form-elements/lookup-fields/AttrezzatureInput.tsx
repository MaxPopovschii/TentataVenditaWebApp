import React from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";
import { FamArtiBasic } from "../../../services/openapi";

import {
  attrezzatureDS,
  useAttrezzaturaLookup,
} from "../../../data-retrieval/attrezzature/useAttrezzatura";

type TConfig = {
  basicItemType: FamArtiBasic;
  fullItemType: FamArtiBasic;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

export function AttrezzatureInput({
  value,
  onChange,
  frozen,
  displayMode = "EDIT",
  inputRef,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
  displayMode?: "SHOW" | "EDIT";
  inputRef?: any;
}) {
  return (
    <InputComponent
      frozen={frozen}
      displayedIDComputer={(id) => id}
      descriptionComputer={(obj) => obj.fadescri}
      dataSource={attrezzatureDS}
      lookupHook={useAttrezzaturaLookup}
      mode={"Autocomplete"}
      value={value}
      onChange={onChange}
      displayMode={displayMode}
      inputRef={inputRef}
    />
  );
}

import React, { useMemo } from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";
import { TecniciInputView } from "../../../services/openapi";

import {
  getTecniciDS,
  useTecnicoLookup,
} from "../../../data-retrieval/general/useTecnico";
import { TecnicoID } from "../../../../../common/src/IDSystem/TecniciID";

type TConfig = {
  basicItemType: TecniciInputView;
  fullItemType: TecniciInputView;
  idType: string;
};

const ClienteInputComponent = AutocompleteInput<TConfig>;

function ExtendedDescription({ item }: { item: TecniciInputView | null }) {
  if (!item) return null;
  return (
    <>
      <div style={{ fontSize: "10px" }}>
        {item.descrizione} - {item.tipo}
      </div>
    </>
  );
}

export function TecnicoInput({
  value,
  onChange,
  frozen,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
}) {
  const ds = useMemo(() => getTecniciDS(), []);
  console.log(value);
  return (
    <ClienteInputComponent
      displayedIDComputer={(id) => TecnicoID.parse(id).codice}
      descriptionComputer={(obj) => obj.descrizione}
      dataSource={ds}
      extendedDescription={ExtendedDescription}
      lookupHook={useTecnicoLookup}
      frozen={frozen}
      mode={"Autocomplete"}
      value={value}
      onChange={onChange}
    />
  );
}

import React, { useMemo } from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";
import {
  getClientiDS,
  useContoLookup,
} from "../../../data-retrieval/general/useConto";
import { ContiBasicGet, ContiGet } from "../../../services/openapi";
import { ContoID } from "common";

type TConfig = {
  basicItemType: ContiBasicGet;
  fullItemType: ContiGet;
  idType: string;
};

const ClienteInputComponent = AutocompleteInput<TConfig>;

function ExtendedDescription({ item }: { item: ContiGet | null }) {
  if (!item) return null;
  return (
    <>
      <div style={{ fontSize: "10px" }}>
        {item.anindiri} - {item.anCap} {item.anlocali} ({item.anprovin?.trim()})
      </div>
      <div style={{ fontSize: "10px" }}>
        Partita IVA {item.anpariva ?? "[sconosciuta]"} - Codice fiscale{" "}
        {item.ancodfis ?? "[sconosciuto]"}
      </div>
      <div style={{ fontSize: "10px" }}>
        Email {item.anEmail ?? "[sconosciuto]"} / Telefono{" "}
        {item.antelefo ?? "[sconosciuto]"}
      </div>
    </>
  );
}

export function ClienteInput({
  value,
  onChange,
  frozen,
  tipoConto,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
  tipoConto?: "F" | "C";
}) {
  const ds = useMemo(() => getClientiDS(tipoConto), [tipoConto]);
  console.log(value);
  return (
    <ClienteInputComponent
      displayedIDComputer={(id) => ContoID.parse(id).ancodice}
      descriptionComputer={(obj) => obj.andescri}
      dataSource={ds}
      extendedDescription={ExtendedDescription}
      lookupHook={useContoLookup(tipoConto)}
      frozen={frozen}
      mode={"Autocomplete"}
      value={value}
      onChange={onChange}
    />
  );
}

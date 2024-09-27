import React, { useEffect } from "react";
import {
  AutocompleteInput,
  useArrLookup,
} from "../autocomplete-system/AutocompleteInput";
import {
  FamArtiConInterventi,
  TipologieInterventoLookup,
} from "../../../services/openapi";
import { TipoologiaInterventoID } from "common";
import { useAttrezzatura } from "../../../data-retrieval/attrezzature/useAttrezzatura";

type TConfig = {
  basicItemType: TipologieInterventoLookup;
  fullItemType: TipologieInterventoLookup;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

export function TipologiaInterventoInput(props: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
  idTipoAttrezzatura: string | null;
  displayMode?: "EDIT" | "SHOW";
}) {
  const q = useAttrezzatura({ id: props.idTipoAttrezzatura });
  useEffect(() => {
    if (!props.value) return;
    if (!props.idTipoAttrezzatura) props.onChange(null);
    if (!q.isSuccess) return;
    if (!q.data?.interventi.some((el) => el.ID === props.value)) {
      props.onChange(null);
    }
  }, [q.isSuccess, q.data, props.idTipoAttrezzatura, props.value]);

  if (q.isLoading) return <>[Caricamento degli interventi in corso...]</>;
  if (!q.isSuccess) return <>[Errore nel recupero degli interventi]</>;
  if (!props.idTipoAttrezzatura || !q.data)
    return <>[Nessuna attrezzatura selezionata]</>;
  return (
    <Input
      value={props.value}
      onChange={props.onChange}
      frozen={props.frozen}
      attrezzatura={q.data}
      displayMode={props.displayMode}
    />
  );
}

function Input(props: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
  attrezzatura: FamArtiConInterventi;
  displayMode?: "EDIT" | "SHOW";
}) {
  const useLookup = useArrLookup({
    arr: props.attrezzatura.interventi,
    key: "InterventiLookup",
    arrKey: props.attrezzatura.ID,
  });
  return (
    <InputComponent
      displayedIDComputer={(id) =>
        TipoologiaInterventoID.parse(id).tipoIntervento
      }
      descriptionComputer={(obj) => obj.descrizione ?? null}
      dataSource={props.attrezzatura.interventi}
      lookupHook={useLookup}
      frozen={props.frozen}
      mode={"Select"}
      value={props.value}
      onChange={props.onChange}
      displayMode={props.displayMode}
    />
  );
}

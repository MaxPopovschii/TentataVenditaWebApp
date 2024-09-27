import { UseFormReturn, useWatch } from "react-hook-form";
import React, { useEffect } from "react";
import {
  AutocompleteInput,
  useArrLookup,
} from "../autocomplete-system/AutocompleteInput";
import { DocDettID } from "common";

import { DocDettBasicGet } from "../../../services/openapi";
import { useRigheDocuemnto } from "../../../data-retrieval/general/useDoc";
import NiceModal from "@ebay/nice-modal-react";
import DocDettLookupModal from "../../../lookup-modals/DocDettLookupModal";

type TConfig = {
  basicItemType: DocDettBasicGet;
  fullItemType: DocDettBasicGet;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

export function DocRigheInput(props: {
  value: string | null;
  frozen?: boolean;
  onChange: (val: string | null) => void;
  idDocumento: string;
  displyMode?: "EDIT" | "SHOW";
}) {
  const onChange = (val: string | null) => {
    console.log("Changing val to", val);
    props.onChange(val);
  };

  let dettagli = useRigheDocuemnto({ id: props.idDocumento });

  useEffect(() => {
    if (!props.value) return;
    if (!props.idDocumento) props.onChange(null);
    if (!dettagli.isSuccess) return;
    if (!dettagli.data?.some((el) => el.ID === props.value)) {
      props.onChange(null);
    }
  }, [dettagli.isSuccess, dettagli.data, props.idDocumento, props.value]);

  if (!props.idDocumento) {
    return <>[Documento non selezionato]</>;
  }
  if (dettagli.isLoading) return <>[Caricamento righe documento in corso]</>;
  if (!dettagli.isSuccess)
    return <>[Errore nel caricamento delle righe del documento]</>;
  if (!dettagli.data?.length) return <>[Nessuna riga disponibile]</>;

  const useDocDettLookup = useArrLookup({
    arrKey: props.idDocumento,
    key: "RigheDocumento",
    arr: dettagli.data,
  });
  return (
    <InputComponent
      frozen={props.frozen}
      mode={"Select"}
      dataSource={dettagli.data}
      displayedIDComputer={(id) => {
        const { cprownum } = DocDettID.parse(id);
        return cprownum.toString();
      }}
      descriptionComputer={(obj) => "Riga " + DocDettID.parse(obj.ID).cprownum}
      value={props.value}
      onChange={onChange}
      displayMode={props.displyMode}
      lookupHook={useDocDettLookup}
      advancedLookup={() =>
        NiceModal.show(DocDettLookupModal(), { docId: props.idDocumento })
      }
    />
  );
}

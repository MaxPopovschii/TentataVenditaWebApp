import { UseFormReturn, useWatch } from "react-hook-form";
import React, { useEffect } from "react";
import {
  AutocompleteInput,
  useArrLookup,
} from "../autocomplete-system/AutocompleteInput";
import { ContrattiScontoDettagliID } from "common";
import { ScontiContrattiDettView } from "../../../services/openapi";
import { useDettagliContrattoSconto } from "../../../data-retrieval/contratti-sconto/useDettagliContrattoSconto";
import NiceModal from "@ebay/nice-modal-react";
import RigheContrattoLookupModal from "../../../lookup-modals/RigheContrattoLookupModal";

type TConfig = {
  basicItemType: ScontiContrattiDettView;
  fullItemType: ScontiContrattiDettView;
  idType: string;
};

const RigheContrattoInputComponent = AutocompleteInput<TConfig>;

export function RigheContrattoInput(props: {
  value: string | null;
  frozen?: boolean;
  onChange: (val: string | null) => void;
  form: UseFormReturn<any>;
  contrattoFieldName: string;
}) {
  const onChange = (val: string | null) => {
    console.log("Changing val to", val);
    props.onChange(val);
  };
  const nrContratto: string | null = useWatch({
    control: props.form.control,
    name: props.contrattoFieldName,
  });
  let dettagli = useDettagliContrattoSconto({ id: nrContratto });

  useEffect(() => {
    if (!props.value) return;
    if (!nrContratto) props.onChange(null);
    if (!dettagli.isSuccess) return;
    if (!dettagli.data?.some((el) => el.ID === props.value)) {
      props.onChange(null);
    }
  }, [dettagli.isSuccess, dettagli.data, nrContratto, props.value]);

  if (!nrContratto) {
    return <>[Contratto non selezionato]</>;
  }
  if (dettagli.isLoading) return <>[Caricamento righe contratto in corso]</>;
  if (!dettagli.isSuccess)
    return <>[Errore nel caricamento delle righe del contratto]</>;
  if (!dettagli.data?.length) return <>[Nessuna riga disponibile]</>;

  const useContrattiByContoLookup = useArrLookup({
    arrKey: nrContratto,
    key: "RigheContratto",
    arr: dettagli.data,
  });
  return (
    <RigheContrattoInputComponent
      frozen={props.frozen}
      mode={"Select"}
      dataSource={dettagli.data}
      displayedIDComputer={(id) => {
        const { riga } = ContrattiScontoDettagliID.parse(id);
        return riga.toString();
      }}
      descriptionComputer={(obj) =>
        "Riga " + ContrattiScontoDettagliID.parse(obj.ID).riga
      }
      value={props.value}
      onChange={onChange}
      lookupHook={useContrattiByContoLookup}
      advancedLookup={() =>
        NiceModal.show(RigheContrattoLookupModal(), {
          idContratto: nrContratto,
        })
      }
    />
  );
}

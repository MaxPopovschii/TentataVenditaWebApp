import { UseFormReturn, useWatch } from "react-hook-form";
import React, { useEffect } from "react";
import {
  AutocompleteInput,
  useArrLookup,
} from "../autocomplete-system/AutocompleteInput";
import { useQuery } from "@tanstack/react-query";
import {
  ScontiContrattiMastBasic,
  ScontiContrattiMastBasicLookup,
} from "../../../services/openapi";
import { useContrattiScontoCliente } from "../../../data-retrieval/contratti-sconto/useContrattiScontoCliente";
import NiceModal from "@ebay/nice-modal-react";
import ScontiContrattiLookupModal from "../../../lookup-modals/ScontiContrattiLookupModal";

type TConfig = {
  basicItemType: ScontiContrattiMastBasicLookup;
  fullItemType: ScontiContrattiMastBasicLookup;
  idType: string;
};

const ContrattiInputComponent = AutocompleteInput<TConfig>;

export function ContrattoClienteInput(props: {
  value: string | null;
  frozen?: boolean;
  onChange: (val: string | null) => void;
  form: UseFormReturn<any>;
  contoFieldNameConto: string;
  contoFieldNameDestinazione: string;
}) {
  const contoId: string | null = useWatch({
    control: props.form.control,
    name: props.contoFieldNameConto,
  });
  const codiceDestinazione: string | null = useWatch({
    control: props.form.control,
    name: props.contoFieldNameDestinazione,
  });
  let contratti = useContrattiScontoCliente({ id: contoId });
  let contrattiDestinazione = contratti.data;
  if (codiceDestinazione)
    contrattiDestinazione?.filter(
      (contratto) => contratto.idDestinazione == codiceDestinazione,
    );

  useEffect(() => {
    if (!props.value) return;
    if (!contoId) props.onChange(null);
    if (!contratti.isSuccess) return;
    if (!contratti.data?.some((el) => el.ID === props.value)) {
      props.onChange(null);
    }
  }, [contratti.isSuccess, contratti.data, contoId, props.value]);

  if (!contoId) return <>[Nessun cliente selezionato]</>;
  if (contratti.isLoading) return <>[Caricamento contratti in corso]</>;
  if (!contratti.isSuccess) return <>[Errore nel caricamento dei contratti]</>;
  if (!contrattiDestinazione?.length) {
    return <>[Nessun contratto disponibile]</>;
  }
  const useContrattiByContoLookup = useArrLookup({
    arr: contrattiDestinazione,
    key: "CONTRATTI_SCONTO_BY_CONTO",
    arrKey: [contoId, codiceDestinazione],
  });
  return (
    <ContrattiInputComponent
      frozen={props.frozen}
      mode={"Select"}
      displayedIDComputer={(id) => id}
      dataSource={contrattiDestinazione ?? []}
      descriptionComputer={(obj) => obj.descrizione}
      value={props.value}
      onChange={props.onChange}
      lookupHook={useContrattiByContoLookup}
      advancedLookup={() =>
        NiceModal.show(ScontiContrattiLookupModal(), { contoId })
      }
    />
  );
}

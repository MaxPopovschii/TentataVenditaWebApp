import { UseFormReturn, useWatch } from "react-hook-form";
import React, { useEffect } from "react";
import {
  AutocompleteInput,
  useArrLookup,
} from "../autocomplete-system/AutocompleteInput";
import { ContoID, DestinazioneID } from "common";
import { useConto } from "../../../data-retrieval/general/useConto";
import { ContiGet, DesDiveGet } from "../../../services/openapi";

type TConfig = {
  basicItemType: DesDiveGet;
  fullItemType: DesDiveGet;
  idType: string;
};

const DestinazioneInputComponent = AutocompleteInput<TConfig>;

function ExtendedDescription({
  item,
}: {
  item: DesDiveGet | null | undefined;
}) {
  if (!item) return null;
  return (
    <>
      <div>
        {item.ddindiri} - {item.ddCap} {item.ddlocali} ({item.ddprovin?.trim()})
      </div>
    </>
  );
}

function computeDestinazioneContoId(destinazioneId: string | null) {
  if (!destinazioneId) return null;
  const id = DestinazioneID.parse(destinazioneId);
  return ContoID.compute({
    ancodice: id.ddcodice,
    antipcon: id.ddtipcon,
  });
}

export function DestinazioneInput(props: {
  value: string | null;
  frozen?: boolean;
  onChange: (val: string | null) => void;
  form: UseFormReturn<any>;
  contoFieldName: string;
}) {
  const contoId: string | null = useWatch({
    control: props.form.control,
    name: props.contoFieldName,
  });
  const q = useConto({ id: contoId });

  useEffect(() => {
    if (!props.value) return;
    if (!contoId) props.onChange(null);
    if (!q.isSuccess) return;
    if (!q.data?.destinazioni.some((el) => el.ID === props.value)) {
      props.onChange(null);
    }
  }, [q.isSuccess, q.data, contoId, props.value]);

  if (q.isLoading) return <>[Caricamento delle destinazioni in corso...]</>;
  if (!q.isSuccess) return <>[Errore nel recupero delle destinazioni]</>;
  if (!contoId || !q.data) return <>[Nessun conto selezionato]</>;
  if (!q.data.destinazioni.length) {
    return (
      <>
        [Nessuna destinazione disponibile per il cliente{" "}
        {q.data.humanReadableID}]
      </>
    );
  }
  const contoData = q.data;

  return (
    <DestinazioneRealInput
      conto={contoData}
      value={props.value}
      frozen={props.frozen}
      onChange={props.onChange}
    />
  );
}

export function DestinazioneRealInput(props: {
  conto: ContiGet;
  value: string | null;
  frozen?: boolean;
  onChange: (val: string | null) => void;
}) {
  const useDestinazioneLookup = useArrLookup({
    arr: props.conto.destinazioni,
    key: "DestinazioniLookup",
    arrKey: props.conto.ID,
  });
  return (
    <DestinazioneInputComponent
      frozen={props.frozen}
      mode={"Select"}
      displayedIDComputer={(id) => DestinazioneID.parse(id).ddcoddes}
      dataSource={props.conto.destinazioni}
      descriptionComputer={(obj) => obj.ddnomdes}
      extendedDescription={ExtendedDescription}
      value={props.value}
      onChange={props.onChange}
      lookupHook={useDestinazioneLookup}
    />
  );
}

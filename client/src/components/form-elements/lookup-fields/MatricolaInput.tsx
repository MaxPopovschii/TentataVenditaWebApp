import { UseFormReturn, useWatch } from "react-hook-form";
import React, { useEffect } from "react";
import {
  AutocompleteInput,
  useArrLookup,
} from "../autocomplete-system/AutocompleteInput";
import { MatricolaID } from "common";
import { ArticoliView, MatricolaBasicGet } from "../../../services/openapi";
import { useArticolo } from "../../../data-retrieval/general/useArticolo";
import { useMatricola } from "../../../data-retrieval/general/useMatricola";

type TConfig = {
  basicItemType: MatricolaBasicGet;
  fullItemType: MatricolaBasicGet;
  idType: string;
};

const MatricolaInputComponent = AutocompleteInput<TConfig>;

export function MatricolaInput(props: {
  value: string | null;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
  onChange: (val: string | null) => void;
  form?: UseFormReturn<any>;
  articoloFieldName?: string;
  articoloId?: string;
}) {
  if (props.form && props.articoloFieldName)
    return (
      <MatricolaFormInput
        value={props.value}
        frozen={props.frozen}
        displayMode={props.displayMode}
        onChange={props.onChange}
        form={props.form}
        articoloFieldName={props.articoloFieldName}
      />
    );
  return (
    <MatricolaDataGridInput
      value={props.value}
      frozen={props.frozen}
      displayMode={props.displayMode}
      onChange={props.onChange}
      articoloId={props.articoloId ?? null}
    />
  );
}

export function MatricolaRealInput(props: {
  articolo: ArticoliView;
  value: string | null;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
  onChange: (val: string | null) => void;
}) {
  return (
    <>
      {props.articolo.matricolaId ? (
        <SearchWithMatricolaId {...props} />
      ) : (
        <SearchWithArticoloId {...props} />
      )}
    </>
  );
}

function SearchWithArticoloId(props: {
  articolo: ArticoliView;
  value: string | null;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
  onChange: (val: string | null) => void;
}) {
  const useMatricolaLookup = useArrLookup({
    arr: props.articolo.matricole,
    key: "MatricolaLookup",
    arrKey: props.articolo.ID,
  });
  return (
    <MatricolaInputComponent
      frozen={props.frozen}
      mode={"Select"}
      displayedIDComputer={(id) => MatricolaID.parse(id).amcodice}
      dataSource={props.articolo.matricole}
      descriptionComputer={(obj) =>
        obj.amcodmag ? "Magazzino: " + obj.amcodmag.toString() : obj.amcodice
      }
      value={props.value}
      onChange={props.onChange}
      displayMode={props.displayMode ?? undefined}
      lookupHook={useMatricolaLookup}
    />
  );
}

function SearchWithMatricolaId(props: {
  articolo: ArticoliView;
  value: string | null;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
  onChange: (val: string | null) => void;
}) {
  const dsMatricola = useMatricola({ id: props.articolo.matricolaId });
  const useMatricolaLookup = useArrLookup({
    arr: [dsMatricola.data!],
    key: "MatricolaLookup",
    arrKey: props.articolo.matricolaId,
  });
  return (
    <MatricolaInputComponent
      frozen={props.frozen}
      mode={"Select"}
      displayedIDComputer={(id) => MatricolaID.parse(id).amcodice}
      dataSource={[dsMatricola.data!]}
      descriptionComputer={(obj) =>
        obj.amcodmag ? "Magazzino: " + obj.amcodmag.toString() : obj.amcodice
      }
      value={props.value}
      onChange={props.onChange}
      displayMode={props.displayMode ?? undefined}
      lookupHook={useMatricolaLookup}
    />
  );
}

function MatricolaStandardFlow(props: {
  value: string | null;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
  onChange: (val: string | null) => void;
  articoloId: string | null;
}) {
  const q = useArticolo({ id: props.articoloId });

  useEffect(() => {
    if (!props.value) return;
    if (!props.articoloId) props.onChange(null);
    if (!q.isSuccess) return;
    if (!q.data?.matricole.some((el) => el.ID === props.value)) {
      props.onChange(null);
    }
  }, [q.isSuccess, q.data, props.articoloId, props.value]);

  if (q.isLoading) return <>[Caricamento delle matricole in corso...]</>;
  if (!q.isSuccess) return <>[Errore nel recupero delle matricole]</>;
  if (!props.articoloId || !q.data) return <>[Nessun articolo selezionato]</>;
  if (!q.data.matricole.length) {
    return (
      <>
        [Nessuna matricola disponibile per l'articolo {q.data.humanReadableID}]
      </>
    );
  }
  const articoloData = q.data;

  return (
    <MatricolaRealInput
      articolo={articoloData}
      value={props.value}
      frozen={props.frozen}
      onChange={props.onChange}
      displayMode={props.displayMode}
    />
  );
}

function MatricolaFormInput(props: {
  value: string | null;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
  onChange: (val: string | null) => void;
  form: UseFormReturn<any>;
  articoloFieldName: string;
}) {
  const articoloId: string | null = useWatch({
    control: props.form.control,
    name: props.articoloFieldName,
  });

  return (
    <MatricolaStandardFlow
      value={props.value}
      frozen={props.frozen}
      displayMode={props.displayMode}
      onChange={props.onChange}
      articoloId={articoloId}
    ></MatricolaStandardFlow>
  );
}

function MatricolaDataGridInput(props: {
  value: string | null;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
  onChange: (val: string | null) => void;

  articoloId: string | null;
}) {
  return (
    <MatricolaStandardFlow
      value={props.value}
      frozen={props.frozen}
      displayMode={props.displayMode}
      onChange={props.onChange}
      articoloId={props.articoloId}
    ></MatricolaStandardFlow>
  );
}

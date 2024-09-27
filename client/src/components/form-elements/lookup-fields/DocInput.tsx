import { UseFormReturn, useWatch } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";
import { DestinazioneID } from "common";
import { DocBasicLookup, DocLookup } from "../../../services/openapi";
import {
  getDocDS,
  useDoc,
  useDocLookup,
} from "../../../data-retrieval/general/useDoc";
import DocMastLookupModal from "../../../lookup-modals/DocMastLookupModal";
import NiceModal from "@ebay/nice-modal-react";

type TConfig = {
  basicItemType: DocBasicLookup;
  fullItemType: DocLookup;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

function ExtendedDescription({ item }: { item: DocLookup | null | undefined }) {
  if (!item) return null;
  return (
    <>
      <div>
        {item.mvalfdoc}/{item.mvnumfat} del {item.mvdatdoc}
      </div>
    </>
  );
}

export function DocInput(props: {
  value: string | null;
  frozen?: boolean;
  onChange: (val: string | null) => void;
  form: UseFormReturn<any>;
  contoFieldName: string;
  causali: string[] | null;
  displayMode?: "EDIT" | "SHOW";
}) {
  const contoId: string | null = useWatch({
    control: props.form.control,
    name: props.contoFieldName,
  });
  const q = useDoc({ id: props.value });
  useEffect(() => {
    if (!props.value) return;
    if (!contoId) props.onChange(null);
    if (!q.data) return;
    if (q.data.idConto !== contoId) {
      props.onChange(null);
    }
  }, [q.isSuccess, q.data, contoId, props.value]);
  if (!contoId) return <>[Nessun conto selezionato]</>;
  return (
    <MyInput
      contoId={contoId}
      causali={props.causali}
      value={props.value}
      frozen={props.frozen}
      displayMode={props.displayMode}
      onChange={props.onChange}
    />
  );
}

export function MyInput(props: {
  value: string | null;
  frozen?: boolean;
  onChange: (val: string | null) => void;
  causali: string[] | null;
  contoId: string;
  displayMode?: "EDIT" | "SHOW";
}) {
  const ds = useMemo(
    () => getDocDS({ causali: props.causali, idConto: props.contoId }),
    [props.causali, props.contoId],
  );
  return (
    <InputComponent
      frozen={props.frozen}
      mode={"Autocomplete"}
      displayedIDComputer={(id) => id}
      dataSource={ds}
      descriptionComputer={(obj) =>
        `${obj.mvnumdoc} / ${obj.mvalfdoc} del ${obj.mvdatdoc}`
      }
      value={props.value}
      onChange={props.onChange}
      displayMode={props.displayMode}
      lookupHook={useDocLookup}
      advancedLookup={() =>
        NiceModal.show(DocMastLookupModal(), {
          contoId: props.contoId,
          causali: props.causali,
        })
      }
    />
  );
}

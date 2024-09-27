import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Autocomplete } from "devextreme-react/autocomplete";
import { SelectBox } from "devextreme-react/select-box";
import AutocompleteItem from "./AutocompleteItem";
import DataSource from "devextreme/data/data_source";
import { AutocompleteValueDescription } from "./AutocompleteValueDescription";
import { IconLensTool } from "../IconLensTool";
import {
  BaseItemType,
  LookupHook,
} from "../../../data-retrieval/HookInterfaces";
import _ from "lodash";
import AutocompleteContainer from "./AutocompleteFieldContainer";
import { useQuery } from "@tanstack/react-query";

export interface AutoCompleteConfig {
  basicItemType: BaseItemType;
  fullItemType: BaseItemType;
  idType: string | number;
}

export type AutocompleteInputProps<Config extends AutoCompleteConfig> = {
  frozen?: boolean;
  value: Config["idType"] | null;
  onChange: (val: Config["idType"] | null) => void;
  displayMode?: "SHOW" | "EDIT";
  displayedIDComputer: (id: Config["idType"]) => string;
  itemRender?: (obj: Config["basicItemType"]) => ReactNode;
  descriptionComputer: (obj: Config["basicItemType"]) => string | null;
  lookupHook: LookupHook<Config["fullItemType"]>;
  dataSource: DataSource<Config["basicItemType"]> | Config["basicItemType"][];
  extendedDescription?: FC<{
    item: Config["fullItemType"] | null | undefined;
  }>;
  mode: "Autocomplete" | "Select";
  advancedLookup?: () => Promise<string>;
  inputRef?: any;
};

export function useArrLookup<T extends { humanReadableID: string }>({
  arrKey,
  arr,
  key,
}: {
  arrKey: any;
  arr: T[];
  key: string;
}) {
  return (query: string) =>
    useQuery({
      queryKey: ["arrLookup", key, arrKey, query],
      queryFn: async () => {
        if (!query) return null;
        const result = arr.find((el) => el.humanReadableID === query);
        if (result) return result;
        throw new Error("Result could not be found");
      },
    });
}

export function AutocompleteInput<Config extends AutoCompleteConfig>(
  props: AutocompleteInputProps<Config>
) {
  //Funzioni helper, per la conversione tra stato interno ed esterno
  const autocompleteRef = useRef<Autocomplete | null>(null);

  const idExtractor = (data: Config["basicItemType"]) => data.ID;

  function computeValueToRender() {
    return props.value ? props.displayedIDComputer(props.value.toString()) : "";
  }
  function IDComputer(data: Config["basicItemType"]): string {
    return props.displayedIDComputer(idExtractor(data));
  }

  // Logica di stato
  const [fieldValue, setFieldValue] = useState<string>(computeValueToRender);

  const selectedItem = props.lookupHook(fieldValue.trim());

  /*useEffect(() => {
    //TODO: Che senso ha?
    //autocompleteRef.current?.instance.repaint();
    //if (selectedItem.data) autocompleteRef.current?.instance.focus();
  }, [!!selectedItem.data]);*/

  // Logica di sincronizzazione passiva
  // Quando cambia il valore esterno (props.value), va aggiornato il valore interno (cioè fieldValue, il contenuto del campo di test)
  useEffect(() => {
    const valueToRender = computeValueToRender();
    if (fieldValue !== valueToRender) {
      console.log("Acquiring value from props:", props.value);
      setFieldValue(valueToRender);
    } else {
      console.log(
        "Acquiring value from props skipped, because fieldValue and valueToRender are identical, equal to:",
        fieldValue
      );
    }
  }, [props.value]);

  // Logica di sincronizzazione attiva
  // Quando cambia selectedItemID (calcolato a partire dal valore interno fieldValue), va aggiornato il valore esterno (chiamando props.onChange)

  useEffect(() => {
    //if (selectedItem.isLoading) return;
    const valueToNotify =
      (selectedItem.data && idExtractor(selectedItem.data)) ?? null;

    console.log(
      "use effect field Value",
      fieldValue,
      fieldValue.split("****").length
    );
    if (fieldValue.split("****").length > 1) {
      props.onChange(fieldValue);
    } else if (selectedItem.isLoading) {
      return;
    } else if (!_.isEqual(valueToNotify, props.value)) {
      console.log("Notifying value", valueToNotify);
      props.onChange(valueToNotify);
    } else {
      console.log(
        "No value should be notified, since",
        valueToNotify,
        "and",
        props.value,
        "coincide"
      );
    }
  }, [selectedItem.data, selectedItem.isSuccess, fieldValue]);

  // LOGICA DI RENDERING
  const itemRender =
    props.itemRender ??
    ((data: Config["basicItemType"]) => {
      return (
        <AutocompleteItem
          id={IDComputer(data)}
          description={props.descriptionComputer(data)}
        />
      );
    });
  if (props.displayMode == "SHOW") {
    if (selectedItem.data) {
      return (
        <div>
          <strong>{props.displayedIDComputer(selectedItem.data.ID)}</strong> -{" "}
          {props.descriptionComputer(selectedItem.data)}
        </div>
      );
    } else {
      return null;
    }
  }
  const input =
    props.mode === "Autocomplete" ? (
      <Autocomplete
        disabled={props.frozen}
        dataSource={props.dataSource}
        itemRender={itemRender}
        value={fieldValue}
        valueExpr={"humanReadableID"}
        onValueChanged={(e) => {
          const newValue =
            typeof e.value === "string"
              ? e.value
              : e?.value && IDComputer(e.value);
          console.log("Value selected was", newValue);
          setFieldValue(newValue ?? "");
        }}
        ref={(ref) => {
          autocompleteRef.current = ref;
          if (props.inputRef) {
            props.inputRef.current = ref;
          }
        }}
        dropDownOptions={{
          width: "50vw",
          minHeight: "10vh",
          wrapperAttr: {
            selectionMade: !!selectedItem.data,
          },
        }}
        height={25}
        showClearButton={true}
        className={"autocomplete-input"}
      />
    ) : (
      <SelectBox
        disabled={props.frozen}
        dataSource={props.dataSource}
        itemRender={itemRender}
        value={fieldValue ? fieldValue : null}
        searchEnabled={false}
        valueExpr={"humanReadableID"}
        displayExpr={"humanReadableID"}
        dropDownOptions={{
          width: "50vw",
        }}
        height={25}
        onValueChanged={(ev) => {
          setFieldValue(ev.value ?? "");
        }}
        showClearButton={true}
        ref={(ref) => {
          if (props.inputRef) props.inputRef.current = ref;
        }}
      />
    );
  const tools = props.advancedLookup ? (
    <IconLensTool
      disabled={props.frozen}
      onClick={async () => {
        if (!props.advancedLookup) return;
        try {
          const lookupResult = await props.advancedLookup();
          console.log("Lookup has completed with result", lookupResult);
          props.onChange(lookupResult);
        } catch (e) {
          console.error(e);
        }
      }}
    />
  ) : null;
  const description = (
    <AutocompleteValueDescription
      selectedItem={selectedItem}
      descriptionComputer={props.descriptionComputer}
    />
  );
  const extendedDescription =
    selectedItem.data && props.extendedDescription ? (
      <props.extendedDescription item={selectedItem?.data} />
    ) : null;
  return (
    <AutocompleteContainer
      input={input}
      valueDescription={description}
      valueExtendedDescription={extendedDescription}
      inputTools={tools}
    />
  );
}

import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

export function AutocompleteValueDescription<InputType>({
  selectedItem,
  descriptionComputer,
}: {
  selectedItem: UseQueryResult<InputType | null>;
  descriptionComputer: (data: InputType) => string | null;
}) {
  return (
    <>
      {selectedItem.isLoading ? (
        "Ricerca in corso..."
      ) : selectedItem.isError ? (
        <span className={"autocomplete-not-found"}>Non trovato</span>
      ) : (
        selectedItem.data && descriptionComputer(selectedItem.data)
      )}
      &nbsp;
    </>
  );
}

import React from "react";
interface AutocompleteItemProps {
  id: string;
  description: string | null;
}

export default function AutocompleteItem(props: AutocompleteItemProps) {
  return (
    <div className="autocomplete-item">
      <div className="id">{props.id}</div>
      <div className="description">{props.description}</div>
    </div>
  );
}

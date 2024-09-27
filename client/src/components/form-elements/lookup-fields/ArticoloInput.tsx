import React, { useEffect } from "react";
import { AutocompleteInput } from "../autocomplete-system/AutocompleteInput";

import {
  articoloDS,
  useArticoloKeyArt,
  useArticoloLookup,
} from "../../../data-retrieval/general/useArticolo";
import { ArticoliView } from "../../../services/openapi";
import { DateRange } from "@mui/icons-material";
import { MatricolaID } from "../../../../../common/dist";

type TConfig = {
  basicItemType: ArticoliView;
  fullItemType: ArticoliView;
  idType: string;
};

const InputComponent = AutocompleteInput<TConfig>;

export function ArticoloInput({
  value,
  onChange,
  displayMode,
  frozen,
  keyArt,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
  frozen?: boolean;
  displayMode?: "EDIT" | "SHOW";
  keyArt?: string;
}) {
  const id = keyArt ?? null;

  const { data: articolo } = useArticoloKeyArt({ id });
  const desiredValue = articolo === null ? null : articolo?.ID;
  useEffect(() => {
    if (
      desiredValue != value &&
      desiredValue !== undefined &&
      keyArt !== undefined
    ) {
      console.log(
        "Triggering change, because",
        value,
        "is not equal to",
        desiredValue
      );
      onChange(desiredValue);
    }
  }, [desiredValue, value]);

  return (
    <InputComponent
      displayedIDComputer={(id) => id}
      descriptionComputer={(obj) => obj.ardesart}
      frozen={frozen}
      dataSource={articoloDS}
      displayMode={displayMode}
      lookupHook={useArticoloLookup}
      itemRender={(data) => <RenderArticoliList data={data} />}
      mode={"Autocomplete"}
      value={value}
      onChange={onChange}
    />
  );
}

function RenderArticoliList({ data }: { data: ArticoliView }) {
  let amcodice = "";
  if (data.matricolaId) {
    amcodice = MatricolaID.parse(data.matricolaId).amcodice;
  }
  return (
    <>
      <div className="autocomplete-item">
        <div className="id">{data.ID.split(" ")[0]}</div>
        <div className="description">
          {data.ardesart}
          {data.matricolaId && <div style={{}}>matricola: {amcodice}</div>}
        </div>
      </div>
    </>
  );
}

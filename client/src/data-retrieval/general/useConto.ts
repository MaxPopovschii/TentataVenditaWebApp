import { DefaultService, ContiBasicGet } from "../../services/openapi";
import { ContoID } from "common";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";

const lookupRegexp = /^[0-9]+$/g;

export const getClientiDS = (tipoConto: "C" | "F" = "C") =>
  new DataSource<ContiBasicGet>({
    load: async (loadOptions) => {
      return DefaultService.contiControllerSearchConti({
        searchValue: loadOptions.searchValue!,
        skip: loadOptions.skip!,
        take: loadOptions.take!,
        antipcon: tipoConto,
      });
    },
    byKey: async (obj) => {
      return DefaultService.contiControllerGetConto({
        id: obj.ID,
      });
    },
  });

export function clienteLookupIdExtractor(
  query: string | null,
  tipoConto: "F" | "C" = "C"
) {
  return !query || !query.match(lookupRegexp)
    ? null
    : ContoID.compute({
        ancodice: query,
        antipcon: tipoConto,
      });
}

export function useConto({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.contiControllerGetConto,
  });
}

export function useContoLookup(tipoConto: "C" | "F" = "C") {
  return (query: string) => {
    const id = clienteLookupIdExtractor(query, tipoConto);
    return useConto({ id });
  };
}

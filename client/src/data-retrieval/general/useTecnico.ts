import {
  DefaultService,
  ContiBasicGet,
  TecniciBasic,
  TecniciInputView,
} from "../../services/openapi";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";

const lookupRegexp = /^[0-9]+$/g;

export const getTecniciDS = () =>
  new DataSource<TecniciInputView>({
    load: async (loadOptions) => {
      return DefaultService.tecniciControllerSearchTecnici({
        searchValue: loadOptions.searchValue!,
        skip: loadOptions.skip!,
        take: loadOptions.take!,
      });
    },
    byKey: async (obj) => {
      return DefaultService.tecniciControllerGetTecnico({
        id: obj.ID,
      });
    },
  });

export function useTecnico({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.tecniciControllerGetTecnico,
  });
}

export function TecnicoLookupIdExtractor(query: string | null) {
  return !query ? null : query;
}

export function useTecnicoLookup(query: string) {
  const id = TecnicoLookupIdExtractor(query);
  return useTecnico({ id });
}

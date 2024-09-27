import {
  ArticoliView,
  DefaultService,
  MagazzinoView,
} from "../../services/openapi";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";

export const magazzinoDS = new DataSource<MagazzinoView>({
  load: async (loadOptions) => {
    return DefaultService.magazzinoControllerSearch({
      searchValue: loadOptions.searchValue!,
      skip: loadOptions.skip!,
      take: loadOptions.take!,
    });
  },
  byKey: async (obj) => {
    return DefaultService.magazzinoControllerGet({
      id: obj.ID,
    });
  },
});

export function useMagazzino({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.magazzinoControllerGet,
  });
}

export function magazzinoLookupIdExtractor(query: string | null) {
  return !query ? null : query;
}

export function useMagazzinoLookup(query: string) {
  const id = magazzinoLookupIdExtractor(query);
  return useMagazzino({ id });
}

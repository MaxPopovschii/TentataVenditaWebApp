import {
  DefaultService,
  ScontiModelliBasicLookup,
} from "../../services/openapi";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";

const lookupRegexp = /^[0-9]+$/g;

export const modelliScontoDS = new DataSource<ScontiModelliBasicLookup>({
  load: async (loadOptions) => {
    return DefaultService.scontiModelliControllerSearch({
      searchValue: loadOptions.searchValue!,
      skip: loadOptions.skip!,
      take: loadOptions.take!,
    });
  },
  byKey: async (obj) => {
    return DefaultService.scontiModelliControllerGet({
      id: obj.ID,
    });
  },
});

export function useModelloSconto({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.scontiModelliControllerGet,
  });
}

export function clienteLookupIdExtractor(query: string | null) {
  return !query ? null : query;
}

export function useModelloScontoLookup(query: string) {
  const id = clienteLookupIdExtractor(query);
  return useModelloSconto({ id });
}

import { DefaultService, FamArtiBasic } from "../../services/openapi";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";

const lookupRegexp = /^[0-9]+$/g;

export const attrezzatureDS = new DataSource<FamArtiBasic>({
  load: async (loadOptions) => {
    return DefaultService.attrezzatureControllerSearch({
      searchValue: loadOptions.searchValue!,
      skip: loadOptions.skip!,
      take: loadOptions.take!,
    });
  },
  byKey: async (obj) => {
    return DefaultService.attrezzatureControllerGet({
      id: obj.ID,
    });
  },
});

export function useAttrezzatura({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.attrezzatureControllerGet,
  });
}

export function attrezzaturaLookupIdExtractor(query: string | null) {
  return !query ? null : query;
}

export function useAttrezzaturaLookup(query: string) {
  const id = attrezzaturaLookupIdExtractor(query);
  return useAttrezzatura({ id });
}

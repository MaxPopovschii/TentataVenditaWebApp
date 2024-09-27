import { DefaultService } from "../../services/openapi";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";
import { GrupmercView } from "../../services/openapi";

export const gruppoMerceologicoDS = new DataSource<GrupmercView>({
  load: async (loadOptions) => {
    return DefaultService.gruppoMerceologicoControllerSearch({
      searchValue: loadOptions.searchValue!,
      skip: loadOptions.skip!,
      take: loadOptions.take!,
    });
  },
  byKey: async (obj) => {
    return DefaultService.gruppoMerceologicoControllerGet({
      id: obj.ID,
    });
  },
});

export function useGruppoMerceologico({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.gruppoMerceologicoControllerGet,
  });
}

export function gruppoMerceologicoLookupIdExtractor(query: string | null) {
  return !query ? null : query;
}

export function useGruppoMerceologicoLookup(query: string) {
  const id = gruppoMerceologicoLookupIdExtractor(query);
  return useGruppoMerceologico({ id });
}

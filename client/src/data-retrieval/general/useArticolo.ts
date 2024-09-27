import { ArticoliView, DefaultService } from "../../services/openapi";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";

export const articoloDS = new DataSource<ArticoliView>({
  load: async (loadOptions) => {
    return DefaultService.articoliControllerSearch({
      searchValue: loadOptions.searchValue!,
      skip: loadOptions.skip!,
      take: loadOptions.take!,
    });
  },
  byKey: async (obj) => {
    return DefaultService.articoliControllerGet({
      id: obj.ID,
    });
  },
});

export function useArticolo({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.articoliControllerGet,
  });
}

export function articoloLookupIdExtractor(query: string | null) {
  return !query ? null : query;
}

export function useArticoloLookup(query: string) {
  const id = articoloLookupIdExtractor(query);
  return useArticolo({ id: id });
}

export function useArticoloKeyArt({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.articoliControllerGetByKeyArt,
  });
}

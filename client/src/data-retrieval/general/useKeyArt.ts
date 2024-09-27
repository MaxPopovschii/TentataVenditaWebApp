import {
  ArticoliView,
  DefaultService,
  KeyArtView,
} from "../../services/openapi";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";

export const keyArtDS = new DataSource<KeyArtView>({
  load: async (loadOptions) => {
    return DefaultService.keyArtControllerSearch({
      searchValue: loadOptions.searchValue!,
      skip: loadOptions.skip!,
      take: loadOptions.take!,
    });
  },
  byKey: async (obj) => {
    return DefaultService.keyArtControllerGet({
      id: obj.ID,
    });
  },
});

export function useKeyArt({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.keyArtControllerGet,
  });
}

export function keyArtLookupIdExtractor(query: string | null) {
  return !query ? null : query;
}

export function useKeyArtLookup(query: string) {
  const id = keyArtLookupIdExtractor(query);
  return useKeyArt({ id });
}

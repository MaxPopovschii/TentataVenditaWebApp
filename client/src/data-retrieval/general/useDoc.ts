import { DefaultService, DocBasicLookup } from "../../services/openapi";
import DataSource from "devextreme/data/data_source";
import { useEntity } from "../useEntity";

const lookupRegexp = /^[0-9]+$/g;

export const getDocDS = (props: {
  causali: string[] | null;
  idConto: string;
}) =>
  new DataSource<DocBasicLookup>({
    load: async (loadOptions) => {
      return DefaultService.docControllerSearch({
        searchValue: loadOptions.searchValue!,
        skip: loadOptions.skip!,
        take: loadOptions.take!,
        causali: props.causali?.join(",") ?? null,
        idConto: props.idConto,
      });
    },
    byKey: async (obj) => {
      return DefaultService.docControllerGet({
        id: obj.ID,
      });
    },
  });

export function useDoc({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.docControllerGet,
  });
}

export function useDocLookup(query: string) {
  const id = query;
  return useDoc({ id });
}

export function useRigheDocuemnto({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.docControllerGetDettagiDoc,
  });
}

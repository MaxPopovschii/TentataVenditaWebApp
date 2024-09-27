import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { CancelablePromise } from "../services/openapi";

type UseDataProps<T> = {
  id: string | null | number;
  queryKeyPrefix?: any;
  getter: (props: { id: string | number }) => CancelablePromise<T>;
};

export function useEntity<T>(props: UseDataProps<T>) {
  return useQuery(getOpts(props));
}

export function useEntityForEdit<T>(
  props: UseDataProps<T> & { editProcedureId: string },
) {
  props.queryKeyPrefix =
    props.queryKeyPrefix === undefined
      ? props.getter.name
      : props.queryKeyPrefix;
  if (!props.queryKeyPrefix) throw new Error("Query key prefix not setup");
  const queryClient = useQueryClient();
  return useSuspenseQuery({
    queryFn: () => queryClient.fetchQuery(getOpts(props)),
    queryKey: [props.queryKeyPrefix, props.id, props.editProcedureId],
  });
}

type UseGeneratedIDProps<T, IdType extends string | number, ReturnedIdType> = {
  id: string | null | number;
  queryKeyPrefix?: any;
  idGenerator: () => CancelablePromise<ReturnedIdType>;
};

export function useGeneratedID<
  T,
  IdType extends string | number,
  ReturnedIdType,
>(
  props: UseGeneratedIDProps<T, IdType, ReturnedIdType> & {
    editProcedureId: string;
  },
) {
  props.queryKeyPrefix =
    props.queryKeyPrefix === undefined
      ? props.idGenerator.name
      : props.queryKeyPrefix;
  if (!props.queryKeyPrefix) throw new Error("Query key prefix not setup");
  const queryClient = useQueryClient();
  return useSuspenseQuery({
    queryFn: () => queryClient.fetchQuery(getOptsGenerateID(props)),
    queryKey: [props.queryKeyPrefix, props.id, props.editProcedureId],
  }).data;
}

export function useSuspenseEntity<T>(props: UseDataProps<T>) {
  return useSuspenseQuery(getOpts(props));
}
function getOpts<T>({ queryKeyPrefix, id, getter }: UseDataProps<T>) {
  queryKeyPrefix = queryKeyPrefix === undefined ? getter.name : queryKeyPrefix;
  if (!queryKeyPrefix) throw new Error("Query key prefix not setup");
  return {
    queryKey: [queryKeyPrefix, id],
    queryFn: async ({ signal }) => {
      if (!id) return null;
      const promise = getter({
        id,
      });
      signal?.addEventListener("abort", () => promise.cancel());
      return promise;
    },
  };
}

function getOptsGenerateID<T, IdType extends string | number, ReturnedIdType>({
  queryKeyPrefix,
  id,
  idGenerator,
}: UseGeneratedIDProps<T, IdType, ReturnedIdType>) {
  queryKeyPrefix =
    queryKeyPrefix === undefined ? idGenerator.name : queryKeyPrefix;
  if (!queryKeyPrefix) throw new Error("Query key prefix not setup");
  return {
    queryKey: [queryKeyPrefix, id],
    queryFn: async ({ signal }) => {
      if (id) return null;
      const promise = idGenerator();
      signal?.addEventListener("abort", () => promise.cancel());
      return promise;
    },
  };
}

import { UseQueryResult } from "@tanstack/react-query";
export type BaseItemType = Record<string, any> & {
  ID: string | number;
  humanReadableID: string;
};
export type LookupHook<T extends BaseItemType> = (
  query: string
) => UseQueryResult<T | null, Error>;

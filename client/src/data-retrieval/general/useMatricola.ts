import { DefaultService } from "../../services/openapi";
import { useEntity } from "../useEntity";

export function useMatricola({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.matricoleControllerGetConto,
  });
}

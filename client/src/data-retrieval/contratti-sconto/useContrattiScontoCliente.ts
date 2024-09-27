import { DefaultService } from "../../services/openapi";
import { useEntity } from "../useEntity";

export function useContrattiScontoCliente({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.scontiContrattiControllerGetSearchContrattiByConto,
  });
}

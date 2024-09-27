import { DefaultService } from "../../services/openapi";
import { useEntity } from "../useEntity";

export function useDettagliContrattoSconto({ id }: { id: string | null }) {
  return useEntity({
    id,
    getter: DefaultService.scontiContrattiControllerGetRigheContratto,
  });
}

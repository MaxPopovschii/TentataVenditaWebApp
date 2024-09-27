import { Controller, useForm } from "react-hook-form";
import { ClienteInput } from "./components/form-elements/lookup-fields/ClienteInput";
import FieldContainer from "./components/form-elements/FieldContainer";
import React from "react";
import { DocInput } from "./components/form-elements/lookup-fields/DocInput";

export default function TestForm() {
  const form = useForm();
  return (
    <div>
      <Controller
        control={form.control}
        name={"idCliente"}
        render={({ field }) => (
          <FieldContainer
            label={"Cliente:"}
            input={<ClienteInput frozen={false} {...field} />}
          />
        )}
      />
      <Controller
        control={form.control}
        name={"idDocumento"}
        render={({ field }) => (
          <FieldContainer
            label={"Documento:"}
            input={
              <DocInput
                frozen={false}
                {...field}
                contoFieldName={"idCliente"}
                causali={["XSMCV"]}
                form={form}
              />
            }
          />
        )}
      />
    </div>
  );
}

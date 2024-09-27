import { useSuspenseQuery } from "@tanstack/react-query";
import DataGrid, {
  Column,
  FilterRow,
  Format,
  HeaderFilter,
  Scrolling,
  Search,
  Selection,
} from "devextreme-react/data-grid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { DefaultService } from "../../services/openapi";
import { CheckBox, DateBox, TextBox } from "devextreme-react";
import FieldContainer from "../../components/form-elements/FieldContainer";
import ViewScreenMat from "../../screen-templates/ViewScreenMat";
import { Button } from "devextreme-react";
import { colors } from "../../assets/colors";

interface FormInterface {
  dataStart: Date | null;
  dataEnd: Date | null;
  dataDoc: Date | null;
  codAgeStart: string | null;
  codAgeEnd: string | null;
  registrato: boolean;
}

export default function () {
  const [sendGet, setSendGet] = useState<boolean>(false);
  function getFirstAndLast(): { firstDay: Date; lastDay: Date } {
    const today: Date = new Date();
    const firstDayOfThisMonth: Date = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const lastDayOfLastMonth: Date = new Date(
      firstDayOfThisMonth.getTime() - 1
    );
    const firstDayOfLastMonth: Date = new Date(
      lastDayOfLastMonth.getFullYear(),
      lastDayOfLastMonth.getMonth(),
      1
    );
    const lastDayOfMonth: Date = new Date(
      firstDayOfLastMonth.getFullYear(),
      firstDayOfLastMonth.getMonth() + 1,
      0
    );
    return {
      firstDay: firstDayOfLastMonth,
      lastDay: lastDayOfMonth,
    };
  }
  const { firstDay, lastDay } = getFirstAndLast();
  const form = useForm<FormInterface>({
    defaultValues: {
      dataStart: firstDay,
      dataEnd: lastDay,
      dataDoc: new Date(),
      codAgeStart: "",
      codAgeEnd: "",
      registrato: true,
    },
  });

  const dataStart =
    useWatch({ control: form.control, name: "dataStart" }) ?? undefined;
  const dataEnd =
    useWatch({ control: form.control, name: "dataEnd" }) ?? undefined;
  const dataDoc =
    useWatch({ control: form.control, name: "dataDoc" }) ?? undefined;
  const codAgeStart =
    useWatch({ control: form.control, name: "codAgeStart" }) ?? undefined;
  const codAgeEnd =
    useWatch({ control: form.control, name: "codAgeEnd" }) ?? undefined;
  const registrato =
    useWatch({ control: form.control, name: "registrato" }) ?? undefined;

  useEffect(() => {
    setSendGet(false);
  }, [dataStart, dataEnd, dataDoc, codAgeStart, codAgeEnd, registrato]);
  const DataGridRef = useRef<DataGrid | null>(null);

  const list = (
    <MaturazioniDataGrid
      DataGridRef={DataGridRef}
      dataStart={dataStart}
      dataEnd={dataEnd}
      dataDoc={dataDoc}
      codAgeStart={codAgeStart}
      codAgeEnd={codAgeEnd}
      registrato={registrato}
    />
  );
  const filtri = (
    <>
      <div style={{ padding: 5, marginLeft: "5px", marginRight: "5px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, marginRight: 25 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Controller
                control={form.control}
                name={"dataStart"}
                render={({ field }) => (
                  <FieldContainer
                    label={"Dalla data incasso:"}
                    input={
                      <DateBox
                        height={25}
                        displayFormat="dd/MM/yyyy"
                        value={field.value!}
                        onValueChanged={(val) => field.onChange(val.value)}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={form.control}
                name={"dataEnd"}
                render={({ field }) => (
                  <FieldContainer
                    label={"Alla data incasso:"}
                    input={
                      <DateBox
                        height={25}
                        displayFormat="dd/MM/yyyy"
                        value={field.value!}
                        onValueChanged={(val) => field.onChange(val.value)}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={form.control}
                name={"dataDoc"}
                render={({ field }) => (
                  <FieldContainer
                    label={"Fino alla data documento:"}
                    input={
                      <DateBox
                        height={25}
                        displayFormat="dd/MM/yyyy"
                        value={field.value!}
                        onValueChanged={(val) => field.onChange(val.value)}
                      />
                    }
                  />
                )}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Controller
                control={form.control}
                name={"codAgeStart"}
                render={({ field }) => (
                  <FieldContainer
                    label={"Dal codice agente:"}
                    input={
                      <TextBox
                        height={25}
                        value={field.value ?? undefined}
                        onValueChanged={(val) => field.onChange(val.value)}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={form.control}
                name={"codAgeEnd"}
                render={({ field }) => (
                  <FieldContainer
                    label={"Al codice agente:"}
                    input={
                      <TextBox
                        height={25}
                        value={field.value ?? undefined}
                        onValueChanged={(val) => field.onChange(val.value)}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={form.control}
                name={"registrato"}
                render={({ field }) => (
                  <FieldContainer
                    whidth={300}
                    label={
                      "Solo chiusure esequite con registrazione contabile:"
                    }
                    input={
                      <CheckBox
                        width={30}
                        value={field.value ?? undefined}
                        onValueChanged={(val) => field.onChange(val.value)}
                      />
                    }
                  />
                )}
              />
            </div>
            <div style={{ justifyContent: "flex-end", display: "flex" }}>
              <Button
                onClick={() => {
                  setSendGet(true);
                }}
                stylingMode="outlined"
                height={20}
                style={{ backgroundColor: colors.azzurro }}
              >
                <p
                  style={{
                    color: "white",
                    flex: 1,
                    fontSize: "13px",
                    fontFamily: "Open Sans",
                  }}
                >
                  CERCA
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <ViewScreenMat
      name={"Maturazioni"}
      list={list}
      filtri={filtri}
      DataGridRef={DataGridRef}
      sendGet={sendGet}
    />
  );
}
type SelectedRow = {
  mpSerial: string;
  numRow: string;
  dataMat: string;
};

function MaturazioniDataGrid({
  DataGridRef,
  dataStart,
  dataEnd,
  dataDoc,
  codAgeStart,
  codAgeEnd,
  registrato,
}: {
  DataGridRef: React.MutableRefObject<DataGrid<any, any> | null>;
  dataStart: Date | undefined;
  dataEnd: Date | undefined;
  dataDoc: Date | undefined;
  codAgeStart: string | undefined;
  codAgeEnd: string | undefined;
  registrato: boolean;
}) {
  const [selectedRows, setSelectedRows] = useState<Array<SelectedRow>>([]);
  const { data } = useSuspenseQuery({
    queryKey: [
      "maturazioniControllerList",
      dataStart,
      dataEnd,
      dataDoc,
      codAgeStart,
      codAgeEnd,
      registrato,
    ],
    queryFn: () =>
      DefaultService.maturazioniControllerList({
        dataStart,
        dataEnd,
        dataDoc,
        codAgeStart,
        codAgeEnd,
        registrato,
      }),
  });
  const handleMat = async () => {
    await DefaultService.mopDettControllerUpdate({
      requestBody: selectedRows,
    });
  };
  return (
    <>
      <div>
        <DataGrid
          dataSource={data}
          ref={DataGridRef}
          keyExpr={"serial"}
          allowColumnResizing={true}
          height={460}
          onCellPrepared={(e) => {
            if (e.rowType === "header") {
              e.cellElement.style.backgroundColor = "#A9A9A9";
              e.cellElement.style.color = "white";
              e.cellElement.style.fontWeight = "bold";
              e.cellElement.style.fontSize = "10px";
            }
            if (e.rowType === "data" && e.data.age > 30) {
              e.cellElement.style.backgroundColor = "#f9f9f9";
            }
            if (e.rowType === "data" && e.data.age <= 30) {
              e.cellElement.style.backgroundColor = "#fff";
            }
          }}
          style={{
            fontSize: "10px",
            overflow: "hidden",
          }}
          onSelectionChanged={(e) => {
            setSelectedRows(e.selectedRowsData);
          }}
        >
          <Selection
            mode="multiple"
            showCheckBoxesMode="always"
            allowSelectAll={false}
          />
          <FilterRow visible={true} applyFilter={"auto"} />
          <Scrolling mode="virtual" />
          <Column dataField="desAge" caption="AGENTE" alignment="center" />
          <Column
            dataField="codiceCon"
            caption="COD CLI"
            alignment="center"
          ></Column>
          <Column
            dataField="descrizione"
            caption="RAGIONE SOCIALE"
            alignment="center"
          />
          <Column
            dataField="dataReg"
            caption="DATA REG"
            format="dd/MM/yyyy"
            dataType="date"
            alignment="center"
          ></Column>
          <Column
            dataField="numPnt"
            caption="NUM REG"
            alignment="center"
          ></Column>
          <Column dataField="numDoc" caption="NUM DOC" alignment="center" />
          <Column
            dataField="alfDoc"
            caption="ALFA DOC"
            alignment="center"
          ></Column>
          <Column
            dataField="dataDoc"
            caption="DATA DOC"
            dataType="date"
            format="dd/MM/yyyy"
            alignment="center"
          ></Column>
          <Column
            dataField="numberPar"
            caption="NUM PARTITA"
            alignment="center"
          ></Column>
          <Column
            dataField="dataSca"
            caption="DATA SCADENZA"
            format="dd/MM/yyyy"
            dataType="date"
            alignment="center"
          />
          <Column dataField="totImpCh" caption="IMPORTO DOC" alignment="center">
            <Format type="currency" precision={2} />
          </Column>
          <Column
            dataField="mpNumReg"
            caption="NUM PROVV"
            alignment="center"
          ></Column>
          <Column
            dataField="totImp"
            caption="IMPONIBILE"
            dataType="number"
            alignment="center"
          >
            <Format type="currency" precision={2} />
          </Column>
          <Column
            dataField="totAge"
            caption="TOT AGE"
            dataType="number"
            alignment="center"
          >
            <Format type="currency" precision={2} />
          </Column>
          <Column dataField="perPra" caption="PERC PROVV" alignment="center">
            <Format type="currency" precision={2} />
          </Column>

          <Column
            dataField="modPag"
            caption="MOD PAG CHIUS"
            alignment="center"
          ></Column>
          <Column
            dataField="modPagApe"
            caption="MOD PAG APE"
            alignment="center"
          ></Column>
        </DataGrid>
      </div>
      <div
        style={{
          justifyContent: "flex-end",
          display: "flex",
          marginTop: "10px",
          marginRight: "30px",
        }}
      >
        <Button
          onClick={() => {
            handleMat();
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }}
          stylingMode="outlined"
          height={20}
          style={{ backgroundColor: colors.azzurro }}
        >
          <p
            style={{
              color: "white",
              flex: 1,
              fontSize: "13px",
              fontFamily: "Open Sans",
            }}
          >
            {"MATURA =>"}
          </p>
        </Button>
      </div>
    </>
  );
}

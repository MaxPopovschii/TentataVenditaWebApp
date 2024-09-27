import React, { useCallback, useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import DataGrid, {
  Scrolling,
  Selection,
  FilterRow,
  Column,
} from "devextreme-react/data-grid";
import AlertDialog from "../../components/AlertDialog";
import { DateBox } from "devextreme-react";

type Agent = {
  agcodage: string;

  agdesage: string;
};

type Discount = {
  codiceTipoContratto: string;

  descrizione: string;
};

type Data = {
  operazione: string;

  simulato: string;

  data: string;

  agente: string;

  tipo_sconto: string[];
};
const RavasioSconti = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [dataForGrid, setDataForGrid] = useState([]);
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [simulation, setSimulation] = useState<boolean>(false);
  const [agent, setAgent] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [codes, setCodes] = useState<string[]>([]);
  const [data, setData] = useState<Data>({
    operazione: "elabora",
    simulato: "",
    data: "",
    agente: "",
    tipo_sconto: [],
  });
  useEffect(() => {
    const today = new Date(new Date().toISOString().split("T").shift(" "));
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(firstDay - 1).toISOString().split("T").shift(" ");
    setSelectedDate(lastDay);
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/agenti/list")
      .then((response) => response.json())
      .then((data) => {
        setAgents([{ agcodage: " ", agdesage: " " }, ...data]);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/sconti-modelli/list")
      .then((response) => response.json())
      .then((data) => {
        setDiscounts(data);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    setData({
      ...data,
      simulato: simulation.toString(),
      data: selectedDate,
      agente: agent,
      tipo_sconto: codes,
    });
  }, [simulation, selectedDate, agent, codes]);
  const handleClick = useCallback(async () => {
    try {
      await fetch("http://localhost:3000/files/ulpoad", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      })
        .then((res) => res.json())

        .catch((error) => console.error("Error", error));

      setLoading(true);

      checkFetch();

      const inter = setInterval(() => {
        checkFetch();
      }, 5000);

      setTimeout(() => {
        clearInterval(inter);
      }, 20000);
    } catch (e) {
      console.log(e);
    }
  }, [data]);
  const checkFetch = useCallback(async () => {
    await fetch("http://localhost:3000/files/esito_elaborazione_sconti.json")
      .then((response) => response.json())

      .then((data) => {
        if (!data.hasOwnProperty("msg")) {
          setDataForGrid(data);

          setLoading(false);

          setIsLoaded(true);
        } else {
          setTimeout(() => {
            setDataForGrid(data);

            setLoading(false);

            setIsLoaded(true);
          }, 20000);
        }
      });
  }, []);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgent(e.target.value);
  };
  const handleInputChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCodes([...codes, value]);
    } else {
      setCodes(codes.filter((code) => code !== value));
    }
  };

  return (
    <div style={{ padding: "0 50px" }}>
      {!isLoaded && (
        <div>
          <h4>Ravasio - Elabora Sconti Consumometro</h4>
          <div className="sconti-options" style={{ marginBottom: "20px" }}>
            <label
              style={{
                marginRight: "20px",
                display: "block",
                marginBottom: "30px",
              }}
            >
              <input
                type="checkbox"
                name="option"
                onChange={() => {
                  setSimulation(!simulation);
                }}
              />
              Simulazione (non definitivo)
            </label>
            <label
              style={{
                marginRight: "20px",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Elabora documenti alla data:
            </label>
            <DateBox
              value={selectedDate}
              pickerType="calendar"
              min={"2000-01-01"}
              max={new Date().toISOString().split("T").shift()}
              onValueChange={(val) => setSelectedDate(val)}
            ></DateBox>
          </div>
          <div className="agent-details" style={{ marginBottom: "20px" }}>
            <label
              style={{
                marginRight: "20px",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Agente:
            </label>
            <select name="agent" onChange={handleSelect}>
              {agents.map((item, index) => (
                <option
                  key={index}
                  value={item.agcodage + item.agdesage}
                  defaultValue=""
                >
                  {item.agcodage}
                  {item.agdesage}
                </option>
              ))}
            </select>
          </div>
          <div
            className="sconto-type"
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label
              style={{
                marginRight: "20px",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Tipo sconto:
            </label>
            <ul style={{ listStyleType: "none" }}>
              {discounts.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    value={item.codiceTipoContratto}
                    onChange={handleInputChange}
                    checked={codes.includes(item.codiceTipoContratto)}
                  />
                  {item.codiceTipoContratto} - {item.descrizione}
                </li>
              ))}
            </ul>
            <LoadingButton
              className="elabora-btn"
              style={{ alignSelf: "flex-end", marginLeft: "30px" }}
              onClick={handleClick}
              loading={loading}
              loadingPosition="end"
              variant="outlined"
              endIcon={<SendIcon />}
            >
              <span>Elabora</span>
            </LoadingButton>
          </div>
        </div>
      )}
      {isLoaded && <Grid data={dataForGrid} />}
    </div>
  );
};

export default RavasioSconti;

function Grid({ data }) {
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (data.hasOwnProperty("error") || data.hasOwnProperty("msg")) {
      setIsError(true);
    }
  }, [data]);
  return (
    <div className="container">
      {isError && <AlertDialog data={data} />}
      {!isError && (
        <div>
          <h2 className={"content-block"}>Ravasio Sconti</h2>
          <DataGrid
            className={"dx-card wide-card"}
            id="gridContainer"
            height={520}
            dataSource={data}
            showBorders={true}
            columnHidingEnabled={true}
            allowColumnResizing={true}
            columnResizingMode={"widget"}
          >
            <FilterRow visible={true} />
            <Scrolling mode="infinite" />
            <Selection mode="single" />

            <Column dataField="agente_nome" width={120} />
            <Column dataField="ragione_sociale" width={270} />
            <Column dataField="nr_contratto" width={70} />
            <Column dataField="descrizione_contratto" width={170} />
            <Column dataField="esito_elaborazione" width={200} />
            <Column dataField="percentuale_applicata" width={70} />
            <Column dataField="qta_targhet" width={70} />
            <Column dataField="limite_importo" width={70} />
            <Column dataField="valore_vendite_trovato" width={70} />
            <Column dataField="qta_vendite_trovata" width={70} />
            <Column dataField="prezzo_trovato" width={70} />
            <Column dataField="kg_da_omaggiare" width={70} />
            <Column dataField="nota_credito_emessa" width={150} />
          </DataGrid>
        </div>
      )}
    </div>
  );
}

import React, { useRef, useState } from "react";
import SelectMenu from "./SelectMenu";
import axios from "axios";
import FooterForm from "./FooterForm";
import { Button } from "devextreme-react/button";
import "devextreme/dist/css/dx.light.css";

import {
  Form,
  Label,
  RangeRule,
  RequiredRule,
  SimpleItem,
} from "devextreme-react/form";
import { DateBox, TextBox } from "devextreme-react";

const FileUpload = ({ props }) => {
  const adjustedTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  );
  const fileInputRef = useRef(null);
  const [file, setFile] = useState({});
  const [uploaded, setUploaded] = useState(false);
  const [fileInfo, setFileInfo] = useState({
    nomeFileOriginale: "",
    percorsoOriginale: "",
    tipoFile: "",
    descrizione: "",
    note: "",
    ...props,
    dataArchiviazione: adjustedTime.toISOString().slice(0, 16),
  });
  const getData = (tipo_file: string) => {
    setFileInfo({
      ...fileInfo,
      tipoFile: tipo_file,
    });
  };
  const handleInputChange = (event, fieldName) => {
    setFileInfo({
      ...fileInfo,
      [fieldName]: event.value,
    });
  };
  const handleInputFileClick = () => {
    fileInputRef.current.click();
  };
  const onSelectedFilesChanged = (e) => {
    setFile(e.target.files[0]);
    setFileInfo({
      ...fileInfo,
      nomeFileOriginale: e.target.files[0].name,
      percorsoOriginale: `${__dirname}${e.target.files[0].name}`,
    });
    setUploaded(true);
  };
  const handleSaveInfo = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nomeFileOriginale", fileInfo.nomeFileOriginale);
    formData.append("percorsoOriginale", fileInfo.percorsoOriginale);
    formData.append("tipoFile", fileInfo.tipoFile);
    formData.append("descrizione", fileInfo.descrizione);
    formData.append("note", fileInfo.note);
    formData.append("collegamentoATabella", fileInfo.collegamentoATabella);
    formData.append("collegamentoACampo", fileInfo.collegamentoACampo);
    formData.append("valoreCampo", fileInfo.valoreCampo);
    formData.append("dataArchiviazione", fileInfo.dataArchiviazione);

    try {
      await axios.post("http://localhost:3000/allegati/files", formData);
    } catch (ex) {
      console.log(ex);
    } finally {
      setUploaded(false);
    }
  };
  return (
    <div
      className="all_main"
      style={{
        margin: "auto",
        width: "1200px",
        marginTop: "10%",
      }}
    >
      {!uploaded && (
        <div
          className="file"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#d3d3d3",
            padding: "20",
            marginTop: "150",
            height: "200px",
          }}
        >
          <h4
            style={{
              padding: "20",
              display: "inline-block",
            }}
          >
            Carica file
          </h4>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onSelectedFilesChanged}
          />
          <Button
            onClick={handleInputFileClick}
            stylingMode="contained"
            type="normal"
          >
            Scegli file
          </Button>
        </div>
      )}

      {uploaded && (
        <div style={{ fontFamily: "Roboto", marginLeft: "20px" }}>
          <Form>
            <SimpleItem>
              <Label text="Descrizione" />
              <TextBox
                value={fileInfo.descrizione}
                onValueChanged={(e) => handleInputChange(e, "descrizione")}
                maxLength={100}
                showClearButton={true}
              ></TextBox>
              <RequiredRule message="Scrivi descrizione" />
            </SimpleItem>
            <SimpleItem>
              <Label text="Note" />
              <TextBox
                value={fileInfo.note}
                onValueChanged={(e) => handleInputChange(e, "note")}
                maxLength={300}
                showClearButton={true}
              ></TextBox>
              <RequiredRule message="Scrivi note" />
            </SimpleItem>
            <SimpleItem>
              <Label text="Tipologia allegato" />
              <SelectMenu getData={getData} />
            </SimpleItem>
            <SimpleItem>
              <Label text="Data di archiviazione" />
              <DateBox
                defaultValue={fileInfo.dataArchiviazione}
                value={fileInfo.dataArchiviazione}
                onValueChanged={(e) =>
                  handleInputChange(e, "dataArchiviazione")
                }
                showClearButton={true}
                pickerType={"rollers"}
              >
                {" "}
                <RangeRule
                  max={new Date()}
                  min={new Date().getFullYear() - 20}
                  message="Scegli una data esistente."
                />
              </DateBox>
              <RequiredRule message="Devi mettere una data per forza." />
            </SimpleItem>
          </Form>
          <FooterForm onClick={handleSaveInfo} />
        </div>
      )}
    </div>
  );
};
export default FileUpload;

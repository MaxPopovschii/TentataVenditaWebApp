import React from "react";
import { useState, useEffect } from "react";

const SelectMenu = ({ getData }) => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    fetch("http://localhost:5001/documenttype/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    getData(e.target.value);
  };

  const handleDescription = () => {
    const selectedData = data.find(
      (item) => item.codice.trim() === inputValue.trim()
    );

    if (selectedData) {
      setDescription(selectedData.descrizione);
    }
  };
  useEffect(() => {
    setTimeout(handleDescription, 100);
  }, [inputValue]);
  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        value={inputValue}
        onChange={handleChange}
        style={{
          fontFamily: "Roboto",
          fontSize: "16px",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">Seleziona...</option>
        {data.map((item, index) => (
          <option key={index}>{item.codice}</option>
        ))}
      </select>
      <input
        className="input_descr"
        type="text"
        value={description}
        readOnly
        style={{
          fontFamily: "Roboto",
          fontSize: "16px",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginLeft: "15px",
        }}
      />
    </div>
  );
};

export default SelectMenu;

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export function Provider({ children }) {
  const [fechaInicial, setFechaInicial] = useState("2010-01-01");
  const [fechafinal, setFechaFinal] = useState("2010-01-01");
  const [loading, setLoading] = useState(false);
  const [tramos, setTramos] = useState([]);
  const [changeIndex, setChangeIndex] = useState(false);

  useEffect(() => {
    getTramos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTramos = async () => {
    setLoading(true);
    const response = await axios.post("/api/tramos", {
      fechainicial: fechaInicial,
      fechafinal: fechafinal,
    });
    setTramos(response.data);
    setLoading(false);
  };

  const loadData = () => {
    changeIndex && getTramos();
    setChangeIndex(false);
  };

  return (
    <DataContext.Provider
      value={{
        fechainicial: fechaInicial,
        fechafinal: fechafinal,
        loading,
        tramos,
        setFechaInicial,
        setFechaFinal,
        setLoading,
        loadData,
        setChangeIndex,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

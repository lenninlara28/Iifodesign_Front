import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const DataContext = createContext();

export function Provider({ children }) {
  const [fechaInicial, setFechaInicial] = useState("2010-01-01");
  const [fechaFinal, setFechaFinal] = useState("2010-01-01");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(true);
  const [tramos, setTramos] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [changeIndex, setChangeIndex] = useState(false);
  const [page, setPage] = useState(window.location.pathname);

  useEffect(() => {
    getTramos();
    getClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTramos = async () => {
    setLoading(true);
    setView(true);
    const response = await axios.post("/api/tramos", {
      fechainicial: fechaInicial,
      fechafinal: fechaFinal,
    });
    if (response.data.length === 0) {
      setChangeIndex(true);
      setView(false);
      return Swal.fire({
        icon: "info",
        title: "No hay datos para este rango de fechas",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setTramos(response.data);
    setLoading(false);
  };

  const getClientes = async () => {
    setLoading(true);
    setView(true);
    const response = await axios.post("/api/cliente", {
      fechainicial: fechaInicial,
      fechafinal: fechaFinal,
    });
    if (response.data.length === 0) {
      setChangeIndex(true);
      setView(false);
      return Swal.fire({
        icon: "info",
        title: "No hay datos para este rango de fechas",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setCliente(response.data);
    setLoading(false);
  };

  const loadData = () => {
    if (fechaInicial > fechaFinal) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "La fecha inicial no puede ser mayor a la fecha final",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (changeIndex) {
      switch (window.location.pathname) {
        case "/":
          getTramos();
          break;
        case "/tramos":
          getTramos();
          break;
        case "/clientes":
          getClientes();
          break;
        default:
          break;
      }
    }
    setChangeIndex(false);
  };
  return (
    <DataContext.Provider
      value={{
        fechainicial: fechaInicial,
        fechafinal: fechaFinal,
        loading,
        tramos,
        cliente,
        view,
        page,
        setPage,
        setView,
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

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
  const [topPeores, setTopPeores] = useState([]);
  const [changeIndex, setChangeIndex] = useState(false);
  const [page, setPage] = useState(window.location.pathname);
  const [filter, setfilter] = useState(tramos);

  useEffect(() => {
    getTramos();
    getClientes();
    getTopPeores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTramos = async () => {
    try {
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
      setfilter(response.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 2000,
      });
      setLoading(false);
      setChangeIndex(true);
      setView(false);
    }
  };

  const getClientes = async () => {
    try {
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 2000,
      });
      setLoading(false);
      setChangeIndex(true);
      setView(false);
    }
  };

  const getTopPeores = async () => {
    try {
      setLoading(true);
      setView(true);
      const response = await axios.post("/api/tramos-cliente", {
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

      setTopPeores(
        response.data
          .sort((a, b) => a.Perdidas - b.Perdidas)
          .map((item, index) => {
            return {
              ...item,
              index: index + 1,
            };
          })
      );
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 2000,
      });
      setLoading(false);
      setChangeIndex(true);
      setView(false);
    }
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
        case "/top-peores":
          getTopPeores();
          break;
        default:
          break;
      }
    }
    setChangeIndex(false);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (typeof b[orderBy] && typeof a[orderBy] === "number") {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    } else {
      if (`${b[orderBy]}`.toLowerCase() < `${a[orderBy]}`.toLowerCase()) {
        return -1;
      }
      if (`${b[orderBy]}`.toLowerCase() > `${a[orderBy]}`.toLowerCase()) {
        return 1;
      }
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortData = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  return (
    <DataContext.Provider
      value={{
        fechainicial: fechaInicial,
        fechafinal: fechaFinal,
        loading,
        tramos,
        filter,
        cliente,
        topPeores,
        view,
        page,
        setPage,
        setView,
        setFechaInicial,
        setFechaFinal,
        setLoading,
        loadData,
        setChangeIndex,
        sortData,
        getComparator,
        setfilter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

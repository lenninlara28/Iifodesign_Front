import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import Chart from "../components/Chart";
import { Grid, TableBody, TableCell, TableRow } from "@mui/material";

const Tramos = () => {
  const [tramos, setTramos] = useState([]);

  useEffect(() => {
    getTramos();
  }, []);

  const getTramos = async () => {
    const response = await axios.post("/api/tramos", {
      fechainicial: "2010-01-01",
      fechafinal: "2010-01-01",
    });
    setTramos(response.data);
  };

  const tramo = tramos.map((item) => {
    return item.Linea;
  });

  const consumo = tramos.map((item) => {
    return item.consumo;
  });

  const perdidas = tramos.map((item) => {
    return item.perdidas;
  });

  const costos = tramos.map((item) => {
    return item.costo;
  });

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={styles.container}
      >
        <Grid item xs={12} sx={styles.gridTable}>
          {/* TABLA DE DATOS */}
          <Table>
            <TableBody>
              {tramos.length > 0 &&
                tramos.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.Linea}</TableCell>
                    <TableCell align="center">{row.consumo}</TableCell>
                    <TableCell align="center">{row.perdidas}</TableCell>
                    <TableCell align="center">{row.costo}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} lg={3} sx={styles.gridChart}>
          {/* GRAFICO DE DATOS CONSUMO */}
          <Chart tipo={"Consumo"} tramo={tramo} series={consumo} />
        </Grid>
        <Grid item xs={12} lg={3} sx={styles.gridChart}>
          {/* GRAFICO DE DATOS PERDIDAS  */}
          <Chart tipo={"Pérdidas"} tramo={tramo} series={perdidas} />
        </Grid>
        <Grid item xs={12} lg={3} sx={styles.gridChart}>
          {/* GRAFICO DE DATOS COSTOS */}
          <Chart tipo={"Costos"} tramo={tramo} series={costos} />
        </Grid>
      </Grid>
    </>
  );
};

const styles = {
  container: {
    marginTop: "4px",
    padding: "2%",
  },
  gridTable: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "10px",
  },
  gridChart: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "10px",
    padding: "10px",
  },
};

export default Tramos;

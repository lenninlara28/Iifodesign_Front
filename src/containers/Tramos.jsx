import Table from "../components/Table";
import Chart from "../components/Chart";
import { Grid, TableBody, TableCell, TableRow } from "@mui/material";
import { DataContext } from "../context/Provider";
import { useContext } from "react";

const Tramos = () => {
  const dates = useContext(DataContext);

  const tramo = dates.tramos.map((item) => {
    return item.Linea;
  });

  const consumo = dates.tramos.map((item) => {
    return item.consumo;
  });

  const perdidas = dates.tramos.map((item) => {
    return item.perdidas;
  });

  const costos = dates.tramos.map((item) => {
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
              {dates.tramos.length > 0 &&
                dates.tramos.map((row, index) => (
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
          <Chart tipo={"Consumos"} tramo={tramo} series={consumo} />
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

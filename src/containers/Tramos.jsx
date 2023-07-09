import Table from "../components/Table";
import Chart from "../components/Chart";
import { Collapse, Grid, TableBody, TableCell, TableRow } from "@mui/material";
import { DataContext } from "../context/Provider";
import { useContext } from "react";
import SkeletonTable from "../components/SkeletonTable";
import SkeletonCard from "../components/SkeletonCard";

const Tramos = () => {
  const contex = useContext(DataContext);

  const tramo = contex.tramos.map((item) => {
    return item.Linea;
  });

  const consumo = contex.tramos.map((item) => {
    return item.consumo;
  });

  const perdidas = contex.tramos.map((item) => {
    return item.perdidas;
  });

  const costos = contex.tramos.map((item) => {
    return item.costo;
  });

  return (
    <>
      <Collapse in={contex.view}>
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
                {contex.loading ? (
                  <SkeletonTable columns={4} />
                ) : (
                  contex.tramos.length > 0 &&
                  contex.tramos.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.Linea}</TableCell>
                      <TableCell align="center">{row.consumo}</TableCell>
                      <TableCell align="center">{row.perdidas}</TableCell>
                      <TableCell align="center">{row.costo}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} lg={3} sx={styles.gridChart}>
            {/* GRAFICO DE DATOS CONSUMO */}
            {contex.loading ? (
              <SkeletonCard columns={4} />
            ) : (
              <Chart tipo={"Consumos"} tramo={tramo} series={consumo} />
            )}
          </Grid>
          <Grid item xs={12} lg={3} sx={styles.gridChart}>
            {/* GRAFICO DE DATOS PERDIDAS  */}
            {contex.loading ? (
              <SkeletonCard columns={4} />
            ) : (
              <Chart tipo={"Pérdidas"} tramo={tramo} series={perdidas} />
            )}
          </Grid>
          <Grid item xs={12} lg={3} sx={styles.gridChart}>
            {/* GRAFICO DE DATOS COSTOS */}
            {contex.loading ? (
              <SkeletonCard columns={4} />
            ) : (
              <Chart tipo={"Costos"} tramo={tramo} series={costos} />
            )}
          </Grid>
        </Grid>
      </Collapse>
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

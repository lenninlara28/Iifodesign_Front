import { useContext, useState } from "react";
import Table from "../components/Table";
import ChartBar from "../components/ChartBar";
import {
  Collapse,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  createTheme,
} from "@mui/material";
import { DataContext } from "../context/Provider";
import SkeletonTable from "../components/SkeletonTable";
import SkeletonCard from "../components/SkeletonCard";

const Clientes = () => {
  const contex = useContext(DataContext);
  const [ordenDirection, setOrdenDirection] = useState("");
  const [valueToOrderBy, setValueToOrderBy] = useState("");

  const labels = ["Residelcial", "Comercial", "Industrial"];
  const backgroundColor = [
    "#D98880",
    "#7FB3D5",
    "#73C6B6",
    "#F7DC6F",
    "#E59866",
  ];

  const infoConsumos = contex.cliente.map((item, index) => {
    return {
      label: item.Linea,
      data: [
        item.consumo_residencial,
        item.consumo_comercial,
        item.consumo_industrial,
      ],
      backgroundColor: backgroundColor[index],
    };
  });

  const infoPerdidas = contex.cliente.map((item, index) => {
    return {
      label: item.Linea,
      data: [
        item.perdidas_residencial,
        item.perdidas_comercial,
        item.perdidas_industrial,
      ],
      backgroundColor: backgroundColor[index],
    };
  });

  const infoCostos = contex.cliente.map((item, index) => {
    return {
      label: item.Linea,
      data: [
        item.costo_residencial,
        item.costo_comercial,
        item.costo_industrial,
      ],
      backgroundColor: backgroundColor[index],
    };
  });

  const columns = [
    { id: "0", name: "Linea", label: "Tramos", minWidth: 20 },
    {
      id: "1",
      name: "consumo_residencial",
      label: "Consumo residelcial",
      minWidth: 20,
    },
    {
      id: "2",
      name: "consumo_comercial",
      label: "Consumo comercial",
      minWidth: 20,
    },
    {
      id: "3",
      name: "consumo_industrial",
      label: "Consumo industrial",
      minWidth: 20,
    },
    {
      id: "4",
      name: "perdidas_residencial",
      label: "Pérdida recidencial",
      minWidth: 20,
    },
    {
      id: "5",
      name: "perdidas_comercial",
      label: "Pérdida comercial",
      minWidth: 20,
    },
    {
      id: "6",
      name: "perdidas_industrial",
      label: "Pérdida industrial",
      minWidth: 20,
    },
    {
      id: "7",
      name: "costo_residencial",
      label: "Costo residelcial",
      minWidth: 20,
    },
    {
      id: "8",
      name: "costo_comercial",
      label: "Costo comercial",
      minWidth: 20,
    },
    {
      id: "9",
      name: "costo_industrial",
      label: "Costo industrial",
      minWidth: 20,
    },
  ];

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
            <Table
              columns={columns}
              setDirection={setOrdenDirection}
              setOrderBy={setValueToOrderBy}
            >
              <TableBody>
                {contex.loading ? (
                  <SkeletonTable columns={10} />
                ) : (
                  contex.cliente.length > 0 &&
                  contex
                    .sortData(
                      contex.cliente,
                      contex.getComparator(ordenDirection, valueToOrderBy)
                    )
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{row.Linea}</TableCell>
                        <TableCell align="center">
                          {row.consumo_residencial}
                        </TableCell>
                        <TableCell align="center">
                          {row.consumo_comercial}
                        </TableCell>
                        <TableCell align="center">
                          {row.consumo_industrial}
                        </TableCell>
                        <TableCell align="center">
                          {row.perdidas_residencial}
                        </TableCell>
                        <TableCell align="center">
                          {row.perdidas_comercial}
                        </TableCell>
                        <TableCell align="center">
                          {row.perdidas_industrial}
                        </TableCell>
                        <TableCell align="center">
                          {row.costo_residencial}
                        </TableCell>
                        <TableCell align="center">
                          {row.costo_comercial}
                        </TableCell>
                        <TableCell align="center">
                          {row.costo_industrial}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} lg={7} sx={styles.gridChart}>
            {/* GRAFICO DE DATOS CONSUMOS */}
            {contex.loading ? (
              <SkeletonCard />
            ) : (
              <ChartBar
                title={"Consumos"}
                labels={labels}
                info={infoConsumos}
              />
            )}
          </Grid>
          <Grid item xs={12} lg={7} sx={styles.gridChart}>
            {/* GRAFICO DE DATOS PERDIDAS */}
            {contex.loading ? (
              <SkeletonCard />
            ) : (
              <ChartBar
                title={"´Pédidas"}
                labels={labels}
                info={infoPerdidas}
              />
            )}
          </Grid>
          <Grid item xs={12} lg={7} sx={styles.gridChart}>
            {/* GRAFICO DE DATOS COSTOS */}
            {contex.loading ? (
              <SkeletonCard />
            ) : (
              <ChartBar title={"Costos"} labels={labels} info={infoCostos} />
            )}
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 600,
    },
  },
});

const styles = {
  container: {
    marginTop: "4px",
    padding: "2%",
  },
  gridTable: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "10px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  gridChart: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "10px",
    padding: "10px",
  },
};

export default Clientes;

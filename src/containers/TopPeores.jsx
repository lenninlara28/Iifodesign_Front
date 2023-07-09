import Table from "../components/Table";
import { Collapse, Grid, TableBody, TableCell, TableRow } from "@mui/material";
import { DataContext } from "../context/Provider";
import { useContext } from "react";
import SkeletonTable from "../components/SkeletonTable";

const TopPeores = () => {
  const contex = useContext(DataContext);

  const columns = [
    { id: "id", label: "°", minWidth: "1px" },
    { id: "tipo_consumo", label: "Tipo de consumo", minWidth: 20 },
    { id: "Linea", label: "Tramo", minWidth: 20 },
    { id: "Pérdidas", label: "Pérdidas", minWidth: 20 },
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
          <Grid item xs={5} sx={styles.gridTable}>
            {/* TABLA DE DATOS */}
            <Table columns={columns}>
              <TableBody>
                {contex.loading ? (
                  <SkeletonTable columns={4} />
                ) : (
                  contex.topPeores.length > 0 &&
                  contex.topPeores.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.TipoConsumo}</TableCell>
                      <TableCell align="center">{row.Linea}</TableCell>
                      <TableCell align="center">{row.Perdidas}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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

export default TopPeores;

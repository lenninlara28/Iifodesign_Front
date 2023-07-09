import { useContext, useState } from "react";
import Table from "../components/Table";
import { Collapse, Grid, TableBody, TableCell, TableRow } from "@mui/material";
import { DataContext } from "../context/Provider";
import SkeletonTable from "../components/SkeletonTable";

const TopPeores = () => {
  const contex = useContext(DataContext);
  const [ordenDirection, setOrdenDirection] = useState("");
  const [valueToOrderBy, setValueToOrderBy] = useState("");

  const columns = [
    { id: "0", name: "index", label: "°", minWidth: "1px" },
    { id: "1", name: "TipoConsumo", label: "Tipo de consumo", minWidth: 20 },
    { id: "2", name: "Linea", label: "Tramo", minWidth: 20 },
    { id: "3", name: "Perdidas", label: "Pérdidas", minWidth: 20 },
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
          <Grid item xs={12} lg={5} sx={styles.gridTable}>
            {/* TABLA DE DATOS */}
            <Table
              columns={columns}
              setDirection={setOrdenDirection}
              setOrderBy={setValueToOrderBy}
            >
              <TableBody>
                {contex.loading ? (
                  <SkeletonTable columns={4} />
                ) : (
                  contex.topPeores.length > 0 &&
                  contex
                    .sortData(
                      contex.topPeores,
                      contex.getComparator(ordenDirection, valueToOrderBy)
                    )
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{row.index}</TableCell>
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

import { Grid, TextField, Typography } from "@mui/material";
import { DataContext } from "../context/Provider";
import { useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function DataPiker() {
  const dates = useContext(DataContext);

  const handleChangeDate = (event) => {
    dates.setChangeIndex(true);
    const date = event.target.value;
    const id = event.target.id;
    if (id === "fechainicial") {
      dates.setFechaInicial(date);
    } else if (id === "fechafinal") {
      dates.setFechaFinal(date);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignContent="center"
        sx={{ marginTop: "2%" }}
      >
        <Grid item xs={6} lg={4}>
          <Typography variant="h6" align="center">
            Fecha inicial
          </Typography>
          <TextField
            id="fechainicial"
            type="date"
            sx={{ width: "100%" }}
            onChange={handleChangeDate}
            value={dates.fechainicial}
          />
        </Grid>
        <Grid item xs={6} lg={4}>
          <Typography variant="h6" align="center">
            Fecha final
          </Typography>
          <TextField
            id="fechafinal"
            type="date"
            sx={{ width: "100%" }}
            onChange={handleChangeDate}
            value={dates.fechafinal}
          />
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default DataPiker;

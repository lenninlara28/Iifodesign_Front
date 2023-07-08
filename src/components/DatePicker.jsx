import { Grid, TextField, Typography } from "@mui/material";

function DataPiker() {
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
          <TextField id="date" type="date" sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={6} lg={4}>
          <Typography variant="h6" align="center">
            Fecha final
          </Typography>
          <TextField id="date" type="date" sx={{ width: "100%" }} />
        </Grid>
      </Grid>
    </>
  );
}

export default DataPiker;

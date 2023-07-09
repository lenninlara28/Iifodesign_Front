import { Button, Grid } from "@mui/material";
import DataPiker from "../components/DatePicker";
import { useContext } from "react";
import { DataContext } from "../context/Provider";

const Index = () => {
  const dates = useContext(DataContext);

  return (
    <Grid container>
      <Grid item xs={12}>
        <DataPiker />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button
          sx={{
            background: "#000",
            color: "#fff",
            "&:hover": {
              background: "#fff",
              color: "#000",
            },
          }}
          variant="contained"
          onClick={() => dates.loadData()}
        >
          Mostrar
        </Button>
      </Grid>
    </Grid>
  );
};

export default Index;

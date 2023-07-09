import { useContext, useState } from "react";
import {
  Collapse,
  Grid,
  IconButton,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataContext } from "../context/Provider";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";

const Filters = () => {
  const contex = useContext(DataContext);

  const tramosCopy = [...contex.tramos];

  /* ARREGLO INFORMACIÓN PARA FILTROS DE CONSUMO */
  const minValueConsumos =
    tramosCopy.length > 0
      ? Math.min.apply(
          null,
          tramosCopy.map((item) => item.consumo)
        )
      : 0;

  const maxValueConsumos =
    tramosCopy.length > 0
      ? Math.max.apply(
          null,
          tramosCopy.map((item) => item.consumo)
        )
      : 0;

  const [value, setValue] = useState([minValueConsumos, maxValueConsumos]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const filter = [...contex.tramos];
    const filtered = filter.filter(
      (item) => item.consumo >= newValue[0] && item.consumo <= newValue[1]
    );
    contex.setfilter(filtered);
  };
  /* FIN ARREGLO INFORMACIÓN PARA FILTROS DE CONSUMO */

  /* ARREGLO INFORMACIÓN PARA FILTROS DE PÉRDIDAS */
  const minValuePerdidas =
    tramosCopy.length > 0
      ? Math.min.apply(
          null,
          tramosCopy.map((item) => item.perdidas)
        )
      : 0;

  const maxValuePerdidas =
    tramosCopy.length > 0
      ? Math.max.apply(
          null,
          tramosCopy.map((item) => item.perdidas)
        )
      : 0;

  const [valuePerdidas, setValuePerdidas] = useState([
    minValuePerdidas,
    maxValuePerdidas,
  ]);

  const handleChangePerdidas = (event, newValue) => {
    setValuePerdidas(newValue);
    const filter = [...contex.tramos];
    const filtered = filter.filter(
      (item) => item.perdidas >= newValue[0] && item.perdidas <= newValue[1]
    );
    contex.setfilter(filtered);
  };
  /* FIN ARREGLO INFORMACIÓN PARA FILTROS DE PÉDIDAS */

  /* ARREGLO INFORMACIÓN PARA FILTROS DE COSTOS */
  const minValueCostos =
    tramosCopy.length > 0
      ? Math.min.apply(
          null,
          tramosCopy.map((item) => item.costo)
        )
      : 0;

  const maxValueCostos =
    tramosCopy.length > 0
      ? Math.max.apply(
          null,
          tramosCopy.map((item) => item.costo)
        )
      : 0;

  const [valueCostos, setValueCostos] = useState([
    minValueCostos,
    maxValueCostos,
  ]);

  const handleChangeCostos = (event, newValue) => {
    setValueCostos(newValue);

    const filter = [...contex.tramos];

    const filtered = filter.filter(
      (item) => item.costo >= newValue[0] && item.costo <= newValue[1]
    );
    contex.setfilter(filtered);
  };
  /* FIN ARREGLO INFORMACIÓN PARA FILTROS DE PÉDIDAS */

  const clear = () => {
    contex.setfilter(contex.tramos);
    setValue([0, 0]);
    setValuePerdidas([0, 0]);
    setValueCostos([0, 0]);
  };

  return (
    <Collapse in={contex.page === "/" || contex.page === "/tramos"}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={styles.container}
      >
        <Grid item xs={12} sx={styles.gridCard}>
          <Typography variant="h6" sx={{ marginLeft: "1%" }}>
            Filtros
            <Tooltip title="Limpiar Filtros">
              <IconButton onClick={() => clear()}>
                <CleaningServicesOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Typography>

          <Grid container spacing={5} justifyContent="space-evenly">
            <Grid item xs={12} lg={3} sx={{ margin: "0 15px 0 15px" }}>
              {/* GRID SLIDER CONSUMOS */}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "12px", marginRight: "1%" }}
                >
                  Consumos:
                </Typography>

                <TextField
                  id="min"
                  disabled
                  type="number"
                  value={value[0]}
                  size="small"
                  sx={{ margin: "3px", width: "100px", textAlign: "center" }}
                />
                <p>-</p>
                <TextField
                  id="max"
                  disabled
                  type="number"
                  value={value[1]}
                  size="small"
                  sx={{ margin: "3px", width: "100px", textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Slider
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  min={minValueConsumos}
                  step={1}
                  max={maxValueConsumos}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={3} sx={{ margin: "0 15px 0 15px" }}>
              {/* GRID SLIDER PÉDIDAS  */}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "12px", marginRight: "1%" }}
                >
                  Pérdidas:
                </Typography>

                <TextField
                  id="min"
                  disabled
                  type="number"
                  value={valuePerdidas[0]}
                  size="small"
                  sx={{ margin: "3px", width: "100px", textAlign: "center" }}
                />
                <p>-</p>
                <TextField
                  id="max"
                  disabled
                  type="number"
                  value={valuePerdidas[1]}
                  size="small"
                  sx={{ margin: "3px", width: "100px", textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Slider
                  value={valuePerdidas}
                  onChange={handleChangePerdidas}
                  valueLabelDisplay="auto"
                  min={minValuePerdidas}
                  step={1}
                  max={maxValuePerdidas}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={3} sx={{ margin: "0 15px 0 15px" }}>
              {/* GRID SLIDER COSTOS */}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "12px", marginRight: "1%" }}
                >
                  Costos:
                </Typography>

                <TextField
                  id="min"
                  disabled
                  type="number"
                  value={valueCostos[0]}
                  size="small"
                  sx={{ margin: "3px", width: "100px", textAlign: "center" }}
                />
                <p>-</p>
                <TextField
                  id="max"
                  disabled
                  type="number"
                  value={valueCostos[1]}
                  size="small"
                  onChange={handleChange}
                  sx={{ margin: "3px", width: "100px", textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Slider
                  value={valueCostos}
                  onChange={handleChangeCostos}
                  valueLabelDisplay="auto"
                  min={minValueCostos}
                  step={1}
                  max={maxValueCostos}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Collapse>
  );
};

const styles = {
  container: {
    marginTop: "10px",
    padding: "0 2% 0 2%",
  },
  gridCard: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "0 10px 0 10px",
  },
};

export default Filters;

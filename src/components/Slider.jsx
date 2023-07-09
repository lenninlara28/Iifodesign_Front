import { Grid, TextField, Typography } from "@mui/material";

function Slider(props) {
  const { value, handleChange, minValueConsumos, maxValueConsumos } = props;

  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "12px", marginRight: "1%" }}>
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
          onChange={handleChange}
          sx={{ margin: "3px", width: "100px", textAlign: "center" }}
        />
      </Grid>
      <Grid item xs={2.8}>
        <Slider
          value={value}
          onChange={() => handleChange()}
          valueLabelDisplay="auto"
          min={minValueConsumos}
          step={1}
          max={maxValueConsumos}
        />
      </Grid>
    </>
  );
}

export default Slider;

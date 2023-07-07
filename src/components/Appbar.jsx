import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";

const navItems = ["Tramos", "Clientes", "Top 20 - Peores"];

const Appbar = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar sx={{ backgroundColor: "#000" }}>
            <Grid
              container
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12} lg={4}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Prueba tecnica InfoDesign
                </Typography>
              </Grid>

              {navItems.map((item) => (
                <Grid item xs={4} lg={2} key={item}>
                  <Button
                    key={item}
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {item}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Appbar;

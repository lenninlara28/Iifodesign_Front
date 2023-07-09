import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../context/Provider";
import { useContext } from "react";

const navItems = [
  { key: 1, route: "/tramos", name: "Tramos" },
  { key: 2, route: "/clientes", name: "Clientes" },
  { key: 3, route: "/top-peores", name: "Top 20 - Peores" },
];

const Appbar = () => {
  const contex = useContext(DataContext);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="static">
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
                <Grid item xs={4} lg={2} key={item.key}>
                  <Link
                    to={`${item.route}`}
                    key={item.key}
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      textDecoration: "none",
                    }}
                    onClick={() => {
                      contex.setChangeIndex(true);
                    }}
                  >
                    {item.name}
                  </Link>
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

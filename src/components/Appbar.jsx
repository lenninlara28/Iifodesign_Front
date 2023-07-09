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
                <Grid
                  item
                  xs={12}
                  lg={2}
                  key={item.key}
                  sx={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to={`${item.route}`}
                    key={item.key}
                    style={
                      contex.page === item.route
                        ? styles.linkSelected
                        : styles.link
                    }
                    onClick={() => {
                      contex.setChangeIndex(true);
                      contex.setPage(item.route);
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

const styles = {
  linkSelected: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "capitalize",
    textDecoration: "none",
    background: "#fff",
    padding: "10px",
    borderRadius: "5px",
  },
  link: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
    textDecoration: "none",
    background: "#000",
    padding: "10px",
    borderRadius: "5px",
  },
};

export default Appbar;

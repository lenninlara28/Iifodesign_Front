// eslint-disable-next-line no-unused-vars
import React from "react";
import { Skeleton, Grid } from "@mui/material";

const SkeletonCard = () => {
  return (
    <>
      <Grid item xs={12} lg={3}>
        <Skeleton variant="rounded" height={400} width={300} />
      </Grid>
    </>
  );
};

export default SkeletonCard;

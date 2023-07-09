// eslint-disable-next-line no-unused-vars
import React from "react";
import { TableCell, TableRow, Skeleton } from "@mui/material";

const SkeletonTable = (props) => {
  const { columns } = props;

  return (
    <>
      {[...Array(columns)].map((_, index) => {
        return (
          <TableRow key={index}>
            {[...Array(columns)].map((_, index) => {
              return (
                <TableCell key={index}>
                  <Skeleton variant="text" />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

export default SkeletonTable;

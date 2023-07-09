import { useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

const StickyHeadTable = (props) => {
  const { children, columns, setDirection, setOrderBy } = props;
  const [ordenDirection, setOrdenDirection] = useState("");
  const [valueToOrderBy, setValueToOrderBy] = useState("");

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && ordenDirection === "asc";
    setValueToOrderBy(property);
    setOrdenDirection(isAscending ? "desc" : "asc");
    setOrderBy(property);
    setDirection(isAscending ? "desc" : "asc");
    ordenDirection === "desc" &&
      valueToOrderBy === property &&
      setValueToOrderBy("");
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="center"
                style={{ fontWeight: "bold", minWidth: column.minWidth }}
              >
                <TableSortLabel
                  active={`${valueToOrderBy}` === `${column.name}`}
                  direction={
                    `${valueToOrderBy}` === `${column.name}`
                      ? ordenDirection
                      : "asc"
                  }
                  onClick={createSortHandler(`${column.name}`)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
      </Table>
    </TableContainer>
  );
};
export default StickyHeadTable;

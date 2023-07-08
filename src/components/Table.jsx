import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  { id: "tramos", label: "Tramos", minWidth: 20 },
  { id: "consumos", label: "Consumos", minWidth: 20 },
  { id: "perdidas", label: "Pérdidas", minWidth: 20 },
  { id: "costos", label: "Costos", minWidth: 20 },
];

const StickyHeadTable = (props) => {
  const { children } = props;

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
                {column.label}
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

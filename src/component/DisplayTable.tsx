import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface MyTableProps {
  matrix: number[][];
  rows?: string[];
  columns?: string[];
  customRows?: string[];
  customColumns?: string[];
}

const DisplayTable: React.FC<MyTableProps> = ({
  matrix,
  customColumns = [],
  customRows = [],
  rows = ["P1", "P2", "P3", "P4", "P5", "P6", "P7"],
  columns = ["X1", "X2", "X3", "X4", "X5"],
}) => {
  const columnsArr = [...columns, ...customColumns];
  const rowsArr = [...rows, ...customRows];
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {columnsArr.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsArr.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              {columnsArr.map((column, columnIndex) => (
                <TableCell key={columnIndex}>
                  {matrix[rowIndex][columnIndex]
                    ? matrix[rowIndex][columnIndex].toLocaleString("en-US", {
                        maximumFractionDigits: 6,
                      })
                    : "0"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayTable;

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";

interface InputTableProps {
  initialMatrix: number[][];
  onChange: (matrix: number[][]) => void;
}

const InputTable: React.FC<InputTableProps> = ({ onChange, initialMatrix }) => {
  const columns = ["X1", "X2", "X3", "X4"];
  //const columns = ["X1", "X2", "X3", "X4", "X5"];

  const rows = ["P1", "P2", "P3", "P4", "P5", "P6"];
  //const rows = ["P1", "P2", "P3", "P4", "P5", "P6", "P7"];

  const [matrix, setMatrix] = useState(initialMatrix);

  useEffect(() => {
    onChange(matrix);
  }, [matrix, onChange]);

  const handleInputChange = (
    rowIndex: number,
    columnIndex: number,
    value: string
  ) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][columnIndex] = Number(value);
    setMatrix(newMatrix);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex}>
                  <TextField
                    type="number"
                    value={matrix[rowIndex][columnIndex]}
                    onChange={(event) =>
                      handleInputChange(
                        rowIndex,
                        columnIndex,
                        event.target.value
                      )
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InputTable;

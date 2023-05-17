import * as React from "react";
import { Typography, AppBar, Toolbar, Container } from "@mui/material";
import InputTable from "./component/InputTable";
import DisplayTable from "./component/DisplayTable";

export default function Album() {
  const [inputs, setInputs] = React.useState<number[][]>([
    [153, 25, 7.7, 134, 0.41],
    [140, 18, 4.8, 113, 0.45],
    [168, 55, 2.9, 126, 0.51],
    [181, 18, 4.8, 150, 0.68],
    [160, 35, 5.4, 139, 0.45],
    [182, 43, 2.8, 113, 0.52],
    [143, 29, 4.4, 144, 0.57],
  ]);

  const calcColSum = (matrix: number[][]) => {
    // Initialize an array with the same length as the number of columns in the matrix
    // Fill it with zeros
    const columnSums = new Array(matrix[0].length).fill(0);

    // Iterate over each row in the matrix
    for (let i = 0; i < matrix.length; i++) {
      // Iterate over each column in the row
      for (let j = 0; j < matrix[i].length; j++) {
        // Add the current cell's value to the running total for this column
        columnSums[j] += matrix[i][j];
      }
    }

    return columnSums;
  };

  const divideOnSums = (matrix: number[][], array: number[]): number[][] => {
    // Create a new matrix with the same dimensions as the input matrix
    const newMatrix: number[][] = [];

    // Iterate over each row in the matrix
    for (let i = 0; i < matrix.length; i++) {
      // Create a new row for the new matrix
      const newRow: number[] = [];

      // Iterate over each column in the row
      for (let j = 0; j < matrix[i].length; j++) {
        // Divide the current cell's value by the corresponding value in the array
        // and add the result to the new row
        newRow.push(matrix[i][j] / array[j]);
      }

      // Add the new row to the new matrix
      newMatrix.push(newRow);
    }

    return newMatrix;
  };

  const appendRowSums = (matrix: number[][]): number[][] => {
    // Create a new matrix with the same dimensions as the input matrix
    const newMatrix: number[][] = [];
    // Iterate over each row in the matrix
    for (let i = 0; i < matrix.length; i++) {
      // Create a new row for the new matrix
      const newRow: number[] = [...matrix[i]];

      // Calculate the sum of the row
      const rowSum = newRow.reduce((a, b) => a + b, 0);

      // Append the sum to the row
      newRow.push(rowSum);

      // Add the new row to the new matrix
      newMatrix.push(newRow);
    }
    return newMatrix;
  };

  const getLastCol = (matrix: number[][]): number[] =>
    matrix.map((arr) => arr[arr.length - 1]);

  const calcDistances = (array: number[]): number[][] => {
    // Create a new empty matrix
    const matrix: number[][] = [];

    // Iterate over each element in the array
    for (let i = 0; i < array.length; i++) {
      // Create a new row for the matrix
      const row: number[] = [];

      // Iterate over each element in the array again
      for (let j = 0; j < array.length; j++) {
        // Calculate the absolute difference between the current pair of elements
        // and add the result to the row
        row.push(Math.abs(array[i] - array[j]));
      }

      // Add the row to the matrix
      matrix.push(row);
    }

    return matrix;
  };

  const appendRowMins = (matrix: number[][]): number[][] => {
    // Create a new matrix with the same dimensions as the input matrix
    const newMatrix: number[][] = [];
    // Iterate over each row in the matrix
    for (let i = 0; i < matrix.length; i++) {
      // Create a new row for the new matrix
      const newRow: number[] = [...matrix[i]];

      // Calculate the sum of the row
      const rowMin = Math.min(...newRow.filter((e) => e > 0));

      // Append the sum to the row
      newRow.push(rowMin);

      // Add the new row to the new matrix
      newMatrix.push(newRow);
    }
    return newMatrix;
  };

  const maxOfMin = (matrix: number[][]): number => {
    // Map each row to its minimum value
    const minValues = matrix.map((row) =>
      Math.min(...row.filter((e) => e > 0))
    );

    // Find the maximum value in the array of minimum values
    const maxOfMin = Math.max(...minValues);

    return maxOfMin;
  };

  const clasterize = (
    crit: number,
    distances: number[]
  ): { name: string; val: number }[][] => {
    const objects = distances
      .map((val, i) => ({ name: `P${i + 1}`, val }))
      .sort((a, b) => a.val - b.val);

    const k1 = objects.filter((e) => e.val === crit);
    const k2 = objects.filter((e) => e.val !== crit);
    return [k1, k2];
  };

  const isoNorm = (matrix: number[][]): number[][] =>
    matrix.map((row) => {
      const last = row.pop() || 1;
      return row.map((e) => e / last);
    });

  const calcIsoDistances = (array: number[][]): number[][] => {
    // Create a new empty matrix
    const matrix: number[][] = [];

    // Iterate over each element in the array
    for (let i = 0; i < array.length; i++) {
      // Create a new row for the matrix
      const row: number[] = [];

      // Iterate over each element in the array again
      for (let j = 0; j < array.length; j++) {
        // Calculate the absolute difference between the current pair of elements
        // and add the result to the row
        if (j == i) {
          row.push(0);
        } else {
          const pows = array[i].map((el, k) => Math.pow(el - array[j][k], 2));
          const sum = pows.reduce((partialSum, a) => partialSum + a, 0);
          row.push(Math.sqrt(sum));
        }
      }

      // Add the row to the matrix
      matrix.push(row);
    }

    return matrix;
  };

  const SUM = [...inputs, calcColSum(inputs)];
  const NORM = appendRowSums(divideOnSums(inputs, calcColSum(inputs)));
  const DIST = appendRowMins(calcDistances(getLastCol(NORM)));
  const CRIT = maxOfMin(calcDistances(getLastCol(NORM)));
  const CLUSTERS = clasterize(CRIT, getLastCol(DIST));

  const ISOMORFNORM = isoNorm(NORM);
  const ISODIST = appendRowMins(calcIsoDistances(ISOMORFNORM));
  const ISOCRIT = maxOfMin(calcIsoDistances(ISOMORFNORM));
  const ISOCLUSTERS = clasterize(ISOCRIT, getLastCol(ISODIST));
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Застосування кластерного аналізу в процесі визначення переліку стану
            об’єкта
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <InputTable
            initialMatrix={inputs}
            onChange={(e) => {
              setInputs(e);
            }}
          />

          <Typography variant="h5" m={2} align="center">
            Для ізотонічної розбивки для кожного Хі знаходимо суму.
          </Typography>
          <DisplayTable matrix={SUM} customRows={["SUM"]} />

          <Typography variant="h5" m={2} align="center">
            Проведемо нормування шкал
          </Typography>
          <DisplayTable matrix={NORM} customColumns={["SUM"]} />

          <Typography variant="h5" m={2} align="center">
            Визначемо відстані
          </Typography>
          <DisplayTable
            matrix={DIST}
            columns={["P1", "P2", "P3", "P4", "P5", "P6", "P7", "min"]}
          />
          <Typography variant="h5" m={2} align="center">
            Критична відстань = {CRIT}
          </Typography>
          <Typography variant="h5" m={2} align="center">
            Claster 1 : {CLUSTERS[0].map((e) => e.name)}
            <br />
            Claster 2 : {CLUSTERS[1].map((e) => e.name).join(", ")}
          </Typography>

          <Typography variant="h4" m={2} align="center">
            Ізоморфна розбивка
          </Typography>
          <DisplayTable matrix={ISOMORFNORM} />

          <Typography variant="h5" m={2} align="center">
            Визначемо відстані
          </Typography>
          <DisplayTable
            matrix={ISODIST}
            columns={["P1", "P2", "P3", "P4", "P5", "P6", "P7", "min"]}
          />

          <Typography variant="h5" m={2} align="center">
            Критична відстань = {ISOCRIT}
          </Typography>
          <Typography variant="h5" m={2} align="center">
            Claster 1 : {ISOCLUSTERS[0].map((e) => e.name)}
            <br />
            Claster 2 : {ISOCLUSTERS[1].map((e) => e.name).join(", ")}
          </Typography>
        </Container>
      </main>
    </>
  );
}

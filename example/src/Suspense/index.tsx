import { Suspense } from 'react';

import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, Typography } from '@mui/material';

import { suspenseApiCall } from 'react-api-king';

import { fetchData } from '../apiEndpoints';

export function DataTableBody(){
  const data = suspenseApiCall(fetchData, undefined).read();

  return (<>
      {data.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
    </>
  );
   
}

export function SimpleSuspenseTable() {
    return (
      <>
       <Typography variant="h4" >Simple table using Suspense</Typography>
       <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Suspense fallback={(
              <TableRow
                  key="___loading"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                  <TableCell component="td" scope="row" align="center" colSpan={5}>
                  ... loading
                  </TableCell>
              </TableRow>
            )}>
              <DataTableBody />
            </Suspense>
         </TableBody>
        </Table>
      </TableContainer>

      </>
    );
}
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, Typography } from '@mui/material';

import { useApiCallAndImmediatelyDispatch } from 'react-api-king';

import { fetchData } from '../apiEndpoints';

export function SimpleTable() {

    const [data, loading, success, error] = useApiCallAndImmediatelyDispatch(fetchData, undefined);

    return (
      <>
       <Typography variant="h4" >Simple table without using suspense</Typography>
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
            {loading && (
                <TableRow
                    key="___loading"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="td" scope="row" align="center" colSpan={5}>
                    ... loading
                    </TableCell>
                </TableRow>              
            )}
            {data && data.map((row) => (
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
          </TableBody>
        </Table>
      </TableContainer>

      </>
    );
}
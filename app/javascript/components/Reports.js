import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import {CiCircleRemove, CiCircleChevUp} from 'react-icons/ci'
import {format} from 'date-fns'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Reports() {
  const [reports, setReports] = useState([])
  
  useEffect(() => {
    axios.get('/api/v1/reports.json')
    .then(resp => {
      console.log(resp.data)
      setReports(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])
  
  return (
    <>
      <div class="d-block d-md-none">
        <p class="vertical-title">学習記録</p>
      </div>
      <h2 class="d-none d-md-block text-secondary">学習記録</h2>

      <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project name</StyledTableCell>
              <StyledTableCell align="right">1</StyledTableCell>
              <StyledTableCell align="center">2</StyledTableCell>
              <StyledTableCell align="center">削除</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((val, key) => {
              return (val.is_finished == true &&
                <StyledTableRow key={key}>
                  <StyledTableCell component="th" scope="reports">
                    {(val.title).length > 20 ? (val.title).slice(0,20)+"…" : (val.title)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {format(new Date(val.updated_at),'yyyy-MM-dd HH:mm')}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      nasi
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      <CiCircleRemove class="text-danger" onClick={() => {deleteReport (key,val)} }/>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </>
  )
}

export default Reports
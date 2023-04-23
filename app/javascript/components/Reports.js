import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import {CiCircleChevUp} from 'react-icons/ci'
import {format} from 'date-fns'
import Accordion from '@mui/material/Accordion'
import { AccordionDetails, AccordionSummary } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'


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
  const [tempReport] = useState({ id: null, is_finished: false, y_record : '', w_record : '', t_record : 'ワークを始めましょう！' });
  
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
                <StyledTableCell>やったこと</StyledTableCell>
                <StyledTableCell>わかったこと</StyledTableCell>
                <StyledTableCell align="right">完了日</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((val, key) => {
                return (val.is_finished == true &&
                  <StyledTableRow key={key}>
                    <StyledTableCell component="th" scope="projects">
                      {val.y_record}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<CiCircleChevUp />}
                        >
                        </AccordionSummary>
                        <AccordionDetails>
                          <p>{val.w_record}</p>
                        </AccordionDetails>
                      </Accordion>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {format(new Date(val.updated_at),'yyyy-MM-dd HH:mm')}
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
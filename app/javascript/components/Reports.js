import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import {AiOutlineArrowDown} from 'react-icons/ai'
import {format} from 'date-fns'
import Accordion from '@mui/material/Accordion'
import { AccordionDetails, AccordionSummary } from '@mui/material'
import Paper from '@mui/material/Paper'
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
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
  const [reports, setReports] = useState([]);
  const [displayedReports, setDisplayedReports] = useState([]);
  const [page, setPage] = useState(1); 
  const displayNum = 8
  useEffect(() => {
    axios.get('/api/v1/reports.json')
    .then(resp => {
      console.log(resp.data);
      setReports(resp.data);
      setDisplayedReports((resp.data).slice(((page - 1) * displayNum), page * displayNum))
    })
    .catch(e => {
      console.log(e);
    });
  }, [])

  const handleChange = (event, index) => {
    setPage(index);
    setDisplayedReports(reports.slice(((index - 1) * displayNum), index * displayNum))
  }

  return (
    <>
      <div class="d-block d-md-none">
        <p class="vertical-title">学習記録</p>
      </div>
      <h2 class="d-none d-md-block text-secondary">学習記録</h2>

      <div>
        <Pagination count={Math.ceil( reports.length / displayNum)} onChange={handleChange} style={{width: "400px", margin: "auto"}}/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableBody>
              {displayedReports.map((val, key) => {
                return (val.is_finished == true &&
                  <StyledTableRow key={key}>                    
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<AiOutlineArrowDown />}
                      >
                        <StyledTableCell component="th" scope="projects">
                          {val.y_record}
                        </StyledTableCell>
                        <StyledTableCell align='right' style={{ color: "#999"}}>
                          {format(new Date(val.updated_at),'yyyy-MM-dd HH:mm')}
                        </StyledTableCell>
                      </AccordionSummary>
                      <AccordionDetails>
                        <StyledTableCell>
                          <div>わかったこと</div>
                          <p>{val.w_record}</p>
                        </StyledTableCell>
                      </AccordionDetails>
                    </Accordion>
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
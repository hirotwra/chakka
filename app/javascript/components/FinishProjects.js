import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import styled from 'styled-components'
import { styled } from '@mui/material/styles'
import {CiCircleRemove, CiCircleChevUp} from 'react-icons/ci'
import Tooltip from '@mui/material/Tooltip'
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function FinishProjects() {
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    axios.get('/api/v1/projects.json')
    .then(resp => {
      console.log(resp.data)
      setProjects(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  const updateIsFinished = (index, val) => {
    var data = {
      is_finished: !val.is_finished
    }
    axios.patch(`/api/v1/projects/${val.id}`, data)
    .then(resp => {
      const newProjects = [...projects]
      newProjects[index].is_finished = resp.data.is_finished
      setProjects(newProjects)
    })
  }

  const deleteProject = (index, val) => {
    const sure = window.confirm('プロジェクトを削除します。よろしいですか?')
    if (sure) {
      axios.delete(`/api/v1/projects/${val.id}`)
      .then(resp => {
        const newProjects = [...projects]
        newProjects.splice(index, 1);
        console.log(resp.data);
        setProjects(newProjects)
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  
  return (
    <>
      <div class="d-block d-md-none">
        <p class="vertical-title">完了済リスト</p>
      </div>
      <h2 class="d-none d-md-block text-secondary">完了済リスト</h2>
      <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Project name</StyledTableCell>
            <StyledTableCell align="right">完了日</StyledTableCell>
            <StyledTableCell align="center">完了前に戻す</StyledTableCell>
            <StyledTableCell align="center">削除</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {projects.map((val, key) => {
        return (val.is_finished == true &&
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="projects">
                {(val.title).length > 20 ? (val.title).slice(0,20)+"…" : (val.title)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {format(new Date(val.updated_at),'yyyy-MM-dd HH:mm')}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Tooltip title="boo">
                  <CiCircleChevUp onClick={() => {updateIsFinished  (key,val)} }/>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Tooltip title="del">
                  <CiCircleRemove class="text-danger" onClick={() => {deleteProject (key,val)} }/>
                </Tooltip>
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

export default FinishProjects
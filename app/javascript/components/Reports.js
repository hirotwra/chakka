import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import {CiCircleRemove, CiCircleChevUp} from 'react-icons/ci'
import {format} from 'date-fns'
import Accordion from '@mui/material/Accordion'
import { AccordionDetails, AccordionSummary } from '@mui/material'
import Paper from '@mui/material/Paper'

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

      </div>
    </>
  )
}

export default Reports
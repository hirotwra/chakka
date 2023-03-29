import Grid from '@mui/material/Grid';
import React, { useContext, Component } from "react";
import  Button  from '@mui/material/Button'
import { UserInputData } from "./ActiveWork";
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


var item = {
  'yRecord': 1,
  'wRecord': 2,
	'tRecord': 3,
}

function Confirm(props)  {
	const { report, setReport } = useContext(UserInputData);
  const inputDataLists = [];
  var id = 0;
  for ( var k in report) {
    for ( var v in report[k]) {
      var value = ''
      if (report[k][v] === true) {
        value = 'チェックしました';
      } else if (report[k][v] === false) {
        value = 'チェックしていません';
      } else if (report[k][v] === '') {
        value = '未入力';
      } else {
        value = report[k][v];
      }
      inputDataLists.push(
        {
          "id": id,
          "name": item[v],
          "value": value
        }
      );
      id++;
    }
  }

  const saveReport = () => {
    var data = {
      is_finished: true,
      y_record: report.Working['yRecord'],
      w_record: report.Working['wRecord'],
      t_record: report.Worked['tRecord'],
    };

    axios.post('/api/v1/reports', data)
    .then(resp => {
      setReport({
        id: resp.data.id,
        is_finished: resp.data.is_finished,
        y_record : resp.data.y_record,
        w_record : resp.data.w_record,
        t_record : resp.data.t_record
      });
      //notify();
      props.history.push("/maintab");
    })
    .catch(e => {
      console.log(e)
    })
  };

  return (
    <Grid container>
      <TableContainer component={Paper}>
        <Table aria-label="Customer Input Data">
          <TableHead>
            <TableRow>
              <TableCell>項目</TableCell>
              <TableCell>入力内容</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              inputDataLists.map(function(elem) {
                return (
                  <TableRow key={elem.id}>
                  <TableCell>{elem.name}</TableCell>
                  { elem.value ? <TableCell>{elem.value}</TableCell> : <TableCell>None</TableCell> }
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
        <Button variant="contained" color="primary" onClick={props.handleBack}>
            戻る
        </Button>
        <Button variant="contained" color="primary" onClick={saveReport}>
            送信
        </Button>
      </Grid>
  )
}

export default withRouter(Confirm)

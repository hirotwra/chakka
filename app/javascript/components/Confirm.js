import React, { useContext, useState, useEffect  } from "react"
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { UserInputData } from "./ActiveWork"
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

var item = {
  'yRecord': 'やったこと',
  'wRecord': 'わかったこと',
  'tRecord': '次やること',
}

function Confirm(props)  {
  const { report, setReport } = useContext(UserInputData);

  const notify = (message, type) => {
    const options = {
      position: "bottom-center",
      hideProgressBar: true
    };

    if (type === 'success') {
      toast.success(message, options);
    } else if (type === 'error') {
      toast.error(message, options);
    } 
  }

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);

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

  const [userStatus, setUserStatus] = useState([])

  useEffect(() => {
    axios.get('/api/v1/user_statuses.json')
    .then(resp => {
      console.log(resp.data)
      setUserStatus(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  const saveReport = (is_finished) => {
    var data = {
      is_finished: is_finished,
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
      props.history.push({ pathname: "/maintab", state: { showModal: true } });
      const flashMessage = resp.data.flash_message;
      if (flashMessage.includes('レベルアップ！')) {
        notify(flashMessage, 'success');
      }
    })
    .catch(e => {
      if (e.response && e.response.status === 500) {
        console.log(e);
        notify('サーバーで問題が発生しました(500 error)', 'error')
      } else if (e.response && e.response.status === 422) {
        console.log(e);
        notify('記録を保存できませんでした(422 error)', 'error')
      }
    })
  };

  return (
    <>
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
        <div>
          <Button variant="contained" color="secondary" onClick={props.handleBack}>
            戻る
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              saveReport(true);
            }}
          >
            完了
          </Button>
        </div>
      </Grid>
    </>
  )
}
//props.history.pushを呼び出すためwithRouter使用
export default withRouter(Confirm)

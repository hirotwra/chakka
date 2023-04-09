import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {CiCircleChevUp} from 'react-icons/ci'
import axios from 'axios'
import styled from 'styled-components'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import Accordion from '@mui/material/Accordion'
import { AccordionDetails, AccordionSummary } from '@mui/material'

const Modal = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

function MainTab() {
  //最新report取得
  const [lastReport, setLastReport] = useState([]);
  const [tempReport] = useState({ id: null, is_finished: false, y_record : '', w_record : '', t_record : 'ワークを始めましょう！' });

  useEffect(() => {
    axios.get('/api/v1/reports/last_report')
    .then(resp => {
      console.log(resp.data)
      setLastReport(resp.data)? resp.data : tempReport;
      //レポートが返ってこない場合のみテンプレを渡せる。新規アカウントなどnull故のUndefinedエラーを防げる
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  //modal表示用
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (location.state && location.state.showModal) {
      setShowModal(true);
    }
  }, [location]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal>
          <Paper sx={{ p: 3 }}>
            <h3>ワーク完了!</h3>
            <div>100Exp 獲得!</div>
            {/*TODO:ユーザーの獲得経験値を表示する*/}
            <Button variant="text" onClick={handleCloseModal}>閉じる</Button>
          </Paper>
        </Modal>
      )}
      <div class="d-block d-md-none">
        <p class="vertical-title">メインタブ</p>
      </div>
      <h2 class="d-none mr-2 d-md-block text-secondary">メインタブ</h2>
      <div class="w-100">
        <h3>次やること:{lastReport?.t_record || tempReport.t_record}</h3>
        <div>次のレベルまで:</div>
        <Link to="/active_work">
          <Button
            variant="contained"
            color="primary"
          >
            ワーク開始
          </Button>
        </Link>
        <Accordion>
          <AccordionSummary
            expandIcon={<CiCircleChevUp />}
          >
            <p>前回の記録</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>ワーク完了日: {lastReport?.updated_at ||tempReport.updated_at}</p>
            <p>やったこと: {lastReport?.y_record ||tempReport.y_record}</p>
            <p>わかったこと: {lastReport?.w_record ||tempReport.w_record}</p>
          </AccordionDetails>
        </Accordion>
        <div id="non-project-text">
        </div>
      </div>
    </>
  )
}

export default MainTab
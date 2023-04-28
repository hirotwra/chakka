import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {AiOutlineArrowDown} from 'react-icons/ai'
import { GiAlliedStar } from "react-icons/gi";
import axios from 'axios'
import styled from 'styled-components'
import {format} from 'date-fns'
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

const ArchiveChecker = styled.div`
  float: right;
`

const TabContents = styled.div`
  text-align: center;
`

function MainTab() {
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
  const [modalState, setModalState] = useState({
    showModal: false,
    content: "none"
  });
  const location = useLocation();
  
  useEffect(() => {
    if (location.state && location.state.showModal) {
      setModalState({
        showModal: true,
        content: location.state.content
      });
    }
  }, [location]);

  const handleCloseModal = () => {
    setModalState({showModal: false});
  };

  const getBadge = () => {
    setModalState({showModal: true, content: "badge archived"});
  };

  const achievementDate = lastReport?.updated_at || new Date();
  
  const modalWindow = (content) => {
    switch (content) {
      case "finish work":
        return (
          <>
            <h3>ワーク完了!</h3>
            <div>100Exp 獲得!</div>
          </>
        );
      case "badge archived":
        return (
          <>
            <h3>勲章を獲得しました!</h3>
            <div>「バッヂ名」 獲得!</div>
          </>
        );
      default:
        return (
          <>
            <h3>モーダルエラー</h3>
            <div>通知内容を取得できませんでした</div>
          </>
        );
    }
  }

  return (
    <>
      {modalState['showModal'] && (
        <Modal>
          <Paper sx={{ p: 3 }}>
            {modalWindow(modalState['content'])}
            <Button variant="text" onClick={handleCloseModal}>閉じる</Button>
          </Paper>
        </Modal>
      )}
      <div>
        <ArchiveChecker>
          <span onClick={getBadge}>
            <GiAlliedStar size={30} color={'#ffa500'} style={{animation: 'flash 1s linear infinite'}}/>
          </span>
        </ArchiveChecker>
        <span>{userStatus.name}/ Lv.{userStatus.level}</span>
      </div>
      <div class="d-block d-md-none">
        <p class="vertical-title">メインタブ</p>
      </div>
      <h2 class="d-none mr-2 d-md-block text-secondary">メインタブ</h2>

      <TabContents>
        <h3>次やること:{lastReport?.t_record || tempReport.t_record}</h3>
        <Link to="/active_work">
          <Button
            variant="contained"
            color="primary"
          >
            ワーク開始
          </Button>
        </Link>
        <Accordion style={{textAlign:'start'}}>
          <AccordionSummary
            expandIcon={<AiOutlineArrowDown />}
          >
            <p>前回の記録</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>ワーク完了日:
              {format(new Date(achievementDate),'yyyy-MM-dd HH:mm')} 
            </p>
            <p>やったこと: {lastReport?.y_record || tempReport.y_record}</p>
            <p>わかったこと: {lastReport?.w_record || tempReport.w_record}</p>
          </AccordionDetails>
        </Accordion>
      </TabContents>
    </>
  )
}

export default MainTab
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {format} from 'date-fns'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

//const notify = () => {
//  const messages = [
//  ];
//  const messageNo = Math.floor( Math.random() * messages.length);
//  toast.success(messages[messageNo], {
//    position: "bottom-center",
//    hideProgressBar: true
//  });
//}

//function showDiffDate(limitDay) {
//  var nowDate = new Date();
//  var dnumNow = nowDate.getTime();
//
//  var targetDate = new Date(limitDay);
//  var dnumTarget = targetDate.getTime();
//
//  var diffMSec = dnumTarget - dnumNow - 32400000; 
//  var diffDays = diffMSec / ( 1000 * 60 * 60 * 24 );
//  var showDays = Math.ceil( diffDays );
//
//  var Msg;
//  if( showDays == 0 ) {
//    Msg = <span class="text-danger font-weight-bold">今日が締め切り日です！</span>;
//  }else if( showDays <= 5 && showDays > 0 ) {
//    Msg = <span class="text-warning font-weight-bold">残り{showDays}日です。</span>;
//  }else if( showDays > 0 ) {
//    Msg = "残り" + showDays + "日です。";
//  }else {
//    Msg = <span class="text-secondary">{showDays * -1}日前に過ぎました。</span>;
//  }
//  return Msg;
//}

function MainTab() {
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

  //const updateIsFinished = (index, val) => {
  //  var data = {
  //    is_finished : false,
  //    y_record: val.y_record,
  //    w_record: val.w_record,
  //    t_record: val.t_record,
  //  }
  //  const sure = window.confirm('プロジェクトを完了済リストに移動します。よろしいですか?');
  //  if (sure) {
  //  axios.patch(`/api/v1/projects/${val.id}`, data)
  //  .then(resp => {
  //    const newProjects = [...projects]
  //    newProjects[index].is_finished = resp.data.is_finished
  //    setProjects(newProjects)
  //  });
  //  notify()
  //  }
  //}

  return (
    <>
      <div class="d-block d-md-none">
        <p class="vertical-title">メインタブ</p>
      </div>
      <h2 class="d-none mr-2 d-md-block text-secondary">メインタブ</h2>

      <div class="w-100">
        <h3 class="d-none mr-2 d-md-block text-secondary">次やること:</h3>
        <div>次のレベルまで:</div>
        <div id="non-project-text">着手している:</div>
        <></>
        
      </div>
    </>
  )
}

export default MainTab
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

function UserStatus() {
  const [user_status, setUserStatus] = useState([])

  useEffect(() => {
    axios.get('/api/v1/user_status.json')
    .then(resp => {
      console.log(resp.data)
      setUserStatus(resp.data);
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
        <p class="vertical-title">ユーザーステータス</p>
      </div>
      <h2 class="d-none mr-2 d-md-block text-secondary">ユーザーステータス</h2>

      <div class="w-100">
        <h3 class="d-none mr-2 d-md-block text-secondary">次やること:</h3>
        <div>次のレベルまで:</div>
        <div id="non-project-text">未完了のプロジェクトはありません。</div>

        
      </div>
    </>
  )
}

export default UserStatus
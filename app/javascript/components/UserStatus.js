import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

const InputForm = styled.input`
  font-size: 15px;
  width: 90%;
  height: 20px;
  justify-content: center;
  margin-top: 18px;
  padding: 2px 7px;
`

toast.configure()

function UserStatus(props) {
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

  const getUserStatus = id => {
    axios.get(`/api/v1/user_statuses/${id}`)
    .then(resp => {
      setUserStatus(resp.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    getUserStatus(props.match.params.id);
    console.log(props.match.params.id)
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserStatus({ ...userStatus, [name]: value });
  };

  const notify = () => {
    toast.success("ユーザーネームを変更しました", {
      position: "bottom-center",
      hideProgressBar: true
    });
  }

  const updateUserName = () => {
    axios.patch(`/api/v1/user_statuses/${userStatus.id}`, userStatus)
    .then(response => {
      notify();
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <>
      <div class="d-block d-md-none">
        <p class="vertical-title">ユーザーステータス</p>
      </div>
      <h2 class="d-none mr-2 d-md-block text-secondary">ユーザーステータス</h2>
      <div class="w-100">
        <h2>{userStatus.name}</h2>
        <div class="field form-group row">
          <InputForm
            type="string"
            onChange={handleInputChange}
            name="name"
            class="form-control" 
            placeholder='ユーザーネームの変更'
          />
          <Button
            variant="contained" 
            color="info"
            type="submit"
            onClick={updateUserName}
            className="mr-3"
          >
            更新
          </Button>
        </div>
      </div>
      <div>
        <p> Lv.{userStatus.level}</p>
        <p>次のレベルまで:</p>
        <p>ランク:</p>
      </div>
    </>
  )
}

export default UserStatus
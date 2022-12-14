import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {AiOutlineDelete, AiOutlineRollback} from 'react-icons/ai'
import Tooltip from '@mui/material/Tooltip'
import {format} from 'date-fns'

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7px auto;
  padding: 9px;
  font-size: 14px;
`

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
    const sure = window.confirm('削除してよろしいですか?')
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
      <h1>FinishedProjects</h1>
      <div>
      {projects.map((val, key) => {
        return (val.is_finished == true &&
          <div key={key}>
            <Row>
            <Tooltip title="return to incomplete list">
              <span><AiOutlineRollback onClick={() => {
                updateIsFinished  (key,val)
              }}/></span>
            </Tooltip>
            <span>{val.title}</span>
            <span> 完了日時:{format(new Date(val.updated_at),'yyyy-MM-dd HH:mm')}</span>
            <Tooltip title="remove permanently">
              <span><AiOutlineDelete onClick={() => {
                deleteProject (key,val)
              }}/></span>
            </Tooltip>

            </Row>
          </div>
        )
      })}
      </div>
    </>
  )
}

export default FinishProjects
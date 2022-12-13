import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { AiFillFire, AiOutlineFire } from 'react-icons/ai'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import Button from '@mui/material/Button'

const ProjectTitle = styled.span`
font-size: 27px;
  ${({ active }) => active && `
    color: red;
  `}
`
const TabColor = styled.span`
  ${({ active }) => active && `
    color: red;
    font-weight: bold;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const ActiveChecked = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: red;
  cursor: pointer;
`

const UnActiveChecked = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

toast.configure()

const notify = () => {
  toast("🔥CHAKKA! : プロジェクトに着手しました", {
    position: "bottom-center",
    hideProgressBar: true
  });
}

function showDiffDate(limitDay) {
  // 現在日時を数値に変換
  var nowDate = new Date();
  var dnumNow = nowDate.getTime();

  // 指定日時を数値に変換
  var targetDate = new Date(limitDay);
  var dnumTarget = targetDate.getTime();

  // 引き算して残日数を計算
  var diffMSec = dnumTarget - dnumNow - 32400000; // 日本標準時に合わせて時差を減算
  var diffDays = diffMSec / ( 1000 * 60 * 60 * 24 );
  var showDays = Math.ceil( diffDays ); // 小数点以下を切り上げる

  // 表示
  var Msg;
  if( showDays > 0 ) {
    Msg = "残り " + showDays + "日です。";
  }else if( showDays == 0 ) {
    Msg = "今日が締め切り日です！";
  }else {
    Msg = (showDays * -1) + "日前に過ぎました。";
  }
  return Msg;
}

function MainProject() {
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

  const updateActive = (index, val) => {
    var data = {
      //id: val.id,
      title : val.title,
      deadline: val.deadline,
      description: val.description,
      active: !val.active,
      is_finished: val.is_finished
    }
    axios.patch(`/api/v1/projects/${val.id}`, data)
    .then(resp => {
      const newProjects = [...projects]
      newProjects[index].active = resp.data.active
      setProjects(newProjects)
    })
  }

  const updateIsFinished = (index, val) => {
    var data = {
      //id: val.id,
      title : val.title,
      deadline: val.deadline,
      description: val.description,
      active: val.active,
      is_finished: !val.is_finished
    }
    const sure = window.confirm('プロジェクトを完了済リストに移動します。よろしいですか?');
    if (sure) {
    axios.patch(`/api/v1/projects/${val.id}`, data)
    .then(resp => {
      const newProjects = [...projects]
      newProjects[index].is_finished = resp.data.is_finished
      setProjects(newProjects)
    })
    }
  }


  return (
    <>
      <h1>プロジェクト情報</h1>

      <div>
      <Tabs>
        <TabList>
        {projects.map((val) => {
            return (val.is_finished == false &&
              <Tab><TabColor active={val.active}>{val.title}</TabColor></Tab>
            )})}
        </TabList>
        {projects.map((val, key) => {
          return (val.is_finished == false &&
              <div key={key}>
              <TabPanel>
              <Row>
              {val.active ? (
                    <ActiveChecked>
                      <AiFillFire onClick={() => updateActive(key, val) } />
                    </ActiveChecked>
                    ) : (
                    <UnActiveChecked>
                      <AiOutlineFire onClick={() => {
                        updateActive(key, val); 
                        notify()
                      }} />
                    </UnActiveChecked>
                  )}
                  <ProjectTitle active={val.active}>
                    {val.title}
                  </ProjectTitle>

                </Row>

                
                <div>{val.deadline} 〆切 <span>...{showDiffDate(val.deadline)}</span> </div>            
                <div>説明:{val.description}</div>

                
                  <Link to={"/projects/" + val.id + "/edit"}>
                    <Button variant="contained">
                      編集画面へ
                    </Button>
                  </Link>
                  <span>
                    <Button variant="contained" color="success" onClick={() => updateIsFinished(key, val) }>
                      プロジェクトを完了する
                    </Button>
                  </span>
                </TabPanel>
              </div>

            )
        })}      
        </Tabs>
      </div>
    </>
  )
}

export default MainProject
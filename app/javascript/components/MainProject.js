import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { AiFillFire, AiOutlineFire } from 'react-icons/ai'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

const TabColor = styled.span`
  ${({ active }) => active && `
    color: crimson;
    font-weight: bold;
  `}
`

const ModeDisplay = styled.span`
  font-size: 50%;
  color: white;
  position: fixed;
  left: 4%;
  top: 4%;
`

const ActiveModeBg = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  z-index: -1;
`

const ProjectTitle = styled.span`
font-size: 24px;
text-align:center;
width: 85%;
height: 40px;
white-space: nowrap;
overflow-x: scroll;
@media (hover: hover) and (pointer: fine){
  &:hover{
    overflow-x: visible;
  }
}
  ${({ active }) => active && `
    color: crimson;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px auto;
  width: 80%;
  font-size: 25px;
  border-bottom: dotted 3px #87CEFA;
`

const ActiveChecked = styled.div`
  display: flex;
  align-items: center;
  color: crimson;
  cursor: pointer;
`

const UnActiveChecked = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

toast.configure()

const notify = () => {
  toast("プロジェクト完了！天才！！！", {
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
  if( showDays == 0 ) {
    Msg = <span class="text-danger font-weight-bold">今日が締め切り日です！</span>;
  }else if( showDays <= 5 && showDays > 0 ) {
    Msg = <span class="text-warning font-weight-bold">残り{showDays}日です。</span>;
  }else if( showDays > 0 ) {
    Msg = "残り" + showDays + "日です。";
  }else {
    Msg = <span class="text-secondary">{showDays * -1}日前に過ぎました。</span>;
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
      title : val.title,
      deadline: val.deadline,
      description: val.description,
      active: false,
      is_finished: !val.is_finished
    }
    const sure = window.confirm('プロジェクトを完了済リストに移動します。よろしいですか?');
    if (sure) {
    axios.patch(`/api/v1/projects/${val.id}`, data)
    .then(resp => {
      const newProjects = [...projects]
      newProjects[index].is_finished = resp.data.is_finished
      setProjects(newProjects)
    });
    notify()
    }
  }


  return (
    <>
      
      <div class="d-block d-md-none">
        <p class="vertical-title">Your Projects</p>
      </div>
      <h2 class="d-none d-md-block text-secondary">Your Projects</h2>
      <div class="w-100">
        <div id="non-project-text">未完了のプロジェクトはありません。</div>  
        <Tabs>
          <TabList>
            {projects.map((val) => {
              return (val.is_finished == false &&
                <Tab>
                  <TabColor active={val.active}>
                    {val.title}
                  </TabColor>
                </Tab>
              )
            })}
          </TabList>
          {projects.map((val, key) => {
            return (val.is_finished == false &&
              <div key={key}>
                <TabPanel>
                  <Paper elevation={2} id='maintab'>              
                    <Row>
                      {val.active ? (
                        <ActiveChecked>
                          <ActiveModeBg />
                          <ModeDisplay>
                            <h5 class="d-inline d-md-block pr-1" >集中モード</h5>
                            <span>解除するには<AiFillFire/>をクリックしてください</span>
                          </ModeDisplay>
                          <AiFillFire onClick={() => updateActive(key, val) } />
                        </ActiveChecked>
                      ) : (
                        <UnActiveChecked>
                          <AiOutlineFire onClick={() => updateActive(key, val)} />
                        </UnActiveChecked>
                      )}
                      <ProjectTitle active={val.active}>
                        <Tooltip title={val.title} enterDelay={1400}>
                          <span>{val.title}</span>
                        </Tooltip>
                      </ProjectTitle>
                    </Row>

                    <div class="text-center mb-3 text-nowrap over-flow-visible" id="deadline-display">
                      {val.deadline} 〆切&emsp;...&emsp;{showDiffDate(val.deadline)}
                    </div>
                    <Paper elevation={3}>                              
                      <div class="row description-box">
                          {val.description}
                      </div>
                    </Paper>

                    <div class="row mt-2 switch-board justify-content-center d-flex">
                      <div class="h-100 col-12 col-md-7">
                        <Paper elevation={3} class="h-100 w-100 m-1">
                          <div >
                          </div>
                        </Paper>
                      </div>
                      <div class="col-12 col-md-5 text-center">
                        <div class="text-center mt-3">
                          <Button variant="outlined" color="info" onClick={() => {
                            updateIsFinished(key, val)
                          }} className="font-weight-bold">
                            プロジェクト完了!
                          </Button>
                        </div>
                        <div class="text-center mt-2 mt-md-3">
                          <Link to={"/projects/" + val.id + "/edit"}>
                            <Button variant="contained" color="info">
                              プロジェクト編集
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div class="row m-2 foot-board justify-content-center d-none d-md-block">
                      <Paper elevation={3} class="m-1">
                          <div>
                          </div>
                      </Paper> 
                    </div>
                  </Paper>
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
import React,  { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { AiFillFire, AiFillHome, AiFillPlusCircle, AiFillPhone, AiFillCarryOut } from 'react-icons/ai'
import { useTimer } from 'use-timer'
import styled from 'styled-components'
import AddProject from './AddProject'
import MainProject from './MainProject'
import EditProject from './EditProject'
import './App.css'
import FinishProjects from './FinishProjects'
import Contact from './Contact'

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`

const ConcentModeBg = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  z-index: 1021;
`

function showWorkTime(countTime) {
  var CountSum
  CountSum = <span>今回は {Math.floor((parseInt(countTime,10)) / 60)}分 集中しました！</span>
  return CountSum;
}

function App() {
  const [isConcent, setConcent] = useState(false);
  const { time, start, pause, status } = useTimer()

  const startConcent = () => {
    setConcent(true);
    start();
  };

  const pauseConcent = () => {
    setConcent(false);
    pause();
  };

  return (
    <>
      <div class="row pt-5">
        <div class="col-2 col-md-4 pl-0">
          <nav class="vh-100 w-100 fixed-left" id="sidebarResponsive">
            <ul class="nav flex-column pt-5">
              <li  class="side-item">
                <Link to="/projects">
                  <AiFillHome/>&emsp;<span class="d-none d-md-inline-block">YourProjects</span>
                </Link>
              </li>
              <li  class="side-item">
                <Link to="/projects/new">
                  <AiFillPlusCircle/>&emsp;<span class="d-none d-md-inline-block">NewProject</span>
                </Link>
              </li>
              <li class="side-item">
                <Link to="/projects/finish">
                  <AiFillCarryOut/>&emsp;<span class="d-none d-md-inline-block">Finished</span>
                </Link>
              </li>
              <li  class="side-item">
                <Link to="/contact">
                  <AiFillPhone/>&emsp;<span class="d-none d-md-inline-block">Contact</span>
                </Link>
              </li>
              <li class="side-item"  id='concent-switch'>
                {isConcent ? 
                  <span onClick={pauseConcent}><AiFillFire color={'crimson'} /></span> :
                  <span onClick={startConcent}><AiFillFire/></span>
                }
                &emsp;<span class="d-none d-md-inline-block">Cocentration</span> 
              </li>
                <div className={isConcent ? 'visible' : 'invisible'}>
                  <ConcentModeBg>
                    <div class="active-mode-menu">
                      <h5 class="d-inline d-md-block mt-5 pr-1" >集中モード</h5>
                      <span>解除するには<AiFillFire/>をクリックしてください</span>
                      <div>
                        <p>経過時間{status === 'RUNNING' && <span>計測中... </span>}: {time} </p>
                      </div>
                    </div>
                  </ ConcentModeBg>
                </div>
              
            </ul>
          </nav>
        </div>
        <div class="col mr-1 p-0 bg-white">
          <p class="cons-time">
            {showWorkTime(time)}
          </p>
          <Wrapper>
            <Switch>
              <Route exact path="/projects" component={MainProject} />
              <Route exact path="/projects/new" component={AddProject} />
              <Route path="/projects/:id/edit" component={EditProject} />
              <Route exact path="/projects/finish" component={FinishProjects} />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </Wrapper>
        </div>

      </div>
    </>
  )
}

export default App
import React,  { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { AiFillFire, AiFillHome, AiFillPlusCircle, AiFillPhone, AiFillCarryOut } from 'react-icons/ai'
//import { useTimer } from 'use-timer'
import styled from 'styled-components'
import MainTab from './MainTab'
import ActiveWork from './ActiveWork'
import Reports from './Reports'
import UserStatus from './UserStatus'
import './App.css'
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

//function showWorkTime(countTime) {
//  var CountSum
//  CountSum = <span>今回は {Math.floor((parseInt(countTime,10)) / 60)}分 集中しました！</span>
//  return CountSum;
//}

function App() {
  //const [isConcent, setConcent] = useState(false);
  //const { time, start, pause, status } = useTimer()
//
  //const startConcent = () => {
  //  setConcent(true);
  //  start();
  //};

  //const pauseConcent = () => {
  //  setConcent(false);
  //  pause();
  //};

  return (
    <>
      <div class="row pt-5">
        <div class="col-2 col-md-4 pl-0">
          <nav class="vh-100 w-100 fixed-left" id="sidebarResponsive">
            <ul class="nav flex-column pt-5">
              <li  class="side-item">
                <Link to="/maintab">
                  <AiFillHome/>&emsp;<span class="d-none d-md-inline-block">済ここはメインタブに変更</span>
                </Link>
              </li>
              <li class="side-item">
                <Link to="/reports">
                  <AiFillCarryOut/>&emsp;<span class="d-none d-md-inline-block">済ここは過去学習記録一覧に変更</span>
                </Link>
              </li>
              <li  class="side-item">
                <Link to="/user_status">
                  <AiFillPlusCircle/>&emsp;<span class="d-none d-md-inline-block">済ここはユーザー情報に変更</span>
                </Link>
              </li>
              <li  class="side-item">
                <Link to="/contact">
                  <AiFillPhone/>&emsp;<span class="d-none d-md-inline-block">Contact</span>
                </Link>
              </li>
              <li class="side-item">
                <a href="ranking" target="_blank">
                  <AiFillPhone/>&emsp;<span class="d-none d-md-inline-block">済ここはランキングに変更</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col mr-1 p-0 bg-white">
          <Wrapper>
            <Switch>
              <Route exact path="/maintab" component={MainTab} />
              <Route exact path="/active_work" component={ActiveWork} />
              <Route exact path="/reports" component={Reports} />
              <Route exact path="/user_status" component={UserStatus} />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </Wrapper>
        </div>

      </div>
    </>
  )
}

export default App
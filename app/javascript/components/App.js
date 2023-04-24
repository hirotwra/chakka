import React,  { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { AiFillHome, AiFillMeh, AiFillPhone, AiFillCarryOut, AiTwotoneTrophy } from 'react-icons/ai'
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

function App() {
  return (
    <>
      <div class="row pt-5">
        <div class="col-2 col-md-4 pl-0">
          <nav class="vh-100 w-100 fixed-left" id="sidebarResponsive">
            <ul class="nav flex-column pt-5">
              <li  class="side-item">
                <Link to="/maintab">
                  <AiFillHome/>&emsp;<span class="d-none d-md-inline-block">メインタブ</span>
                </Link>
              </li>
              <li class="side-item">
                <Link to="/reports">
                  <AiFillCarryOut/>&emsp;<span class="d-none d-md-inline-block">学習記録一覧</span>
                </Link>
              </li>
              <li  class="side-item">
                <Link to="/user_status">
                  <AiFillMeh/>&emsp;<span class="d-none d-md-inline-block">ユーザー情報</span>
                </Link>
              </li>
              <li  class="side-item">
                <Link to="/contact">
                  <AiFillPhone/>&emsp;<span class="d-none d-md-inline-block">コンタクト</span>
                </Link>
              </li>
              <li class="side-item">
                <a href="ranking" target="_blank">
                  <AiTwotoneTrophy/>&emsp;<span class="d-none d-md-inline-block">ランキング</span>
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
import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
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

function App() {

  return (
    <>
    <div class="row pt-5">
      <div class="col-2 col-md-4 pl-0">
        <nav class="vh-100 w-100 fixed-left" id="sidebarResponsive">
            <ul class="nav flex-column pt-5">
              <li  class="side-item">
                <Link to="/projects">
                  <i class="fa-solid fa-house"/>&emsp;<span class="d-none d-md-inline-block">YourProjects</span>
                </Link>
              </li>
              <li  class="side-item">
                <Link to="/projects/new">
                  <i class="fa-solid fa-circle-plus"/>&emsp;<span class="d-none d-md-inline-block">NewProject</span>
                </Link>
              </li>
              <li class="side-item">
                <Link to="/projects/finish">
                  <i class="fa-solid fa-clipboard-check"/>&emsp;<span class="d-none d-md-inline-block">Finished</span>
                </Link>
              </li>
              <li  class="side-item">
                <Link to="/contact">
                  <i class="fa-solid fa-phone"/>&emsp;<span class="d-none d-md-inline-block">Contact</span>
                </Link>
              </li>
            </ul>
          
        </nav>
      </div>
      <div class="col mr-1 p-0 bg-white">
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
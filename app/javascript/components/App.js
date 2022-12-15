import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddProject from './AddProject'
import MainProject from './MainProject'
import EditProject from './EditProject'
import './App.css'
import FinishProjects from './FinishProjects'
import Contact from './Contact'


const NavItem = styled.li`
  font-size: 16px;
  font-weight: bold;
  padding: 0px 10px 20px 10px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`

function App() {

  return (
    <>
    <div class="row pt-5">
      <div class="col-2 col-md-3">
        <nav class="vh-100 w-100 bg-info shadow fixed-left" id="sidebarResponsive">
            <ul class="nav flex-column pt-5">
              <NavItem  class="nav-item mb-4">
                <Link to="/projects">
                  <i class="fa-solid fa-house"/>&emsp;<span class="d-none d-md-inline-block">Your Projects</span>
                </Link>
              </NavItem>
              <NavItem  class="nav-item mb-4">
                <Link to="/projects/new">
                  <i class="fa-solid fa-circle-plus"/>&emsp;<span class="d-none d-md-inline-block">New Project</span>
                </Link>
              </NavItem>
              <NavItem  class="nav-item mb-4">
                <Link to="/projects/finish">
                  <i class="fa-solid fa-clipboard-check"/>&emsp;<span class="d-none d-md-inline-block">Finished List</span>
                </Link>
              </NavItem>
              <NavItem  class="nav-item mb-4">
                <Link to="/contact">
                  <i class="fa-solid fa-phone"/>&emsp;<span class="d-none d-md-inline-block">Contact</span>
                </Link>
              </NavItem>
            </ul>
          
        </nav>
      </div>
      <div class="col mr-1 p-0">
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
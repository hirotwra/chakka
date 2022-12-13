import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddProject from './AddProject'
import MainProject from './MainProject'
import EditProject from './EditProject'
import './App.css'
import FinishProjects from './FinishProjects'
import Contact from './Contact'

const Nabvar = styled.nav`
  background: #ff7150;
  height: 50vh;
`

const NavItems = styled.ul`
  list-style: none;
  padding: 20px;
`

const NavItem = styled.li`
  font-size: 15px;
  font-weight: bold;
  padding: 20px;
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
      <div class="row">
        <div class="col-3 vh-100">
          <Nabvar>
            <NavItems>
              <NavItem>
                <Link to="/projects">
                  Main
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/projects/new">
                  +New Project
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/projects/finish">
                  FinishedProjects
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/contact">
                  Contact
                </Link>
              </NavItem>
            </NavItems>
          </Nabvar>
        </div>

        <div class="col">
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
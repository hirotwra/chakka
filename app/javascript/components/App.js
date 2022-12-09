import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddProject from './AddProject'
import MainProject from './MainProject'
import EditProject from './EditProject'
import './App.css'
import UserProperty from './UserProperty'
import Reward from './Reward'

const Nabvar = styled.nav`
  background: #ff7150;
  height: 100vh;
  padding: 0px 20px;
`

const NavItems = styled.ul`
  list-style: none;
`

const NavItem = styled.li`
  font-size: 15px;
  font-weight: bold;
  display: block;
  margin: 10px;
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
                <Link to="/users/property">
                  Property
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/rewards">
                  Reward
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
              <Route exact path="/users/property" component={UserProperty} />
              <Route exact path="/rewards" component={Reward} />
            </Switch>
          </Wrapper>
        </div>
      </div>

    </>
  )
}

export default App
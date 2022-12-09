import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddProject from './AddProject'
import MainProject from './MainProject'
import EditProject from './EditProject'
import './App.css'

const Nabvar = styled.nav`
  background: #ff7f50;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const NavItem = styled.li`
  font-size: 17px;
  font-weight: bold;
  opacity: 0.7;
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
  const logOutUsers = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete('/api/v1/users/sign_out')
      .then(resp => {
        set([])
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
  return (
    <>
      <Nabvar>
        <Logo>
          CHAKKA!
        </Logo>
        <NavItems>
        <NavItem>
            <Link to="/projects">
              
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/projects">
              メインボード
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/projects/new">
              新規プロジェクト作成
            </Link>
          </NavItem>
        </NavItems>
      </Nabvar>
      <Wrapper>
        <Switch>
          <Route exact path="/projects" component={MainProject} />
          <Route exact path="/projects/new" component={AddProject} />
          <Route path="/projects/:id/edit" component={EditProject} />
        </Switch>
      </Wrapper>
    </>
  )
}

export default App
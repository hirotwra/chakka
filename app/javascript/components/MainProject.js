import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'
//import { ensureTrailingSlash } from '@rails/webpacker/package/utils/helpers'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ProjectTitle = styled.span`
font-size: 27px;
  ${({ active }) => active && `
    color: red;
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

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

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
      active: !val.active
    }
    axios.patch(`/api/v1/projects/${val.id}`, data)
    .then(resp => {
      const newProjects = [...projects]
      newProjects[index].active = resp.data.active
      setProjects(newProjects)
    })
  }

  return (
    <>
      <h1>プロジェクト情報</h1>

      <div>
      <Tabs>
        <TabList>
        {projects.map((val) => {
            return (
          <Tab>{val.title}</Tab>
            )})}
        </TabList>
        {projects.map((val, key) => {
          return (
              <div key={key}>
              <TabPanel>
              <Row>
              {val.active ? (
                    <CheckedBox>
                      <ImCheckboxChecked onClick={() => updateActive(key, val) } />
                    </CheckedBox>
                    ) : (
                    <UncheckedBox>
                      <ImCheckboxUnchecked onClick={() => updateActive(key, val) } />
                    </UncheckedBox>
                  )}
                  <ProjectTitle active={val.active}>
                    {val.title}
                  </ProjectTitle>
                  <Link to={"/projects/" + val.id + "/edit"}>
                  <EditButton>
                    <AiFillEdit />
                  </EditButton>
                </Link>
                </Row>

                
                <div>{val.deadline} 〆</div>             
                <h3>説明</h3>
                <div>{val.description}</div>  
              </TabPanel>
              </div>
            //  <Row key={key}>
            //    {val.is_completed ? (
            //      <CheckedBox>
            //        <ImCheckboxChecked onClick={() => updateIsCompleted(key, val) } />
            //      </CheckedBox>
            //    ) : (
            //      <UncheckedBox>
            //        <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, val) } />
            //      </UncheckedBox>
            //    )}
            //    <TodoName is_completed={val.is_completed}>
            //      {val.name}
            //    </TodoName>
            //    <Link to={"/todos/" + val.id + "/edit"}>
            //      <EditButton>
            //        <AiFillEdit />
            //      </EditButton>
            //    </Link>
            //  </Row>
            
            )
        })}      
        </Tabs>
      </div>
    </>
  )
}

export default MainProject
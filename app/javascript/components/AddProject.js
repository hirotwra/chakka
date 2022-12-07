import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiSend } from 'react-icons/fi'

const InputAndButton = styled.div`
  justify-content: space-between;
  margin-top: 20px;
`

const InputForm = styled.input`
  font-size: 20px;
  width: 80%;
  height: 30px;
  margin-top: 18px;
  padding: 2px 7px;
`

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1E90FF;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: default;
  `}
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

toast.configure()

function AddProject(props) {
  const initialProjectState = {
    id: null,
    title: null,
    deadline: Date.today,
    required_time: 30,
    description: null,
  };

  const [project, setProject] = useState(initialProjectState);

  const notify = () => {
    toast.success("プロジェクトを作成しました！", {
      position: "bottom-center",
      hideProgressBar: true
    });
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const saveProject = () => {
    var data = {
      title: project.title,
      deadline: project.deadline,
      required_time: project.required_time,
      description: project.description,
    };

    axios.post('/api/v1/projects', data)
    .then(resp => {
      setProject({
        id: resp.data.id,
        title: resp.data.title,
        deadline: resp.data.deadline,
        required_time: resp.data.required_time,
        active: resp.data.active
      });
      notify();
      props.history.push("/projects");
    })
    .catch(e => {
      console.log(e)
    })
  };


  return (
    <>
      <h1>New Project</h1>
      <InputAndButton>
      <label>
        <InputForm
          type="string"
          required
          value={project.title}
          onChange={handleInputChange}
          name="title"
        />
        プロジェクト名
      </label>
      <label>
        <InputForm
          type="date"
          required
          value={project.deadline}
          onChange={handleInputChange}
          name="deadline"
        />
        締め切り日
      </label>
      <label>
        <InputForm
          type="text"
          value={project.description}
          onChange={handleInputChange}
          name="description"
        />
        説明文
      </label>
        <Button
          onClick={saveProject}
          disabled={(!project.title || /^\s*$/.test(project.title) || !project.deadline)}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </>
  )
}

export default AddProject
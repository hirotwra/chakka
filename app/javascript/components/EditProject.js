import React, { useState, useEffect } from "react"
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const InputAndButton = styled.div`
  justify-content: space-between;

  margin-top: 20px;
`

const InputForm = styled.input`
  font-size: 15px;
  width: 100%;
  height: 30px;
  justify-content: center;
  margin-top: 18px;
  padding: 2px 7px;
`

const EditButton = styled.button`
  color: white;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px;
  background: #0ac620;
  border-radius: 3px;
  border: none;
`

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

toast.configure()

function EditProject(props) {
  const initialProjectState = {
    id: null,
    title: null,
    deadline: Date.today,
    required_time: 30,
    description: null,
  };

  const [currentProject, setCurrentProject] = useState(initialProjectState);

  const notify = () => {
    toast.success("Project successfully updated!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  }

  const getProject = id => {
    axios.get(`/api/v1/projects/${id}`)
    .then(resp => {
      setCurrentProject(resp.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    getProject(props.match.params.id);
    console.log(props.match.params.id)
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const updateProject = () => {
    axios.patch(`/api/v1/projects/${currentProject.id}`, currentProject)
    .then(response => {
      notify();
      props.history.push("/projects");
    })
    .catch(e => {
      console.log(e);
    });
  };

  const deleteProject = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete(`/api/v1/projects/${currentProject.id}`)
      .then(resp => {
        console.log(resp.data);
        props.history.push("/projects");
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  return (
    <>
      <h1>Editing Project</h1>
      <InputAndButton>
      <label><div>
        <InputForm
          type="string"
          required
          value={currentProject.title}
          onChange={handleInputChange}
          name="title"
        />
        プロジェクト名
        </div></label>
      
      <label><div>
        <InputForm
          type="date"
          required
          value={currentProject.deadline}
          onChange={handleInputChange}
          name="deadline"
        />
        締め切り日
        </div></label>

      <label><div>
        <InputForm
          type="text"
          value={currentProject.description}
          onChange={handleInputChange}
          name="description"
        />
        説明文
        </div></label>
        <EditButton
          type="submit"
          onClick={updateProject}
        >
          Update
        </EditButton>
        <DeleteButton
          className="badge badge-danger mr-2"
          onClick={deleteProject}
        >
          Delete
        </DeleteButton>

      </InputAndButton>
    </>
  );
};

export default EditProject
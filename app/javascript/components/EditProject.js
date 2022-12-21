import React, { useState, useEffect } from "react"
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@mui/material/Button'

const InputAndButton = styled.div`
  justify-content: space-around;
  margin-top: 20px;
`

const InputForm = styled.input`
  font-size: 15px;
  width: 90%;
  height: 20px;
  justify-content: center;
  margin-top: 18px;
  padding: 2px 7px;
`

const InputTextArea = styled.textarea`
  font-size: 15px;
  resize: none;
  height: 150px;
  width: 90%;
  justify-content: center;
  margin-top: 15px;
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
  cursor: pointer;
`

const DeleteButton = styled.button`
  color: white;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px;
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
      <div class="d-block d-md-none">
        <p class="vertical-title">Edit</p>
      </div>
      <h2 class="d-none d-md-block text-secondary">Edit</h2>

      <InputAndButton>
        <div class="field form-group row">
          <InputForm
            type="string"
            required
            value={currentProject.title}
            onChange={handleInputChange}
            name="title"
            class="form-control" 
            placeholder='タイトル入力(100文字以内)'
          />
          <label class="col-sm-6 col-form-label">プロジェクト名</label>
        </div>
        <div class="field form-group row">
          <InputForm
            type="date"
            required
            value={currentProject.deadline}
            onChange={handleInputChange}
            name="deadline"
            class="form-control"
          />
          <label class="col-sm-6 col-form-label">締め切り日</label>
        </div>
        <div class="field form-group row">
          <InputTextArea
            value={currentProject.description}
            onChange={handleInputChange}
            name="description"
            class="form-control"
            placeholder='説明文を入力(任意)'
          />
          <label class="col-sm-6 col-form-label">説明</label>
        </div>
        <div class="p-3 d-flex justify-content-center">
          <Button
            variant="contained" 
            color="info"
            type="submit"
            onClick={updateProject}
            className="mr-3"
          >
            更新
          </Button>
          <Button
            variant="contained" 
            color="error"
            onClick={deleteProject}
            className="ml-3"
          >
            削除
          </Button>
        </div>
      </InputAndButton>
    </>
  );
};

export default EditProject
import React, { useState } from 'react'
//コンテクストオブジェクトの読みこみ
import { useContext } from "react";
import { UserInputData } from "./ActiveWork";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'
import styled from 'styled-components'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const InputAndButton = styled.div`
  justify-content: space-between;
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

const Icon = styled.span`
  align-items: center;
  margin: 0 7px;
`

function Worked(props) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
        textBox: "",
    },
  });

  //ActiveWorkで作ったコンテクストオブジェクトを引き渡す
  const [report, setReport] = useContext(UserInputData);
  const onSubmit = (action) => {
    if(action === 'back') {
      props.handleBack();
    } else {
      props.handleNext();
    }
    setReport({...report, "Worked": data });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    report({ ...report, [name]: value });
  };

  const saveReport = () => {
    var data = {
      y_record: report.y_record,
      w_record: report.w_record,
      t_record: report.t_record
    };

    axios.post('/api/v1/reports', data)
    .then(resp => {
      setReport({
        id: resp.data.id,
        y_record: resp.data.y_record,
        w_record: resp.data.w_record,
        t_record: resp.data.t_record
      });
      notify();
      props.history.push("/reports");
    })
    .catch(e => {
      console.log(e)
    })
  };



  return (
    <>

      <InputAndButton>
        <div class="field form-group row">
          <InputTextArea
            value={report.t_record}
            onChange={handleInputChange}
            name="t_record"
            class="form-control"
            placeholder='今回取り組んだことを記録しましょう'
            id="t_record-input"
          />
          <label class="col-sm-6 col-form-label">次やること</label>
        </div>
        <div>
        <Button
          onClick={saveReport}
          id="submit-btn"
        >
          完了
        </Button>
        </div>
      </InputAndButton>

    </>
  )
}

export default Worked
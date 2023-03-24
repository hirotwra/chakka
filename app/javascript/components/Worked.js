import React, { useState } from 'react';
import styled from 'styled-components';
//コンテクストオブジェクトの読みこみ
import { useContext } from "react";
import { UserInputData } from "./ActiveWork";
import { useForm, Controller } from "react-hook-form";

import axios from 'axios';
import Button from '@mui/material/Button';

const InputTextArea = styled.textarea`
  font-size: 15px;
  resize: none;
  height: 150px;
  width: 90%;
  justify-content: center;
  margin-top: 15px;
  padding: 2px 7px;
`

const InputAndButton = styled.div`
  justify-content: space-between;
  margin-top: 20px;
`
function Worked(props) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
        textBox: "",
    },
  });

  //ActiveWorkで作ったコンテクストオブジェクトを引き渡す
  const {report, setReport} = useContext(UserInputData);
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
<form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="textarea"
          render={({ field }) => (
            <InputTextArea
              {...field}
              label="t_record"
              fullWidth
              margin="normal"
              placeholder="プレースホルダー"
            />
          )}
        />
        <div>
        <Button
            variant="contained"
            color="primary"
            type="submit"
        >
            次へ
        </Button>
        </div>
      </form>
        <Button variant="contained" color="primary" onClick={props.handleBack}>
                戻る
            </Button>
            <Button variant="contained" color="primary" onClick={onSubmit}>
                送信
            </Button>


    </>
  )
}

export default Worked
import React, { useState } from 'react';
import styled from 'styled-components';
//コンテクストオブジェクトの読みこみ
import { useContext } from "react";
import { UserInputData } from "./ActiveWork";
import { useForm, Controller } from "react-hook-form";
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
function Working(props) {

  const { control, handleSubmit } = useForm({
  });
  
//ActiveWorkで作ったコンテクストオブジェクトを引き渡す
  const {report, setReport} = useContext(UserInputData);
  const onSubmit = (data) => {
    props.handleNext();
    setReport({...report, "Working": data });
  };

  //const saveReport = () => {
  //  var data = {
  //    y_record: report.y_record,
  //    w_record: report.w_record,
  //  };
//
  //  axios.post('/api/v1/reports', data)
  //  .then(resp => {
  //    setReport({
  //      id: resp.data.id,
  //      y_record: resp.data.y_record,
  //      w_record: resp.data.w_record,
  //      t_record: "仮データ"
  //    });
  //    notify();
  //    props.history.push("/reports");
  //  })
  //  .catch(e => {
  //    console.log(e)
  //  })
  //};



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="textarea"
          render={({ field }) => (
            <InputTextArea
              {...field}
              label="y_record"
              fullWidth
              margin="normal"
              placeholder="プレースホルダー"
            />
          )}
        />
        <Controller
          control={control}
          name="textarea"
          render={({ field }) => (
            <InputTextArea
              {...field}
              label="w_record"
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
    </>
  )
}

export default Working
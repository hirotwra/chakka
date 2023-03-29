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

const InputAndButton = styled.div`
  justify-content: space-between;
  margin-top: 20px;
`
function Worked(props) {
  const { control, handleSubmit, getValues} = useForm({
  });

  //ActiveWorkで作ったコンテクストオブジェクトを引き渡す
  const {report, setReport} = useContext(UserInputData);
  const onSubmit = (action) => {
    if(action === 'back') {
        props.handleBack();
    } else {
      props.handleNext();
    }
    const data = getValues();
    setReport({...report, "Worked": data });
  };

  //const saveReport = () => {
  //  var data = {
  //    is_finished: true,
  //    y_record: report.y_record,
  //    w_record: "no",
  //    t_record: report.y_record,
  //  };
//
  //  axios.post('/api/v1/reports', data)
  //  .then(resp => {
  //    setReport({
  //      id: resp.data.id,
  //      is_finished: resp.data.is_finished,
  //      y_record: resp.data.y_record,
  //      w_record: resp.data.w_record,
  //      t_record: resp.data.t_record
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
          name="tRecord"
          render={({ field }) => (
            <InputTextArea
              {...field}
              label="tRecord"
              fullWidth
              margin="normal"
              placeholder="次やること"
            />
          )}
        />
        <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit("back")}
        >
            前へ
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
              次へ
        </Button>
      </form>
    </>
  )
}

export default Worked
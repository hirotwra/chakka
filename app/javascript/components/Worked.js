import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from "react-hook-form";
//コンテクストオブジェクトの読みこみ
import { useContext } from "react";
import { UserInputData } from "./ActiveWork";
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

function Worked(props) {
  //hook-formで使用
  const { control, handleSubmit, getValues, setValue} = useForm({
    defaultValues: {
      tRecord: "",
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
    const data = getValues();
    setReport({...report, "Worked": data });
    props.setFormValue({ ...props.formValue, Worked: data });
  };

  useEffect(() => {
    if (props.formValue && props.formValue.Worked) {
      setValue("tRecord", props.formValue.Worked.tRecord, {
        shouldDirty: true,
      });
    }
  }, [props.formValue]);
  

  return (
    <>
      <div>振り返り</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="tRecord"
          render={({ field }) => (
            <InputTextArea
              required
              {...field}
              label="tRecord"
              fullWidth
              margin="normal"
              placeholder="次やること"
            />
          )}
        />
        <div>
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
        </div>
      </form>
    </>
  )
}

export default Worked
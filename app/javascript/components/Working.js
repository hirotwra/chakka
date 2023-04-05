import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
//コンテクストオブジェクトの読みこみ
import { useContext } from "react";
import { UserInputData } from "./ActiveWork";

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
  const { control, handleSubmit, setValue, lastReport } = useForm({
		defaultValues: {
			yRecord: "",
			wRecord: "",
	},
  });

	//ActiveWorkで作ったコンテクストオブジェクトを引き渡す
	const {report, setReport} = useContext(UserInputData);
  const onSubmit = (data) => {
    props.handleNext();
    setReport({...report, "Working": data });
		props.setFormValue({ ...props.formValue, Working: data });
  };
	
	useEffect(() => {
    if (props.formValue && props.formValue.Working) {
      setValue("yRecord", props.formValue.Working.yRecord, {
        shouldDirty: true,
      });
			setValue("wRecord", props.formValue.Working.wRecord, {
        shouldDirty: true,
      });
    }
  }, [props.formValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="yRecord"
          render={({ field }) => (
            <InputTextArea
              {...field}
              label="yRecord"
              fullWidth
              margin="normal"
              placeholder="やったこと"
            />
          )}
        />
        <Controller
          control={control}
          name="wRecord"
          render={({ field }) => (
            <InputTextArea
              {...field}
              label="wRecord"
              fullWidth
              margin="normal"
              placeholder="わかったこと"
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
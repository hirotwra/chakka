import React, { useState } from 'react'
import styled from 'styled-components'

import Stepper from '@mui//material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Working from "./Working";
import Worked from "./Worked";

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

function getSteps() {
  return [
    'ワーク中',
    'ワーク完了'
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0: return <Working/>;
    case 1: return 'Unknown stepIndex';//<Worked/>;
    default: return 'Unknown stepIndex';
  }
}

//context作成
export const UserInputData = React.createContext();

function ActiveWork() {
//step管理
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

//state管理
  const initialReportState = {
    id: null,
    is_finished: false,
    y_record: null,
    w_record: null,
    t_record: null
  };

  const [report, setReport] = useState(initialReportState);
  const value = {
    report,
    setReport
};

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <UserInputData.Provider value={value}>
        { getStepContent(activeStep, handleNext, handleBack)}
      </UserInputData.Provider>
      {activeStep === steps.length ? (
        <div>
          <Typography >全ステップの表示を完了</Typography>
          <Button onClick={handleReset}>リセット</Button>
        </div>
      ) : (
        <div>
          <Typography >{getStepContent(activeStep)}</Typography>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            戻る
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? '送信' : '次へ'}
          </Button>
        </div>
      )}
    </>
  )
}

export default ActiveWork
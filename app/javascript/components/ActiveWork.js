import React, { useState } from 'react'
import styled from 'styled-components'

import Stepper from '@mui//material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Working from "./Working";
import Worked from "./Worked";

function getSteps() {
  return [
    'ワーク中',
    'ワーク完了'
  ];
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

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: return <Working handleNext={handleNext}/>;
      case 1: return <Worked handleBack={handleBack}/>;
      default: return 'Unknown stepIndex';
    }
  }

//state管理
  const initialReportState = {
    id: null,
    is_finished: false,
    y_record: null,
    w_record: null,
    t_record: null
  };
  const [report, setReport] = React.useState(initialReportState);
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

    </>
  )
}

export default ActiveWork
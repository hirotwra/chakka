import React, { useState } from 'react'
import styled from 'styled-components'
import Stepper from '@mui//material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
//子コンポーネント呼び出し
import Working from "./Working";
import Worked from "./Worked";
import Confirm from "./Confirm";

function getSteps() {
  return [
    'ワーク中',
    'ワーク完了',
		'確認',
  ];
}

//context作成
export const UserInputData = React.createContext();

function ActiveWork() {
//step管理
  const [activeStep, setActiveStep] = React.useState(0);
	const [formValue, setFormValue] = useState({});
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: return <Working 
				handleNext={handleNext}
				formValue={formValue}
				setFormValue={setFormValue}
			/>;
      case 1: return <Worked 
				handleNext={handleNext} 
				handleBack={handleBack}
				formValue={formValue}
				setFormValue={setFormValue}
			/>;
      case 2: return <Confirm handleBack={handleBack} />;
      default: return 'Unknown stepIndex';
    }
  }

  const [report, setReport] = React.useState({});
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
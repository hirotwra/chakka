import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1E90FF;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: default;
  `}
`

const Icon = styled.span`
  align-items: center;
  margin: 0 7px;
`

function ActiveWork(props) {
  const initialReportState = {
    id: null,
    is_finished: false,
    y_record: null,
    w_record: null,
    t_record: null
  };

  const onSubmit = () => {
    props.handleNext();
};

  function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <Basic handleNext={handleNext} />;
        case 1:
            return <Optional handleNext={handleNext} handleBack={handleBack} />;
        case 2:
            return <Confirm handleBack={handleBack} />;
        default:
            return 'Unknown stepIndex';
    }
}

  const [report, setReport] = useState(initialReportState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const saveReport = () => {
    var data = {
      is_finished: report.is_finished,
      y_record: report.y_record,
      w_record: report.w_record,
      t_record: report.t_record
    };

    axios.post('/api/v1/reports', data)
    .then(resp => {
      setReport({
        id: resp.data.id,
        is_finished: resp.data.is_finished,
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
      <div class="d-block d-md-none">
        <p class="vertical-title">ワーク中</p>
      </div>
      <h2 class="d-none d-md-block text-secondary">ワーク中</h2>
      <InputAndButton>
      <div class="field form-group row">
          <InputTextArea
            value={report.y_record}
            onChange={handleInputChange}
            name="y_record"
            class="form-control"
            placeholder='わかったこと」を記録してください'
            id="y-record-input"
          />
          <label class="col-sm-6 col-form-label">y</label>
        </div>
        <div class="field form-group row">
          <InputTextArea
            value={report.w_record}
            onChange={handleInputChange}
            name="w_record"
            class="form-control"
            placeholder='わかったこと」を記録してください'
            id="w-record-input"
          />
          <label class="col-sm-6 col-form-label">w</label>
        </div>
        <div>
          <Button
            onClick={() => onSubmit("next")}
            id="submit-btn"
          >
            次へ
          </Button>
        </div>
      </InputAndButton>
    </>
  )
}

export default ActiveWork
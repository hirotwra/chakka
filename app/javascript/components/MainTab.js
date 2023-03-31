import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tabs/style/react-tabs.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

const Modal = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  top:0;
  left:0;
	display: flex;
  align-items: center;
  justify-content: center;
	z-index: 1;
`

function MainTab() {
	//modal表示用
	const [showModal, setShowModal] = useState(false);
	const location = useLocation();
	
  useEffect(() => {
    if (location.state && location.state.showModal) {
      setShowModal(true);
    }
  }, [location]);

	const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
			{showModal && (
				<Modal>
					<Paper sx={{ p: 3 }}>
						<h3>ワーク完了!</h3>
						<div>ここに獲得経験値</div>
						<Button variant="text" onClick={handleCloseModal}>閉じる</Button>
					</Paper>
				</Modal>
			)}
      <div class="d-block d-md-none">
        <p class="vertical-title">メインタブ</p>
      </div>
      <h2 class="d-none mr-2 d-md-block text-secondary">メインタブ</h2>
      <div class="w-100">
        <h3 class="d-none mr-2 d-md-block text-secondary">次やること:</h3>
        <div>次のレベルまで:</div>
        <div id="non-project-text">着手している:</div>
				<Link to="/active_work">
          <Button
						variant="contained"
						color="primary"
					>
						ワーク開始
					</Button>
        </Link>
      </div>
    </>
  )
}

export default MainTab
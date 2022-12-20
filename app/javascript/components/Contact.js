import React from 'react'
import { AiFillGithub, AiFillTwitterCircle} from 'react-icons/ai'

function Contact() {
  return (
    <>
      <div class="d-block d-md-none">
        <p class="vertical-title">連絡先</p>
      </div>
      <h2 class="d-none d-md-block text-secondary">連絡先</h2>
      <div>つくった人↓</div>
        <div class="d-flex p-3 text-align-center">
          <p class="lead pr-1 font-weight-bold">Tawara Hiroyasu</p>
          <a href='https://github.com/HiroyasuTawara' class="m-3"><AiFillGithub/></a>
          <a href='https://twitter.com/Hiro_Twr_49' class="m-3"><AiFillTwitterCircle/></a>
        </div>
    </>
  )
}

export default Contact
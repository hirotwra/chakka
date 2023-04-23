import React from 'react'
import { AiFillGithub, AiFillTwitterCircle} from 'react-icons/ai'

function Contact() {
  return (
    <>
      <div class="d-block d-md-none">
        <p class="vertical-title">Contact</p>
      </div>
      <h2 class="d-none d-md-block text-secondary">Contact</h2>

      <div class="d-flex d-md-block p-3 align-items-center">
        <p class="lead pr-1 font-weight-bold">Tawara Hiroyasu</p>
        <a href='https://github.com/HiroyasuTawara' class="m-3"><AiFillGithub size={25}/></a>
        <a href='https://twitter.com/Hiro_Twr_49' class="m-3"><AiFillTwitterCircle size={25}/></a>
      </div>
    </>
  )
}

export default Contact
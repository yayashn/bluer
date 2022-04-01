import { MutableRefObject, useRef, useState } from "react";
import { Bio } from "./Bio";
import { Container } from "../common/Container";
import MainPost from "./MainPost";
import { useRecoilState } from "recoil";
import postsState from "../../atoms/postsState";
import alertState from "../../atoms/alertState";
import Posts from "./Posts";

export default () => {
  return (
    <Container>
      <div className='flex flex-col flex-grow'>
        <MainPost/>
        <Posts/>
      </div>
      <div className='flex flex-col'>
        <Bio></Bio>
      </div>
    </Container>
  )
}
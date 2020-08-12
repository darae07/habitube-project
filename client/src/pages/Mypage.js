import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
//container
import TodoBoxContainer from './TodoBoxContainer';
import Nav from './Nav';
// modules
import { getMypage } from '../modules/mypage';
import { getProgress } from '../modules/progress';
//css
import { Container, Button, Row, Col } from 'reactstrap';
import makeit from '../etc/img/26379-demo-files.json';
import Lottie from 'react-lottie';

// 마이페이지에서 dispatch(getMypage())요청으로 box데이터 불러옴
// data = boxes => 컨테이너로 넘겨줌

const Mypage = ({ userinfo, isLogin }) => {
  const { data, doing, error } = useSelector((state) => state.mypage);
  const err = useSelector((state) => state.mypage.pending);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(err);
    if (!isLogin) return history.push('/login');
    dispatch(getMypage());
    dispatch(getProgress());
  }, []);

  return (
    <div className="mypage">
      <Container>
        <Nav userinfo={userinfo} />
        <h2>당신의 주제: {userinfo.keyword}</h2>
        <TodoBoxContainer boxes={data} userinfo={userinfo} />
      </Container>
      {error && <Makeit />}
    </div>
  );
};

export default withRouter(Mypage);

// 유저정보 불러올수 없는경우 목표설정페이지로 넘어갈수있도록하는 컴포넌트
const Makeit = () => {
  let history = useHistory();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: makeit,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Container>
      <Lottie options={defaultOptions} width={600} />
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Button
            color="success"
            className="achievementgoal-btn"
            onClick={() => history.push('/achievementgoal')}
          >
            맞춤형 달력 만들러 가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

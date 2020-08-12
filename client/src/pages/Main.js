import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import { Container, Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass,
  faCalendarDay,
  faChartArea,
} from '@fortawesome/free-solid-svg-icons';
import animeition from '../etc/img/408-youtube-icon-reveal.json';
import Lottie from 'react-lottie';

const Main = () => {
  const history = useHistory();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animeition,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="main">
      <Container>
        <div className="hi">
          <div>안녕하세요, 하비튜브입니다.</div>
        </div>
        <div className="introduce-myself">
          <div>여러분은 어떤 취미를 가지고 계신가요?</div>
          <div>혹시, 취미가 없어서 고민이신가요?</div>
          <div>일상에 지쳐 꾸준한 취미가 없는 당신</div>
          <div>여기 그런 당신을 위한 달력이 있습니다.</div>
          <div>제가 누구인지, 저를 어떻게 사용하시면 되는지 알려드릴게요.</div>
          <div>부담은 잠시 내려놓고 저와 함께해요.</div>
        </div>
        <h1>
          <Button
            color="success"
            onClick={() => history.push('/login')}
            className="main-btn"
          >
            로그인하러가기
          </Button>
        </h1>
        <div className="youtube-ani">
          <Lottie options={defaultOptions} />
        </div>
        <div className="main-icons">
          <hr className="line" />

          <Row>
            <Col>
              {' '}
              <FontAwesomeIcon icon={faCompass} className="font-icon" />
              <div className="sub">
                <div className="sub-title br">키워드 정하기</div>
                꾸준히 해보고싶은 주제를 알려주세요. <p className="br" />
                우리는 YouTube를 이용해서 가볍게 취미생활을 시작할거에요.
              </div>
            </Col>
            <Col>
              {' '}
              <FontAwesomeIcon icon={faCalendarDay} className="font-icon" />
              <div className="sub">
                <div className="sub-title br">맞춤형 달력</div>
                얼마동안 하고싶은지, 얼마나 자주 하고싶은지 알려주세요.{' '}
                <p className="br" />
                텅텅 빈 달력이 아닌, 당신의 용도에 꼭 맞는 달력을 만들어드려요.
              </div>
            </Col>
            <Col>
              {' '}
              <FontAwesomeIcon icon={faChartArea} className="font-icon" />
              <div className="sub">
                <div className="sub-title br">하나씩 달성하기</div>
                맞춤형 달력으로 꾸준히 달성해보세요. <p className="br" />
                친구들에게 자랑해보세요.
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default withRouter(Main);

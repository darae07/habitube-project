import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form } from 'reactstrap';
import '../etc/App.css';
import Lottie from 'react-lottie';
import animationData from '../etc/11272-party-popper';

class Complete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Form className="complete-form">
        <h1 className="text-center">
          <span className="font-weight-bold">
            축하합니다 <br></br>목표를 모두 달성하셨습니다.
          </span>
        </h1>
        <Lottie
          width={400}
          height={400}
          options={{
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidyMid slice',
            },
          }}
        ></Lottie>

        <Form className="text-center">
          <Link to="/mypage">다시 새로운 목표를 설정해보세요</Link>
        </Form>
        {/* 다시 그 id 에 해당하는 db에 todobox table을 지우고 mypage로 redirect. */}
      </Form>
    );
  }
}

export default withRouter(Complete);

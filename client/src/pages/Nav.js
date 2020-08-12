import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Progress,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader,
} from 'reactstrap';
import { useSelector } from 'react-redux';

const Navi = ({ userinfo }) => {
  const progress = useSelector((state) => state.progress.data.progress);
  const [popup, setPopup] = useState(false);
  return (
    <>
      {popup && <ProgressPopup />}
      <Row className="mynav">
        <Col xs="8">
          <Nav>
            <NavItem>
              <NavLink className="link" href="/">
                Habitube 소개
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="link" href="#">
                취미 보러가기
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled href="#">
                {userinfo.username}님 안녕하세요
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col
          xs="4"
          className="my-progress-bar"
          onMouseEnter={() => setPopup(true)}
          onMouseLeave={() => setPopup(false)}
        >
          <Progress multi>
            <Progress animated bar color="success" value={progress} />
          </Progress>
        </Col>
        <hr />
      </Row>
    </>
  );
};

export default Navi;

const ProgressPopup = () => {
  const progress = useSelector((state) => state.progress.data.progress);

  return (
    <div className="mytoast">
      <Toast>
        <ToastHeader>달성률</ToastHeader>
        <ToastBody>{progress}%</ToastBody>
      </Toast>
    </div>
  );
};

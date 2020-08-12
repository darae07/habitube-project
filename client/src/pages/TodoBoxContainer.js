import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TodoBox from './TodoBox';
import { getMypage } from '../modules/mypage';
import { Row, Button } from 'reactstrap';
import '../etc/App.css';
import animeition from '../etc/img/25920-questions.json';
import Lottie from 'react-lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// mypage 내부에서 달력을 관리하는 컴포넌트
const TodoBoxContainer = ({ boxes, userinfo }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(4);
  const dispatch = useDispatch();
  const a = Object.keys(boxes).length;

  return (
    <>
      <div className="page-btn">
        <Button
          outline
          color="secondary"
          onClick={() => {
            setCurrentPage(currentPage - 1);
            dispatch(getMypage());
          }}
        >
          이전달
        </Button>
        <Button
          outline
          color="secondary"
          onClick={() => {
            setCurrentPage(currentPage + 1);
            dispatch(getMypage());
            setMaxPage(a);
          }}
        >
          다음달
        </Button>
      </div>
      {/* 여기에서 박스 데이터 => 페이지로 뿌려줌 */}
      {Object.keys(boxes).map((k, index) => {
        if (index === currentPage) {
          return (
            <Page
              key={`currentPage` + currentPage}
              boxes={boxes[k]}
              userinfo={userinfo}
            />
          );
        }
      })}
      {currentPage < 0 || currentPage >= maxPage ? <NoData /> : null}
    </>
  );
};

export default TodoBoxContainer;

const Page = ({ boxes, userinfo }) => {
  return (
    <div className="container">
      <div className="month">
        <FontAwesomeIcon icon={faCalendarAlt} className="font-icon" />
        <p key={boxes[0].date.slice(5, 7)}>{boxes[0].date.slice(5, 7)}월</p>
      </div>
      <Row xs="4">
        {boxes.map((inbox, i) => {
          return (
            <TodoBox
              key={inbox.date.toString()}
              userinfo={userinfo}
              box={inbox}
            />
          );
        })}
      </Row>
    </div>
  );
};

//데이터 없는 달에 표시
const NoData = ({}) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animeition,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      데이터가 없어요
      <Lottie options={defaultOptions} width={600} />
    </div>
  );
};

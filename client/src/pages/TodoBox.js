import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Card, Button, CardTitle, CardText, Col, Media } from 'reactstrap';
import TodoBoxContent from './TodoBoxContent';
import ViewVideo from './ViewVideo';
import '../etc/App.css';
import { getvideoList } from '../modules/videolist';
import { getMypage } from '../modules/mypage';
import { getProgress } from '../modules/progress';
//import { todayComplete } from '../modules/todaycomplete';
import animeition from '../etc/img/8251-complete.json';
import Lottie from 'react-lottie';
import { fromJS } from 'immutable';

// 박스 한칸. 영상 목록, 영상 보기 컴포넌트로 접근이 가능하다.
const TodoBox = ({ userinfo, box }) => {
  const dispatch = useDispatch();
  const [viewContentModal, setViewContentModal] = useState(false);
  const [viewVideoModal, setViewVideoModal] = useState(false);
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(dateFormat());
  }, []);

  const handleContentModal = () => {
    // 패치
    if (!viewContentModal) {
      dispatch(getvideoList());
    }
    setViewContentModal(!viewContentModal);
  };
  const handleVideoModal = () => {
    if (today === box.date) {
      setViewVideoModal(!viewVideoModal);
    }
  };

  // boxes 정보가 없으면 div 숨기기
  return (
    <div>
      <Col className="boxes-col">
        <Card className="boxes-col">
          <CardTitle>
            {box.date.slice(8, 10)}일 {box.date.slice(11)}요일
          </CardTitle>
          <Button outline color="secondary" onClick={handleContentModal}>
            영상 설정하기
          </Button>
          {box.youtubeInfo && (
            <TodoBoxPreview
              userinfo={userinfo}
              handleVideoModal={handleVideoModal}
              box={box}
              today={today}
            />
          )}
        </Card>
      </Col>
      {viewContentModal && (
        <TodoBoxContent
          handleModal={handleContentModal}
          id={userinfo.id}
          date={box.date}
        />
      )}
      {viewVideoModal ? (
        <ViewVideo
          handleModal={handleVideoModal}
          id={userinfo.id}
          date={box.date}
          youtube={box.youtubeInfo}
          memoContent={box.memoContent}
          memoTitle={box.memoTitle}
        />
      ) : null}
    </div>
  );
};
export default TodoBox;

// 달력 칸에 보이는 미리보기 정보. 섬네일, 메모제목, 체크 버튼이 포함되어있다.
const TodoBoxPreview = ({ handleVideoModal, box, today }) => {
  const dispatch = useDispatch();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animeition,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="preview">
      {today === box.date ? null : (
        <div className="preview-cover">{box.date.slice(8, 10)}일에 만나요!</div>
      )}
      {box.isComplete && (
        <div className="complet-ani">
          <Lottie options={defaultOptions} />
        </div>
      )}
      <Button
        color="success"
        onClick={(e) => {
          // dispatch(todayComplete());
          // dispatch(getMypage());
          axios
            .get('http://localhost:3000/mypage/todaycomplete', {
              withCredentials: true,
            })
            .then((result) => {
              console.log(result);
              dispatch(getMypage());
              dispatch(getProgress());
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        check
      </Button>
      {box.youtubeInfo && (
        <Media
          width="100%"
          object
          src={box.youtubeInfo.snippet.thumbnails.medium.url}
          alt="썸네일"
          onClick={handleVideoModal}
        />
      )}
      <CardText>{box.memoTitle}</CardText>
    </div>
  );
};

function dateFormat() {
  //['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate();
  let day = new Date().getDay();
  let dayTable = ['일', '월', '화', '수', '목', '금', '토', '일'];
  month = '0' + month;
  date = '0' + date;
  let dateString = `${year}-${month.slice(-2)}-${date.slice(-2)} ${
    dayTable[day]
  }`;
  return dateString;
  // '2020-07-01 수'
}

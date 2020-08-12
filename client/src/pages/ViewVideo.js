import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, Button, Input } from 'reactstrap';
import { Card } from 'reactstrap';
import axios from 'axios';
import '../etc/App.css';
import YouTube from 'react-youtube';
import { getMypage } from '../modules/mypage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';

// 영상 재생, 메모 입력 컴포넌트
const ViewVideo = ({
  handleModal,
  id,
  date,
  youtube,
  memoContent,
  memoTitle,
}) => {
  const opts = {
    height: '720',
    width: '1180',
    playerVars: {
      autoplay: 1,
    },
  };

  const [text, setText] = useState(true);
  const [text2, setText2] = useState(true);
  const [textContent, setTextContent] = useState('메모를 입력해주세요');
  const [textTitle, setTextTitle] = useState('제목을 입력해주세요');
  const [textVal, setTextVal] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (memoContent || memoTitle) {
      setText(false);
      setText2(false);
    }
  });
  //console.log(youtube);
  return (
    <div className="myModal">
      <Card className="mymodal-content">
        <h1>ViewVideo</h1>
        <YouTube videoId={youtube.id} opts={opts} />
        <div>
          <FontAwesomeIcon icon={faStickyNote} className="font-icon" />
          <p>메모를 남겨주세요</p>
        </div>
        {!text2 && (
          <Alert color="light" onClick={() => setText2(true)}>
            {' '}
            {memoTitle}
          </Alert>
        )}
        {text2 && (
          <Input
            type="textarea"
            onChange={(e) => setTitleVal(e.target.value)}
          ></Input>
        )}

        {!text && (
          <Alert color="light" onClick={() => setText(true)}>
            {' '}
            {memoContent}
          </Alert>
        )}
        {text && (
          <Input
            type="textarea"
            onChange={(e) => setTextVal(e.target.value)}
          ></Input>
        )}
        <Button
          outline
          color="secondary"
          onClick={() => {
            setTextContent(textVal);
            setTextTitle(titleVal);
            axios
              .post(
                'http://localhost:3000/mypage/selectvideo',
                {
                  id: id,
                  memoTitle: titleVal,
                  memoContent: textVal,
                  date: date,
                },
                { withCredentials: true },
              )
              .then(() => {
                console.log('입력');

                dispatch(getMypage());
                setText(false);
                setText2(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          입력
        </Button>
        <Button onClick={handleModal}>x</Button>
      </Card>
    </div>
  );
};
export default ViewVideo;

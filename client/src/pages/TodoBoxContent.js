import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import { Card } from 'reactstrap';
import axios from 'axios';
import { getMypage } from '../modules/mypage';

// 영상정보를 불러와서 목록으로 보여준다.
const TodoBoxContent = ({ handleModal, id, date }) => {
  const { data, doing, error } = useSelector((state) => state.videolist);
  return (
    <div className="myModal">
      <Card className="mymodal-content">
        <h1>TodoBoxContent</h1>
        {console.log(data)}
        {data.map((video, i) => {
          return (
            <OneVideoLink
              key={'OneVideoLink' + i}
              video={video}
              handleModal={handleModal}
              id={id}
              date={date}
            />
          );
        })}
        <Button onClick={handleModal}>x</Button>
      </Card>
    </div>
  );
};
export default TodoBoxContent;

// 목록내 영상링크 한줄
const OneVideoLink = ({ handleModal, video, id, date }) => {
  const dispatch = useDispatch();
  return (
    <Alert
      color="light"
      onClick={(e) => {
        console.log('clicked');
        axios
          .post(
            'http://localhost:3000/mypage/selectvideo',
            {
              id: id,
              selectedVideo: video,
              date: date,
            },
            { withCredentials: true },
          )
          .then(() => {
            dispatch(getMypage());
            console.log('영상');
            handleModal();
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      {' '}
      {video.snippet.title}
    </Alert>
  );
};

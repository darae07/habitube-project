import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form } from 'reactstrap';
import '../etc/App.css';

export function MyInfo(props) {
  const { username, email, keyword } = props.users;
  if (props.isLogin) {
    return (
      <div>
        <Form className="myinfo-form">
          <h1 className="text-center">
            <span className="font-weight-bold">회원 정보</span>
          </h1>
          <p className="username">{username}</p>
          <p className="email">{email}</p>
          <p className="keyword">{keyword}</p>
        </Form>
      </div>
    );
  } else {
    return (
      <div>
        <h1>404 NOT FOUND</h1>
      </div>
    );
  }
}

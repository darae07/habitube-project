import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form } from 'reactstrap';
import '../etc/App.css';

const ErrorPage = () => (
  <div>
    <Form className="error-form">
      <h1 className="text-center">
        <span className="font-weight-bold">
          404 Error page Page not found
          <br></br>
          <div>죄송합니다 페이지를 찾을 수 없습니다.</div>
        </span>
      </h1>
      <Form className="text-center">
        <Link to="/login">로그인 페이지로 이동합니다.</Link>
      </Form>
    </Form>
  </div>
);

export default withRouter(ErrorPage);

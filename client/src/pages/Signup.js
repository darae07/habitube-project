import React, { Component } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      validate: {
        emailState: '',
        passwordState: '',
      },
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    return <Redirect to="/mypage" />;
  }

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = true;
    } else {
      validate.emailState = false;
    }
    this.setState({ validate });
  }

  validatePassword(e) {
    const passwordRex = /^[A-Za-z0-9]{6,12}$/;
    const { validate } = this.state;
    if (passwordRex.test(e.target.value)) {
      validate.passwordState = true;
    } else {
      validate.passwordState = false;
    }
    this.setState({ validate });
  }

  render() {
    return (
      <Form className="signup-form">
        <h1 className="text-center">
          <span className="font-weight-bold">회원가입</span>
        </h1>
        <br></br>
        <br></br>
        <FormGroup>
          <Label>이메일</Label>
          <Input
            valid={this.state.validate.emailState === true}
            invalid={this.state.validate.emailState === false}
            type="email"
            placeholder="email@email.com"
            onChange={e => {
              this.handleInputValue('email');
              this.validateEmail(e);
              this.setState({
                email: e.target.value,
              });
            }}
          />
          <FormFeedback valid>올바른 이메일 형식입니다.</FormFeedback>
          <FormFeedback invalid>이메일 형식에 맞게 입력하시오.</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>비밀번호</Label>
          <Input
            valid={this.state.validate.passwordState === true}
            invalid={this.state.validate.passwordState === false}
            type="password"
            placeholder="Password"
            onChange={e => {
              this.handleInputValue('password');
              this.validatePassword(e);
              this.setState({
                password: e.target.value,
              });
            }}
          />
          <FormFeedback valid>올바른 비밀번호 형식입니다.</FormFeedback>
          <FormFeedback invalid>6글자 이상 입력하시오.</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>이름</Label>
          <Input
            type="name"
            placeholder="이름을 입력하세요"
            onChange={this.handleInputValue('username')}
          />
        </FormGroup>

        <Link
          style={{ paddingLeft: 8, textDecoration: 'none' }}
          onSubmit={this.handleSubmit}
        >
          <Button
            onClick={() => {
              axios
                .post(
                  'http://localhost:3000/signup',
                  {
                    email: this.state.email,
                    password: this.state.password,
                    username: this.state.username,
                  },
                  { withCredentials: true },
                )
                .then(result => {
                  console.log(result);
                  this.props.history.push('/login');
                  alert('가입완료');
                })
                .catch(err => {
                  console.log(err);
                });
            }}
            className="btn-lg btn-block"
            color="primary"
            type="submit"
          >
            회원가입완료
          </Button>
        </Link>
      </Form>
    );
  }
}

export default withRouter(Signup);

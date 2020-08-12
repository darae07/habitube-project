import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  ButtonToggle,
  Media,
} from 'reactstrap';
import '../etc/App.css';
import axios from 'axios';
// import { is } from 'immutable';

class Login extends Component {
  state = {
    emailValue: localStorage.getItem('checkbox')
      ? localStorage.getItem('email')
      : '',
    passwordValue: '',
    isIdRemeber: localStorage.getItem('checkbox') ? true : false,
    validate: {
      emailState: '',
      passwordState: '',
    },
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  onChangeCheckbox = (e) => {
    this.setState({
      isIdRemeber: e.target.checked,
    });
    localStorage.setItem('email', this.state.emailValue);
    if (!this.state.isIdRemeber) {
      localStorage.setItem('checkbox', !this.state.isIdRemeber);
      console.log('true :', !this.state.isIdRemeber);
    } else {
      console.log('false :', this.state.isIdRemeber);
      localStorage.clear();
    }
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
    const { handleInputValue } = this;
    const { emailValue, passwordValue, isIdRemeber } = this.state;
    const { handleId, handleLogin } = this.props;

    // login 이 되어있으면 mypage로 이동 , 안 되어 있으면 다시 login 으로 이동
    return (
      <Form className="login-form">
        <Media left top href="">
          {/* <Media object data-src="../etc/youtube.jpeg/64*64" alt="" /> */}
        </Media>
        <h1 className="text-center">
          <span className="font-weight-bold">HABITUBE</span>
        </h1>
        <br></br>
        <br></br>
        <FormGroup>
          <Label>Email</Label>
          <Input
            valid={this.state.validate.emailState === true}
            invalid={this.state.validate.emailState === false}
            type="email"
            placeholder="email@email.com"
            defaultValue={this.state.emailValue}
            onChange={(e) => {
              this.handleInputValue('email');
              this.validateEmail(e);
              this.setState({
                emailValue: e.target.value,
              });
            }}
          />
          <FormFeedback valid>올바른 이메일 형식입니다.</FormFeedback>
          <FormFeedback invalid>이메일 형식에 맞게 입력하시오.</FormFeedback>
          <FormGroup check inline>
            <Label check>
              <Input
                type="checkbox"
                checked={isIdRemeber}
                name={isIdRemeber}
                onChange={this.onChangeCheckbox}
              />{' '}
              email 기억
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Label>비밀번호</Label>
          <Input
            valid={this.state.validate.passwordState === true}
            invalid={this.state.validate.passwordState === false}
            type="password"
            placeholder="Password"
            onChange={handleInputValue('passwordValue')}
            onChange={(e) => {
              this.handleInputValue('password');
              this.validatePassword(e);
              this.setState({
                passwordValue: e.target.value,
              });
            }}
          />
          <FormFeedback valid>올바른 비밀번호 형식입니다.</FormFeedback>
          <FormFeedback invalid>6글자 이상 입력하시오.</FormFeedback>
          <br></br>
        </FormGroup>
        <ButtonToggle
          className="btn-lg btn-block mb-1"
          color="primary"
          onClick={() => {
            axios
              .post(
                'http://localhost:3000/login',
                { email: emailValue, password: passwordValue },
                { withCredentials: true },
              )
              .then((result) => {
                console.log(result.data.userInfo);
                handleId(result.data.userInfo);
                handleLogin();
                this.props.history.push('/mypage');
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          로그인
        </ButtonToggle>{' '}
        <Link to="/signup">
          <ButtonToggle className="btn-lg btn-block" color="secondary">
            회원가입
          </ButtonToggle>{' '}
        </Link>
        <div className="text-center pt-3">
          회원가입이 안 되어있으면 회원가입 하세요
        </div>
        {/* <div className="text-center">
          <a href="/forgot-password">비밀번호를 잊어버렸어요</a>
        </div> */}
      </Form>
    );
  }
}
export default withRouter(Login);

import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Form,
  FormGroup,
  ButtonGroup,
  Label,
  Input,
  FormText,
  Button,
} from 'reactstrap';
import '../etc/App.css';
import axios from 'axios';

// 1. 목표입력 => keword
// 2. 몇일후 => startDay
// 3. 몇일동안 => term => 개월수이기때문에 * 30
// 4. 요일 => selectedDay

class AchievementGoal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 질의문(keyword), 시작일 , 기간 ,빈도수
      keyword: '',
      startDay: '0',
      term: '1', //기간
      selectedDay: [],
      cSelected: [],
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  onCheckboxBtnClick(selectedNum) {
    const { cSelected, selectedDay } = this.state;
    const index = cSelected.indexOf(selectedNum);
    if (index < 0) {
      cSelected.push(selectedNum);
    } else {
      cSelected.splice(index, 1);
    }
    this.setState({ selectedDay: [...this.state.cSelected] });
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { keyword, startDay, term, selectedDay, cSelected } = this.state;
    const { userinfo, handleId } = this.props;

    return (
      <Form inline className="achivementgoal-form">
        <h1 className="text-center">　　목표 설정하기</h1>
        <FormGroup className="mt-5">
          <h5>주제를 알려주세요　</h5>
          <Input
            type="keyword"
            placeholder="ex)운동하기"
            onChange={this.handleInputValue('keyword')}
          />
        </FormGroup>
        <FormGroup className="achivementgoal-select">
          <Label for="exampleSelect" className="mt-3">
            <h5>오늘로 부터 몇 일 후에 시작하시겠습니까?</h5>
          </Label>
          <Input
            type="select"
            name="startDay"
            id="exampleSelect"
            onChange={this.handleInputValue('startDay')}
          >
            <option value="0">오늘</option>
            <option value="1">1일 후</option>
            <option value="2">2일 후</option>
            <option value="3">3일 후</option>
            <option value="4">4일 후</option>
          </Input>
          <span>　부터</span>

          <Label for="exampleSelect" className="mt-3">
            <h5>시작날 로부터 몇 달 동안 진행하시겠습니까?</h5>
          </Label>
          <Input
            type="select"
            name="term"
            id="exampleSelect"
            onChange={this.handleInputValue('term')}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Input>
          <span>　달 동안</span>
        </FormGroup>
        <h5 className="mt-3">원하는 요일을 선택하세요</h5>
        <ButtonGroup>
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(0)}
            active={cSelected.includes(0)}
          >
            일
          </Button>
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(1)}
            active={cSelected.includes(1)}
          >
            월
          </Button>
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(2)}
            active={cSelected.includes(2)}
          >
            화
          </Button>
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(3)}
            active={cSelected.includes(3)}
          >
            수
          </Button>
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(4)}
            active={cSelected.includes(4)}
          >
            목
          </Button>
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(5)}
            active={this.state.cSelected.includes(5)}
          >
            금
          </Button>
          <Button
            color="primary"
            onClick={() => this.onCheckboxBtnClick(6)}
            active={cSelected.includes(6)}
          >
            토
          </Button>
        </ButtonGroup>
        <p className="mb-5 mt-2">
          선택일 : {JSON.stringify(this.state.cSelected)} 주{' '}
          {this.state.selectedDay.length}일 선택하셨습니다.
        </p>
        <Button
          color="primary"
          className="btn-block mb-1"
          onClick={() => {
            if (this.state.keyword === '') {
              alert('keyword 를 입력해주세요.');
            } else {
              axios
                .post(
                  'http://localhost:3000/mypage/goal',
                  {
                    id: userinfo.id,
                    startDate: +startDay,
                    weekly: selectedDay,
                    keyword: keyword,
                    deadLine: term * 30,
                  },
                  { withCredentials: true },
                )
                .then((result) => {
                  console.log(result);
                  let userKey = userinfo;
                  userKey.keyword = keyword;
                  handleId(userKey);
                  this.props.history.push('/mypage');
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
        >
          목표 제출하기
        </Button>
      </Form>
    );
  }
}

export default withRouter(AchievementGoal);

import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import {Card, Button, CardTitle, CardText, Row, Col, 
  Media, Modal, ModalBody, ModalFooter } from 'reactstrap';
import TodoBoxContent from './TodoBoxContent';
import img2 from '../etc/img/img2.png'
import '../etc/App.css';

// todobox에서 gettodobox 요청을 또보내야하는지??
// todobox에서 섬네일누르면 모달로 영상재생화면 띄우기
// 영상설정하기 버튼 => 모달로 todoboxContent 띄우기
// isComplete boxes에서 받아서 해야함.
class TodoBox extends Component{
  state = {
    isComplete: false,
    isShowContent: false,
    selectedVideo: false
  }

  handleShow = () => {
    this.setState({isShowContent: !this.state.isShowContent})
  }
  handleComplete = () => {
    this.setState({isComplete: !this.state.isComplete})
  }

  handleselectedVideo =()=> {
    this.setState({selectedVideo: true})
  }
  
  render(){
    const { userinfo , box } = this.props
    const { handleShow, handleselectedVideo , handleComplete} = this
    const { isShowContent, isComplete , selectedVideo} =this.state
    // boxes 정보가 없으면 div 숨기기
    return(
      <div>
       <Col > 
        <Card sm="4" >
          <CardTitle>{box.date}</CardTitle>
          <Button outline color="secondary" onClick={handleShow} >영상 설정하기</Button>
          {selectedVideo ? <InBoxContent userinfo={userinfo} handleComplete={handleComplete}/>
          : null}
          
        </Card>
        {isShowContent ? <TodoBoxContent handleShow={handleShow} id={userinfo.id}
        handleselectedVideo={handleselectedVideo}/> : null} 
      </Col> 
      
      </div>
      
  )
  }
  
}
export default TodoBox

const InBoxContent = (props) => (
  <div>
    <Button color="success" onClick={e=> {
      axios.post('http://localhost:3000/todaycomplete', {id:props.userinfo.id})
      .then(result => {
      console.log(result)
      props.handleComplete()
      }).catch(err => {
       console.log(err)
      })
     }}>check</Button>
    <Media width='270px' object src={img2} alt="썸네일" />
    <CardText>memotitle</CardText>
  </div>
);
  
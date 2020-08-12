import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import AchievementGoal from './pages/AchievementGoal';
import Signup from './pages/Signup';
import Main from './pages/Main';
import { is } from 'immutable';
import Complete from './pages/Complete';
import ErrorPage from './pages/ErrorPage';
// import { Login } from './pages';

class App extends Component {
  state = {
    isLogin: false,
    userinfo: {
      username: '',
      email: '',
      id: '',
      keyword: '',
    },

    calendar: [],
    term: 0,
  };

  handleId = (value) => {
    this.setState((prev) => ({
      userinfo: {
        ...prev.userinfo,
        username: value.username,
        email: value.email,
        id: value.id,
        keyword: value.keyword,
      },
    }));
  };
  setTerm = (value) => {
    this.setState({ term: value });
  };

  getCalendar = (value) => {
    this.setState({ calendar: value });
  };
  handleLogin = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };
  render() {
    const { isLogin, userinfo, keyword } = this.state;
    const { handleId, getCalendar, handleLogin, setTerm } = this;
    return (
      <div>
        <Switch>
          <Route path="/complete" render={() => <Complete />} />

          <Route
            exact
            path="/login"
            render={() => (
              <Login handleId={handleId} handleLogin={handleLogin} />
            )}
          />
          <Route
            path="/achievementgoal"
            render={() => (
              <AchievementGoal
                userinfo={userinfo}
                setTerm={setTerm}
                handleId={handleId}
              />
            )}
          />
          <Route
            path="/mypage"
            render={() => <Mypage userinfo={userinfo} isLogin={isLogin} />}
          />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/" render={() => <Main />} />
        </Switch>
      </div>
    );
  }
}

export default App;

// app 수정 , 실제로 주소를 바꾸는 방법이 많음, route 분기만 갈라놓은 것 , Link , redireciton, history 통일을 해줘야 함.

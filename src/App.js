import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { HashRouter, Redirect, Link, Route, Switch, BrowserRouter as Router, NoMatch } from 'react-router-dom';
import MyGames from './myGame.js'
import About from './aboutMe'
import Footer from './footer.js'
import UserLogin from './Login.js'
import GameDetail from './GameDetail'
import { React, useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useLocation, useHistory } from "react-router-dom";
import Select from 'react-select'
import YiComponet from './YiComponet' 

function App() {
  const location = useLocation({
    login: false
  });
  const history = useHistory()
  const [IsLoggedInStatus, setIsloggedIn] = useState({
    success: false,
    user: ""
  })
  const [isOpen, setIsOpen] = useState(false)

  const [dorpDown, setDropDown] = useState([])


  function handleOpen() {
    setIsOpen(true)
    console.log("mouse move to handleOpen")

  }
  function handleClose() {
    setIsOpen(false)
    console.log("mouse move to handleClose")

  }

  useEffect(() => {
    /* console.log(location.login)
    console.log(history.login) */
    console.log('this is app effect' + IsLoggedInStatus.success)

    console.log('this is app effect' + IsLoggedInStatus.user)
    if (IsLoggedInStatus.success) {
      setDropDown([
        { value: "logout", label: "Log out" }

      ])

    } else {
      setIsOpen(false)
    }
    console.log(isOpen)


    //    console.log(location.state.detail); // result: 'some_value'
  }, [IsLoggedInStatus, isOpen]);


  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //   const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: 'grey',
        //    color: '#FFF',
        cursor: isDisabled ? 'not-allowed' : 'default',

      };
    },

  };

  function createDropDown() {
    return (
      <div onMouseOver={handleOpen}
        onMouseLeave={handleClose}
        style={{
          marginTop: 10,
          width: 150,
          height: 50


        }}
      >
        <Select
          styles={
            colourStyles
          }
          onChange={handleChange}

          options={dorpDown}
          onFocus={handleOpen}
          defaultValue={{ label: 'Hi, ' + IsLoggedInStatus.user, value: IsLoggedInStatus.user }}

          menuIsOpen={isOpen}
        />
      </div>
    )
  }
  function handleChange(event) {

    console.log(event)
    if (event.value == "logout") {
      setIsloggedIn({
        success: false,
        user: ""
      })
    }
  }
  return (
    <>
      <title>Web422 Yi's Game List</title>


      <HashRouter>
        <Navbar bg="dark" variant="dark" style={{

          height: 50


        }}>

          <Container>
            <Navbar.Brand href="/game">Web422 Assignment</Navbar.Brand>
            <Nav className="me-auto">
              {IsLoggedInStatus.success ?
                <div style={{
                  marginTop: 20,
                  marginRight: 20

                }}>
                  <LinkContainer to="/game">
                    <Nav.Link>Games</Nav.Link>
                  </LinkContainer>
                </div>
                : <LinkContainer to="/game">
                  <Nav.Link>Games</Nav.Link>
                </LinkContainer>
              }
              {IsLoggedInStatus.success ?
                <div style={{
                  marginTop: 20,
                  marginRight: 20

                }}>
                  <LinkContainer to="/about">
                    <Nav.Link>About</Nav.Link>
                  </LinkContainer>
                </div>
                : <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              }





              {/*  <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer> */}



              <LinkContainer to="/login">
                {/*   <Nav.Link>{IsLoggedInStatus.success ? "Hi " + IsLoggedInStatus.user : "Login"}</Nav.Link> */}
                <Nav.Link>{IsLoggedInStatus.success ? createDropDown() : "Login"}</Nav.Link>
              </LinkContainer>

            </Nav>
          </Container>
        </Navbar>
        <Switch>
          <Route exact path="/" component={MyGames} />
          <Route path='/game' component={MyGames} />
          <Route path='/about' component={About} />

          {/*  <Redirect to="#"/>  */}
          <Route path='/login' render={props => {
            return IsLoggedInStatus.success ? <Redirect to="#" /> : <UserLogin setStatus={setIsloggedIn} />

          }} />


          {/*      <Route path='/login'  render={  props => {
           if(IsLoggedInStatus.success == false){
            return <UserLogin setStatus={setIsloggedIn}/> 
           }
         }} />   */}


          <Route path='/details' component={GameDetail} />
        </Switch>
      </HashRouter>
    
      <Footer  ></Footer>
    </>
  );
}
{/* <Route exact path="/props-through-render" render={(props) => <PropsPage {...props} title={`Props through render`} />} /> */ }

export default App;

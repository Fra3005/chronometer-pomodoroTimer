import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import Cronometro from "../Cronometro/cronometro";
const Navigations = () => {
  const [bool, setBool] = useState(false);
  const [color, setColor] = useState();
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <Nav justify variant="tabs" style={{ backgroundColor: color }}>
        <Container>
          <Nav
            className="me-auto"
            onSelect={(selectedKey) => history.push(selectedKey)}
            activeKey={location.pathname}
          >
            <Nav.Link eventKey="/cronometro">Cronometro</Nav.Link>
            <Nav.Link eventKey="/pomodoroTimerImpostazione">
              Pomodoro Timer
            </Nav.Link>
          </Nav>
        </Container>
      </Nav>
    </>
  );
};

export default Navigations;

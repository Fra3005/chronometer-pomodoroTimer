import React, { useEffect, useState } from "react";
import {
  Container,
  ProgressBar,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import InsertAlert from "./alert";
import Impostazione from "./impostazioneIniziale";

const fine = "Bravo! Hai finito il tempo di concetrazione, ora riposati!";

function TomatoTimer(props) {
  console.log("PROPS", props);
  const [value, setValue] = useState(5);
  const [startStop, setStartStop] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(value);
  const [intervalNumber, setIntervalNumber] = useState(null);
  const [color, setColor] = useState(null);
  const options = [
    {
      label: "5",
      value: 1,
    },
    {
      label: "10",
      value: 10,
    },
    {
      label: "15",
      value: 15,
    },
  ];

  useEffect(() => {
    if (startStop) {
      const interval = setInterval(() => {
        setCurrentSeconds((s) => s - 1);
      }, 1000);

      setIntervalNumber(interval);
    } else {
      if (intervalNumber) clearInterval(intervalNumber);
    }
  }, [startStop]);

  useEffect(() => {
    setCurrentSeconds(value);
  }, [value]);

  useEffect(() => {
    if (currentSeconds === 0 && intervalNumber) {
      clearInterval(intervalNumber);
      return <InsertAlert text={"CIAO"} type={"success"} />;
    }
  }, [currentSeconds]);

  useEffect(() => {
    if (currentSeconds > 2 * (value / 3)) {
      setColor("success");
    } else if (currentSeconds > value / 3) {
      setColor("warning");
    } else {
      setColor("danger");
    }
  }, [currentSeconds]);

  useEffect(() => {
    setValue(value);
  }, [value, startStop]);

  const inserimentoMinuti = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Container>
        {currentSeconds === 0 ? (
          <InsertAlert text={fine} type={"success"} />
        ) : null}
        <Row className="justify-content-md-center">
          <Col sm={6}>
            <h4>Minuti</h4>{" "}
          </Col>
          <Col sm={6}>
            <select onChange={inserimentoMinuti}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col>
            <ProgressBar
              //animated
              //label={`${currentSeconds}`}
              max={value}
              // now={currentSeconds}
              //variant={color}
            ></ProgressBar>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={6}>
            <Button
              variant={startStop === false ? "success" : "danger"}
              onClick={() => {
                setStartStop(!startStop);
              }}
            >
              {startStop === false ? "Start" : "Pausa"}
            </Button>
            {currentSeconds === 0 ? (
              <Button variant="primary"> {"Restart"} </Button>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TomatoTimer;

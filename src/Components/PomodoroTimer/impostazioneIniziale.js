import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Accordion,
  Card,
  ProgressBar,
} from "react-bootstrap";

const error = "Inserire un numero superiore di 0!";

function Impostazione() {
  const [minuti, setMinuti] = useState(0);
  const [secondi, setSecondi] = useState(0);
  const [minutiInattivita, setMinutiIntattivita] = useState(null);
  const [messaggioPausa, setMessaggioPausa] = useState(false);
  const [start, setStart] = useState(false);
  const [totSecondi, setTotSecondi] = useState(0);
  const [secondiProgressBar, setSecondiProgressBar] = useState();
  const [currentSeconds, setCurrentSeconds] = useState();
  const [show, setShow] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const [classButton, setClassButton] = useState("start");
  const [messaggioFine, setMessaggioFine] = useState(false);
  const [minutiFinaliAttivita, setMinutiFinaliAttivita] = useState(0);
  const [minutiFinaliInattivita, setMinutiFinaliInattivita] = useState(0);
  const [minutiInizialiAttivita, setMinutiInizialiAttivita] = useState(0);
  const [minutiInizialiInattivita, setMinutiInizialiInattivita] = useState(0);
  const [secondiAttivita, setSecondiAttivita] = useState(0);
  const [color, setColor] = useState(null);

  useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        clearInterval(interval);

        if (secondi === 0) {
          if (minuti !== 0) {
            setSecondi(59);
            setMinuti(minuti - 1);
          } else {
            let minutiPausa = messaggioPausa ? minuti : minutiInattivita - 1;
            let seconds = 59;

            setSecondi(seconds);
            setMinuti(minutiPausa);
            setMessaggioPausa(!messaggioPausa);
          }
        } else {
          setSecondi(secondi - 1);
          setSecondiAttivita(secondiAttivita + 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [secondi, start]);

  useEffect(() => {
    setCurrentSeconds(secondi);
  }, [secondi]);

  useEffect(() => {
    if (messaggioPausa == true) {
      let sum = Number(minutiInattivita) + Number(minutiFinaliAttivita);
      setMinutiFinaliAttivita(sum);
    } else {
      let sum1 =
        Number(minutiFinaliInattivita) + Number(minutiInizialiInattivita);
      setMinutiFinaliInattivita(sum1);
    }
  }, [messaggioPausa]);

  useEffect(() => {
    console.log("MinutiFinaliAttivita", minutiFinaliAttivita);
    console.log("MinutiFinaliInattivita", minutiFinaliInattivita);
  }, [minutiFinaliInattivita, minutiFinaliAttivita]);

  const reset = () => {
    setMinuti(0);
    setSecondi(0);
    setStart(false);
    setMinutiIntattivita(0);
    window.location.reload();
  };

  const timerMinutes = minuti < 10 ? `0${minuti}` : minuti;
  const timerSeconds = secondi < 10 ? `0${secondi}` : secondi;

  const showTimer = () => {
    if (minuti != 0) {
      setShow(!show);
      setShowAccordion(!showAccordion);
    }
  };

  const startButton = () => {
    if (minuti != 0 || secondi != 0) {
      setStart(!start);
      if (start === true) {
        setClassButton("start");
      } else {
        setClassButton("stop");
      }
    }
  };

  const inserimentoMinutiAttivita = (e) => {
    setMinuti(e.target.value);
    setMinutiInizialiAttivita(e.target.value);
    setTotSecondi(e.target.value * 60);
  };

  const inserimentoMinutiInattivita = (e) => {
    setMinutiIntattivita(e.target.value);
    setMinutiInizialiInattivita(e.target.value);
  };

  useEffect(() => {
    let secAttuale = 60 - currentSeconds;
    let sec = totSecondi - secAttuale;
    setSecondiProgressBar(sec);
    if (secondiProgressBar > 2 * (totSecondi / 3)) {
      setColor("success");
    } else if (secondiProgressBar > totSecondi / 3) {
      setColor("warning");
    } else {
      setColor("danger");
    }
  }, [currentSeconds]);

  return (
    <>
      <Container>
        <Accordion key={showAccordion} defaultActiveKey="1" flush>
          <Accordion.Header>Impostazione Pomodoro-Timer</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Scegliere i minuti di attività"
                  required
                  onChange={inserimentoMinutiAttivita}
                  isInvalid={!minuti || minuti == 0}
                ></Form.Control>
                {minuti == 0 ? (
                  <span className="error" style={{ color: "red" }}>
                    {error}
                  </span>
                ) : null}
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Scegliere i minuti di inattività"
                  onChange={inserimentoMinutiInattivita}
                  required
                  isInvalid={!minutiInattivita || minutiInattivita == 0}
                ></Form.Control>
                {minutiInattivita == 0 ? (
                  <span className="error" style={{ color: "red" }}>
                    {error}
                  </span>
                ) : null}
              </Col>
            </Row>
            <Row style={{ paddingTop: "10px" }}>
              <Col>
                <Button type="submit" onClick={showTimer}>
                  Show Timer
                </Button>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion>
      </Container>
      <br></br>
      {show && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            border="primary"
            className="pomodoro"
            style={{
              width: "50rem",
              textAlignLast: "center",
              textAlign: "-moz-initial",
            }}
          >
            <Card.Header className="title">Timer</Card.Header>
            <Card.Body>
              <Card.Text className="bodyText">
                {messaggioPausa && "Ben Fatto! Nuova sessione in :"}{" "}
                {messaggioFine ? (
                  "FINE"
                ) : (
                  <div className="timer">
                    {timerMinutes} : {timerSeconds}
                  </div>
                )}
                {totSecondi ? (
                  <div>
                    <ProgressBar
                      animated
                      max={totSecondi}
                      now={secondiProgressBar}
                      variant={color}
                    ></ProgressBar>
                  </div>
                ) : null}
              </Card.Text>
              <Button className={classButton} onClick={startButton}>
                {start === false ? "Start" : "Stop"}
              </Button>
              <Button onClick={reset}>Reset</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default Impostazione;

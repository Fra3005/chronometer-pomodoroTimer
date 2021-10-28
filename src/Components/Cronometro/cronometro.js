import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

function Cronometro() {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [contatore, setContatore] = useState(0);
  const [active, setActive] = useState(false);
  const [classButton, setClassButton] = useState("start");

  useEffect(() => {
    let intervallo;
    if (active) {
      intervallo = setInterval(() => {
        const secondi = contatore % 60;
        const minuti = Math.floor(contatore / 60);

        const computedSecond =
          String(secondi).length === 1 ? `0${secondi}` : secondi;
        const computedMinute =
          String(minuti).length === 1 ? `0${minuti}` : minuti;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setContatore(contatore + 1);
      }, 1000);
    }
    return () => clearInterval(intervallo);
  }, [active, contatore]);

  const reset = () => {
    setContatore(0);
    setSecond("00");
    setMinute("00");
    setActive(false);
  };

  const setStartPause = () => {
    setActive(!active);
    if (active === true) {
      setClassButton("start");
    } else {
      setClassButton("stop");
    }
  };
  return (
    <>
      <div className="container" style={{ height: "100%" }}>
        <Row>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "120px",
            }}
          >
            {minute}:{second}
          </h1>
        </Row>

        <Row>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button className={classButton} onClick={setStartPause}>
              {active ? "Pause" : "Start"}
            </Button>
            <Button
              className="reset"
              onClick={() => {
                reset();
              }}
            >
              Riavvia
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Cronometro;

import React, { useEffect, useState } from "react";
import { Dropdown, Form, Button, Container } from "react-bootstrap";

function ContoRovescia() {
  const [secondi, setSecondi] = useState(0);
  const [flag, setBool] = useState(false);
  const inserimentoSecondi = (e) => {
    setSecondi(e.target.value);
  };

  useEffect(() => {
    setSecondi(secondi);
  }, [secondi, flag]);
  return (
    <>
      <div class="container" style={{ height: "100%", color: "blue" }}>
        <div>
          <div>
            <h1 class="display-4">Hola!</h1>
            <p class="lead" style={{ color: "black" }}>
              Clicca su un opzione per cominciare!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContoRovescia;

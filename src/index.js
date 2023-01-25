import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import "./style.css";

import { App } from "./App";

function Overlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <a
        href="/"
        style={{
          position: "absolute",
          top: 40,
          left: 90,
          fontSize: "13px",
          color: "#4697CF",
        }}
      >
        <br />
        Guadeloupe - Martinique - Guyane
      </a>

      <div
        className="frame"
        style={{
          fontSize: "18px",
          color: "#4697CF",
        }}
      >
        <h1 className="frame__title">Basicom, AGENCE DE COMMUNICATION 360°</h1>
        <div className="frame__links">
          <a
            className="frame__link"
            href="http://tympanus.net/Tutorials/PhysicsMenu/"
          >
            Qui sommes-nous
          </a>
          <a
            className="frame__link"
            href="https://tympanus.net/codrops/?p=45441"
          >
            Article
          </a>
          <a
            className="frame__link"
            href="https://github.com/drcmda/the-substance"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <Overlay />
  </>
);

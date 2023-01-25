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
          color: "#36B5D4",
        }}
      >
        <br />
        Guadeloupe - Martinique - Guyane
      </a>

      <div
        className="frame"
        style={{
          fontSize: "18px",
          color: "#36B5D4",
        }}
      >
        <h1 className="frame__title">Basicom, AGENCE DE COMMUNICATION 360°</h1>
        <div className="frame__links">
          <a
            className="frame__link"
            href="https://simple-presentation3d.vercel.app/"
            style={{
              fontSize: "18px",
              color: "#36B5D4",
            }}
          >
            Qui sommes-nous
          </a>
          <a
            className="frame__link"
            href="https://14-go-live-gules.vercel.app/"
            class="target"
            style={{
              fontSize: "18px",
              color: "#36B5D4",
            }}
          >
            Article
          </a>
          <a
            className="frame__link"
            href="https://basicom.fr/"
            style={{
              fontSize: "18px",
              color: "#36B5D4",
            }}
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

import * as THREE from "three";
import ReactDOM from "react-dom";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Block, useBlock } from "./components/blockss";
import { TextureLoader, LinearFilter } from "three";
import "./CustomMaterial";
import state from "./store";
import "./styles.css";

function Plane({ color = "white", map, ...props }) {
  const { viewportHeight, offsetFactor } = useBlock();
  // useRef: permet de conserver des valeurs entre les rendus, est utilisé aussi pour stocker une valeur modifiable qui ne provoque pas de nouveau rendu lors de la mise à jour, et est utilisé pour accéder directement à un élément DOM.
  const material = useRef();
  let last = state.top.current;
  // useFrame: permet d'exécuter du code sur chaque image rendue, comme l'exécution de cette effets ci-dessous:
  useFrame(() => {
    const { pages, top } = state;
    material.current.scale = THREE.MathUtils.lerp(
      material.current.scale,
      offsetFactor - top.current / ((pages - 1) * viewportHeight),
      0.1
    );
    material.current.shift = THREE.MathUtils.lerp(
      material.current.shift,
      (top.current - last) / 150,
      0.1
    );
    last = top.current;
  });
  return (
    <mesh {...props}>
      <planeGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Cross() {
  const ref = useRef();
  const { viewportHeight } = useBlock();
  useFrame(() => {
    const curTop = state.top.current;
    const curY = ref.current.rotation.z;
    const nextY =
      (curTop / ((state.pages - 1) * viewportHeight * state.zoom)) * Math.PI;
    ref.current.rotation.z = THREE.MathUtils.THREE.MathUtils.lerp(
      curY,
      nextY,
      0.1
    );
  });
  return (
    <group ref={ref} scale={[2, 2, 2]}>
      <Plane scale={[1, 0.2, 0.2]} color="#e2bfca" />
      <Plane scale={[0.2, 1, 0.2]} color="#e2bfca" />
    </group>
  );
}

function Content({ left, children, map }) {
  const { contentMaxWidth, canvasWidth, margin } = useBlock();
  const aspect = 1.75;
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane
        scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}
        color="#bfe2ca"
        map={map}
      />
      {children}
    </group>
  );
}

function Stripe() {
  const { contentMaxWidth } = useBlock();
  return (
    <Plane
      scale={[100, contentMaxWidth, 1]}
      rotation={[0, 0, Math.PI / 4]}
      position={[0, 0, -1]}
      color="#e3f6f5"
    />
  );
}

function App() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Canvas
        linear
        orthographic
        camera={{ zoom: state.zoom, position: [0, 0, 500] }}
      >
        {/* First section */}
        <Block factor={1.5} offset={0}>
          <Content left />
        </Block>
        {/* Second section */}
        <Block factor={2.0} offset={1}>
          <Content />
        </Block>
        {/* Stripe */}
        <Block factor={-1.0} offset={1}>
          <Stripe />
        </Block>
        {/* Last section */}
        <Block factor={1.5} offset={2}>
          <Content left>
            <Block factor={-0.5}>
              <Cross />
            </Block>
          </Content>
        </Block>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

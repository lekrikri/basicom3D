import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { Block, useBlock } from "./components/blockss";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useIntersect,
  Image,
  ScrollControls,
  Scroll,
  useLoader,
  Text,
  Center,
} from "@react-three/drei";

// import Plane from "./components/Plane";

function Item({ url, scale, ...props }) {
  // useRef: permet de conserver des valeurs entre les rendus, est utilisé aussi pour stocker une valeur modifiable qui ne provoque pas de nouveau rendu lors de la mise à jour, et est utilisé pour accéder directement à un élément DOM.
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);
  // useFrame: permet d'exécuter du code sur chaque image rendue, comme l'exécution de cette effets ci-dessous:
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 3,
      4,
      delta
    );
    // ref.current.material.grayscale = THREE.MathUtils.damp(
    //   ref.current.material.grayscale,
    //   hovered ? 0 : 1,
    //   4,
    //   delta
    // );
  });
  return (
    <group {...props}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={scale}
        url={url}
      />
    </group>
  );
}

function Items({ url, scale, ...props }) {
  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <Scroll>
      <Item url="/logo-basicom.png" scale={[8, 8, 8]} position={[0, 1, 0]} />
      {/* <Text
        color={"#199CD2"}
        fontSize={1}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign={"top"}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        BASICOM3D
      </Text> */}
      <Item
        url="architecture_interieure/3.jpg"
        scale={[w / 4, w / 3, 3]}
        position={[-w / 3.5, -10.5, 0]}
      />
      <Item
        url="architecture_interieure/1.jpg"
        scale={[w / 4, w / 8, 10]}
        position={[-w / 3.5, -16.7, 0]}
      />
      <Item
        url="architecture_interieure/7.jpg"
        scale={[w / 2, w / 4, 1]}
        position={[w / 8, -14, 0]}
      />
      <Item
        url="architecture_interieure/8.jpg"
        scale={[w / 3, w / 6, 2]}
        position={[w / 40, -8.5, 0]}
      />
      <Item
        url="architecture_exterieure/1.jpg"
        scale={[w / 1.2, w / 6, 1.5]}
        position={[w / 40, -25.5, 0]}
      />
      <Item
        url="architecture_exterieure/2.jpg"
        scale={[w / 1.8, w / 4, 1.5]}
        position={[-w / 8.7, -31, 0]}
      />
      <Item
        url="integrations/1.jpg"
        scale={[w / 1.15, w / 4, 1.5]}
        position={[w / 40, -44, 0]}
      />
      <Item
        url="integrations/2.jpg"
        scale={[w / 2.2, w / 4, 1.5]}
        position={[-w / 5.5, -50.5, 0]}
      />
      <Item
        url="integrations/5.jpg"
        scale={[w / 1.9, w / 4.5, 1.5]}
        position={[-w / 7, -56.9, 0]}
      />
      <Item
        url="integrations/3.jpg"
        scale={[w / 3.5, w / 2.3, 1.5]}
        position={[w / 3.3, -52.7, 0]}
      />
      <Item
        url="integrations/4.jpg"
        scale={[w / 3.5, w / 2.3, 1.5]}
        position={[w / 3.3, -64, 0]}
      />
      <Item
        url="integrations/6.jpg"
        scale={[w / 1.9, w / 3.5, 1.5]}
        position={[-w / 7, -64, 0]}
      />
      <Item
        url="design_produit/1.jpg"
        scale={[w / 1.9, w / 3.5, 1.5]}
        position={[-w / 7, -80.7, 0]}
      />
      <Item
        url="design_produit/3.jpg"
        scale={[w / 1.9, w / 3.5, 1.5]}
        position={[-w / 7, -73, 0]}
      />
      <Item
        url="design_produit/6.jpg"
        scale={[w / 4, w / 1.7, 1.5]}
        position={[w / 3, -77, 0]}
      />
    </Scroll>
  );
}

export const App = () => (
  <Canvas
    orthographic
    camera={{ zoom: 80 }}
    gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
    dpr={[1, 1.5]}
  >
    <color attach="background" args={["#ffffff"]} />" "
    <ScrollControls damping={0.15} pages={8}>
      <Items />
      <Scroll
        html
        style={{
          width: "100%",
          color: "#36B5D4",
          font: "https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff",
        }}
      >
        <h1
          style={{
            position: "absolute",
            top: `100vh`,
            right: "10vw",
            fontSize: "10em",
            transform: `translate3d(0,-100%,0)`,
            // font: "/MOONGET_Heavy.blob",
          }}
        >
          Architecture d'Intérieur
        </h1>
        <h1
          style={{
            position: "absolute",
            top: `140vh`,
            right: "1vw",
            fontSize: "3.5em",
            transform: `translate3d(0,-100%,0)`,
            lineHeight: `5vh`,
            // font: "/MOONGET_Heavy.blob",
          }}
        >
          Aménagement bureau,
          <br />
          salon,
          <br />
          boutiques
          <br />
          salle de bain
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "232vh",
            left: "10vw",
            fontSize: "10em",
          }}
        >
          Architecture d'Extérieur
        </h1>
        <h1
          style={{
            position: "absolute",
            top: `300vh`,
            left: "68vw",
            fontSize: "3.5em",
            transform: `translate3d(0,-100%,0)`,
            lineHeight: `5vh`,
            // font: "/MOONGET_Heavy.blob",
          }}
        >
          maison traditionnelle,
          <br />
          maison design
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "365vh",
            left: "10vw",
            fontSize: "10em",
            lineHeight: `15vh`,
          }}
        >
          Intégration 3D
          <br />
          sur photo réelle
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "665vh",
            left: "36vw",
            fontSize: "10em",
          }}
        >
          Design
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "665vh",
            right: "3.7vw",
            fontSize: "10em",
          }}
        >
          Produit
        </h1>
      </Scroll>
    </ScrollControls>
  </Canvas>
);

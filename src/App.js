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
      visible.current ? 1 : 1.5,
      4,
      delta
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      hovered ? 0 : 1,
      4,
      delta
    );
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
      <Image
        url="/logo-basicom.png"
        transparent
        position={[0, 1.5, 0]}
        scale={8}
      />
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
        url="/1.jpg"
        scale={[w / 3, w / 3, 1]}
        position={[-w / 6, -8, 0]}
        html
      />
      <Item url="/2.jpg" scale={[2, w / 3, 1]} position={[w / 30, -h, 0]} />
      <Item
        url="/3.jpg"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 1, 0]}
      />
      <Item
        url="/4.jpg"
        scale={[w / 5, w / 5, 1]}
        position={[w / 4, -h * 1.2, 0]}
      />
      <Item
        url="/5.jpg"
        scale={[w / 5, w / 5, 1]}
        position={[w / 10, -h * 1.75, 0]}
      />
      <Item
        url="/6.jpg"
        scale={[w / 3, w / 3, 1]}
        position={[-w / 4, -h * 2, 0]}
      />
      <Item
        url="/7.jpg"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 2.6, 0]}
      />
      <Item
        url="/8.jpg"
        scale={[w / 2, w / 2, 1]}
        position={[w / 4, -h * 3.1, 0]}
      />
      <Item
        url="/9.jpg"
        scale={[w / 2.5, w / 2, 1]}
        position={[-w / 6, -h * 4.1, 0]}
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
    <color attach="background" args={["#f0f0f0"]} />" "
    <ScrollControls damping={0.15} pages={5}>
      <Items />
      <Scroll
        html
        style={{
          width: "100%",
          color: "#199CD2",
          font: "https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff",
        }}
      >
        <h1
          style={{
            position: "absolute",
            top: `100vh`,
            right: "15vw",
            fontSize: "10em",
            transform: `translate3d(0,-100%,0)`,
            // font: "/MOONGET_Heavy.blob",
          }}
        >
          Maison Kheops
        </h1>
        <p
          className="kheops"
          style={{
            position: "relative",

            transform: `translate3d(0,-100%,0)`,
            // font: "/MOONGET_Heavy.blob",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna
          justo, hendrerit in purus ac, elementum cursus urna. Nunc vehicula sem
          vel consectetur tempor. In a vehicula nisi, laoreet rhoncus odio. Sed
          orci leo, hendrerit id dui a, suscipit egestas ex. Suspendisse commodo
          sem sodales lobortis cursus. Quisque a rhoncus lorem, a accumsan
          mauris.
        </p>
        <h1
          style={{
            position: "absolute",
            top: "180vh",
            left: "10vw",
            fontSize: "10em",
          }}
        >
          DE
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "260vh",
            left: "48vw",
            fontSize: "7em",
          }}
        >
          COMMUNICATION
          <br />
          <br />
          360°,
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "350vh",
            left: "10vw",
            fontSize: "10em",
          }}
        >
          GUADELOUPE
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "420vh",
            right: "5vw",
            fontSize: "8em",
          }}
        >
          MARTINIQUE
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "470vh",
            right: "5vw",
            fontSize: "10em",
          }}
        >
          GUYANE
        </h1>
      </Scroll>
    </ScrollControls>
  </Canvas>
);

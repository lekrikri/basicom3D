import * as THREE from "three";
import React, { createContext, useRef, useContext } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import state from "../store";

// bloc component : Encapsule le décalage qui lui est donné dans un fournisseur de contexte afin que les blocs et composants imbriqués puissent le lire. Il est definit en deux groupes:
// groupe 1: pour la position cible, qui est la hauteur d'une section multipliée par le décalage et le facteur.
// groupe 2: groupe intérieur animé et annule le facteur. Lorsque l'utilisateur fait défiler jusqu'au décalage de section donné, le bloc sera centré.

// useBlock: crochet personnalisé qui permet à n'importe quel composant d'accéder à des données spécifiques à un bloc.

// Contexte offre un moyen de faire passer des données à travers l’arborescence du composant sans avoir à passer manuellement les props à chaque niveau
const offsetContext = createContext(0);

// {...props} attributs de propagation, son but est de faciliter le passage des props

function Block({ children, offset, factor, ...props }) {
  const ref = useRef();
  // Récupérer le décalage parent et la hauteur d'une seule section
  const { offset: parentOffset, sectionHeight } = useBlock();
  offset = offset !== undefined ? offset : parentOffset;
  // Exécute chaque image et met le bloc intérieur à sa place
  useFrame(() => {
    const curY = ref.current.position.y;
    const curTop = state.top.current;
    ref.current.position.y = THREE.MathUtils.lerp(
      curY,
      (curTop / state.zoom) * factor,
      0.1
    );
  });
  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  );
}

function useBlock() {
  const { sections, pages } = state;
  const { size, viewport } = useThree();
  const offset = useContext(offsetContext);
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const canvasWidth = viewportWidth;
  const canvasHeight = viewportHeight;
  const mobile = size.width < 700;
  const margin = canvasWidth * (mobile ? 0.2 : 0.1);
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6);
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));
  return {
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight,
  };
}

export { Block, useBlock };

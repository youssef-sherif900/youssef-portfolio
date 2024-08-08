import {
  Circle,
  Cone,
  Cylinder,
  Dodecahedron,
  Icosahedron,
  Octahedron,
  RoundedBox,
  Sphere,
  TorusKnot,
} from "@react-three/drei";
import {  animated } from "@react-spring/three";

interface techInterface {
  img: string;
  pos: [number, number, number];
  shape: React.ReactNode;
}

const techData: techInterface[] = [
  {
    img: "/Techimages/css.png",
    pos: [1, 1, 0],
    shape:<animated.coneGeometry  args={[1, 2, 32]} /> ,
  },
  {
    img: "/Techimages/html.png",
    pos: [2.5, -3.5, 0],
    shape: <animated.cylinderGeometry args={[1, 1, 2, 32]} />,
  },
  {
    img: "/Techimages/javascript.png",
    pos: [-4, -3.6, 0],
    shape: <animated.sphereGeometry args={[0.9, 32, 32]} />,
  },
  {
    img: "/Techimages/react.png",
    pos: [-1.5, -1, 0],
    shape:<animated.boxGeometry args={[1.8,1.8,1.8]}/>,
  },
  {
    img: "/Techimages/github.png",
    pos: [-4, 1.2, 0],
    shape: <animated.dodecahedronGeometry args={[1]} />,
  },
];

export default techData;

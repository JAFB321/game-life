import { Point } from "./game/structures/CartesianPlane.js";

export interface GameConfigParams {
  onNextGeneration?: (board: Point[]) => {};
  delay?: number;
}

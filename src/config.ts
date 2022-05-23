import { Point } from "./game/structures/CartesianPlane";

export interface GameConfigParams {
    onNextGeneration?: (board: Point[]) => {},
    delay?: number
}
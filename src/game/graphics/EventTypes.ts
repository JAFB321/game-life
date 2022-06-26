import { Point } from "../structures/CartesianPlane.js";

export type EventTypes = "onCellBorn" | "onCellKill" | "onCellToggle";

export type onCellBorn = {
    type: "onCellBorn",
    callback: (point: Point) => any
}
export type onCellKill = {
    type: "onCellKill",
    callback: (point: Point) => any
}
export type onCellToggle = {
    type: "onCellToggle",
    callback: (point: Point) => any
}
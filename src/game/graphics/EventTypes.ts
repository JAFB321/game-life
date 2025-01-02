import { Point } from "../structures/CartesianPlane.js";

export type EventTypes =
  | "onCellBorn"
  | "onCellKill"
  | "onCellToggle"
  | "onGameStartStop"
  | "onSpeedUp"
  | "onSpeedDown";

export type onCellBorn = {
  type: "onCellBorn";
  callback: (point: Point) => any;
};
export type onCellKill = {
  type: "onCellKill";
  callback: (point: Point) => any;
};
export type onCellToggle = {
  type: "onCellToggle";
  callback: (point: Point) => any;
};

export type onGameStartStop = {
  type: "onGameStartStop";
  callback: Function;
};

export type onSpeedUp = {
  type: "onSpeedUp";
  callback: (factor: number) => any;
};

export type onSpeedDown = {
  type: "onSpeedDown";
  callback: (factor: number) => any;
};

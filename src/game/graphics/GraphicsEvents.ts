import { Point } from "../structures/CartesianPlane.js";
import {
  EventTypes,
  onCellBorn,
  onCellKill,
  onCellToggle,
  onGameStartStop,
  onSpeedDown,
  onSpeedUp,
} from "./EventTypes.js";

export class GraphicsEvents {
  private listeners: {
    onCellBorn: Function[];
    onCellKill: Function[];
    onCellToggle: Function[];
    onGameStartStop: Function[];
    onSpeedDown: Function[];
    onSpeedUp: Function[];
  };

  constructor() {
    this.listeners = {
      onCellBorn: [],
      onCellKill: [],
      onCellToggle: [],
      onGameStartStop: [],
      onSpeedDown: [],
      onSpeedUp: [],
    };
  }
  public on(
    event:
      | onCellBorn
      | onCellKill
      | onCellToggle
      | onGameStartStop
      | onSpeedUp
      | onSpeedDown,
  ) {
    this.listeners[event.type].push(event.callback);
  }

  private emit(event: EventTypes, payload: any) {
    this.listeners[event].forEach((callback) => callback(payload));
  }

  public emitCellBorn(point: Point) {
    this.emit("onCellBorn", point);
  }

  public emitCellKill(point: Point) {
    this.emit("onCellKill", point);
  }

  public emitCellToggle(point: Point) {
    this.emit("onCellToggle", point);
  }

  public emitGameStartStop() {
    this.emit("onGameStartStop", null);
  }

  public emitSpeedUp(factor: number) {
    this.emit("onSpeedUp", factor);
  }

  public emitSpeedDown(factor: number) {
    this.emit("onSpeedDown", factor);
  }
}

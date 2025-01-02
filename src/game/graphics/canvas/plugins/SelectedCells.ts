import { Point } from "../../../structures/CartesianPlane.js";
import { CanvasConfig, CanvasConfigParams } from "../config.js";
import { CanvasPlugin } from "./CanvasPlugin.js";

export class SelectedCells extends CanvasPlugin {
  private readonly getSelectedCells: () => Point[];
  private readonly setSelectCells: (points: Point[]) => any;
  private readonly listeners: {
    onCellClicked: ((point: Point) => any)[];
  };

  constructor(
    canvas: HTMLCanvasElement,
    getConfig: () => CanvasConfig,
    setConfig: (config: CanvasConfigParams) => any,
    getSelectedCells: () => Point[],
    setSelectCells: (points: Point[]) => any,
  ) {
    super(canvas, getConfig, setConfig);
    this.getSelectedCells = getSelectedCells;
    this.setSelectCells = setSelectCells;
    this.listeners = {
      onCellClicked: [],
    };
    this.init();
  }

  public onCellClicked(callback: (point: Point) => any) {
    this.listeners.onCellClicked.push(callback);
  }

  private emitCellSelected(point: Point) {
    this.listeners.onCellClicked.forEach((callback) => callback(point));
  }

  public init() {
    const canvas = this.canvas;

    canvas.addEventListener("mousemove", (ev) => {
      const { offsetX: x, offsetY: y } = ev;
      const { board, cells, grid } = this.getConfig();
      const { width, height, offset_x, offset_y, zoom } = board;
      const { lineWidth, gap } = grid;

      let { size } = cells;
      size = (size * zoom) / 100;
      size = Math.ceil(size);

      let cell_size = size + gap * 4;

      const pos_x = Math.floor((x - offset_x) / cell_size);
      const pos_y = Math.floor((y - offset_y) / cell_size);

      this.setSelectCells([{ x: pos_x, y: pos_y }]);
    });

    canvas.addEventListener("dblclick", (ev) => {
      const cell = this.getSelectedCells()[0];
      if (cell) this.emitCellSelected(cell);
    });
  }
}

import { GameBoard } from "./GameBoard.js";

export class GameEngine {
  public nextGeneration(board: GameBoard) {
    const newGameboard = new GameBoard();

    // performance.mark("start-script")
    const cells = board.getCells();

    for (const { x, y } of cells) {
      this.getCellLife(board, x, y) && newGameboard.setCell(x, y);
      this.getCellLife(board, x + 1, y) && newGameboard.setCell(x + 1, y);
      this.getCellLife(board, x + 1, y + 1) &&
        newGameboard.setCell(x + 1, y + 1);
      this.getCellLife(board, x + 1, y - 1) &&
        newGameboard.setCell(x + 1, y - 1);
      this.getCellLife(board, x - 1, y + 1) &&
        newGameboard.setCell(x - 1, y + 1);
      this.getCellLife(board, x - 1, y - 1) &&
        newGameboard.setCell(x - 1, y - 1);
      this.getCellLife(board, x - 1, y) && newGameboard.setCell(x - 1, y);
      this.getCellLife(board, x, y + 1) && newGameboard.setCell(x, y + 1);
      this.getCellLife(board, x, y - 1) && newGameboard.setCell(x, y - 1);
    }

    // performance.mark("end-script")
    // console.log(performance.measure("total-script-execution-time", "start-script", "end-script").duration / 1000);

    return newGameboard;
  }

  private getCellLife(board: GameBoard, x: number, y: number) {
    let aliveSilbings = 0;
    aliveSilbings += board.getCell(x, y + 1) ? 1 : 0;
    aliveSilbings += board.getCell(x + 1, y + 1) ? 1 : 0;
    aliveSilbings += board.getCell(x + 1, y) ? 1 : 0;
    aliveSilbings += board.getCell(x + 1, y - 1) ? 1 : 0;
    aliveSilbings += board.getCell(x, y - 1) ? 1 : 0;
    aliveSilbings += board.getCell(x - 1, y - 1) ? 1 : 0;
    aliveSilbings += board.getCell(x - 1, y) ? 1 : 0;
    aliveSilbings += board.getCell(x - 1, y + 1) ? 1 : 0;

    const isAlive = board.getCell(x, y);

    // Cell live rules
    if (isAlive) {
      if (aliveSilbings >= 2 && aliveSilbings <= 3) return true;
    } else if (aliveSilbings === 3) return true;

    return false;
  }
}

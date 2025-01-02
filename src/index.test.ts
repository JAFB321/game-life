test('Glider moves as expected after multiple ticks', () => {
    const canvas = document.createElement('canvas');
    const game = createGameOfLife(canvas);

    // Place a glider shape
    // Typically glider pattern (with top-left corner at (1,1)) looks like:
    //   . X .
    //   ..X.
    //   XXX.
    game.bornCell({ x: 2, y: 1 });
    game.bornCell({ x: 3, y: 2 });
    game.bornCell({ x: 1, y: 3 });
    game.bornCell({ x: 2, y: 3 });
    game.bornCell({ x: 3, y: 3 });

    // Evolve 4 ticks, checking intermediate steps
    for (let i = 0; i < 4; i++) {
        game.tick();
    }

    // After 4 generations, the glider should have shifted
    // Typically it moves diagonally downward-right
    const cells = game.getCells();
    // We can compare with expected positions, e.g., a known pattern
    // This is just an example, actual positions might differ based on your coordinate system
    expect(cells).toContainEqual({ x: 2, y: 2 });
    expect(cells).toContainEqual({ x: 3, y: 3 });
    expect(cells).toContainEqual({ x: 4, y: 3 });
    expect(cells).toContainEqual({ x: 4, y: 2 });
    expect(cells).toContainEqual({ x: 3, y: 1 });
});
function initGameOfLife() {
  const canvas = document.querySelector<HTMLCanvasElement>('#gameboard-main');
  const info = document.querySelector('.floating-info');

  if(!canvas) {
    console.warn("No canvas found with '#gameboard-main'. GameOfLife init aborted.");
    return;
  }
  if(!info) {
    console.warn("No .floating-info element found. Config updates won't be displayed.");
    // Possibly continue or return, depending on your needs
  }

  const game = createGameOfLife(canvas, {
      game: { delay: 200 }
  });

  // Example stable pattern or to demonstrate
  game.bornCell({ x: 10, y: 10 });
  // ...

  game.startEvolution();

  game.graphics.setConfig({
      board: { /* width: 300, height: 100 */ },
      grid: { gap: 0.5 },
      cells: { size: 20 },
      colors: { background: '#222222' }
  });

  // If info is found, set up a callback to display config
  if (info) {
    game.graphics.onConfigChange((newConfig) => {
      info.innerHTML = JSON.stringify(newConfig, null, 4);
    });
  }

  window.gameStart = () => game.startEvolution();
  window.gameStop = () => game.stopEvolution();
}

initGameOfLife();

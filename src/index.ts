import { GameConfigParams } from "./config.js";
import { GameOfLife } from "./game/GameOfLife.js";
import { CanvasController } from "./game/graphics/canvas/CanvasController.js";
import { CanvasConfigParams } from "./game/graphics/canvas/config.js";

const createGameOfLife = (
        canvas: HTMLCanvasElement,
        defaultConfig: {
            game?: GameConfigParams
            graphics?: CanvasConfigParams
        } = {},
    ) : GameOfLife<CanvasController> => {
        // Create game
        const graphics = new CanvasController(canvas);
        const game = new GameOfLife(graphics);

        // Default config
        const {game: gameConfig, graphics: graphicsConfig} = defaultConfig;
        if(gameConfig) game.setConfig(gameConfig);
        if(graphicsConfig) graphics.setConfig(graphicsConfig);

        return game;
}

export default createGameOfLife;
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
export * from './config'
export * from './game/GameOfLife'
export * from './game/core/GameBoard'
export * from './game/core/GameEngine'
export * from './game/graphics/EventTypes'
export * from './game/graphics/GraphicsController'
export * from './game/graphics/GraphicsEvents'
export * from './game/graphics/canvas/CanvasController'
export * from './game/graphics/canvas/CanvasPainter'
export * from './game/graphics/canvas/config'
export * from './game/graphics/canvas/plugins/CanvasPlugin'
export * from './game/graphics/canvas/plugins/Draggable'
export * from './game/graphics/canvas/plugins/KeyControl'
export * from './game/graphics/canvas/plugins/SelectedCells'
export * from './game/structures/CartesianPlane'
export * from './game/utils/Math'
import { GameOfLife } from './game/GameOfLife.js'

const canvas = document.querySelector<HTMLCanvasElement>('#gameboard-main');
const ctx = canvas?.getContext('2d') || new CanvasRenderingContext2D();


// ---
const width = 1900.5;
const height = 900.5;

const drawGrid = () => {

    ctx.moveTo(0.5,0.5);
    ctx.lineWidth = 0.8;
    const color = '#626567';
    ctx.strokeStyle = color;
    
    
    for (let x = 0.5; x < width; x+=20) {
        
        ctx.moveTo(x,0.5);
        ctx.lineTo(x, height);
    }
    
    for (let y = 0.5; y < height; y+=20) {
        ctx.moveTo(0.5, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
}

const clearCells = () => {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
}
// ---

var game = new GameOfLife();

// // Testing patern
// game.bornCell(100-25,100-25);
// game.bornCell(50-25,50-25);
// game.bornCell(51-25,50-25);


game.bornCell({x: 10,y: 10});
game.bornCell({x: 11,y: 11});
game.bornCell({x: 12,y: 11});
game.bornCell({x: 12,y: 10});
game.bornCell({x: 12,y: 9});

drawGrid();

game.setConfig({
    onNextGeneration: (board) => {

        clearCells();
        ctx.fillStyle = '#ffffff';
        
        const size = {
            point1: {
                x: 0,
                y: 0
            },
            point2: {
                x: 200,
                y: 200
            }
        }

        // Offsets
        const x_offset = size.point1.x;
        const y_offset = size.point1.y;

        // Grid
        const row_gap = 0.5;
        const column_gap = 0.5;

        const row_size = 20;
        const column_size = 20;

        const cell_size = 18;

        for (let x = 0; x < size.point2.x; x++) {
            for (let y = 0; y < size.point2.y; y++) {
                const isAlive = board.getCell({x, y});
        
                if(isAlive){
                    const cell_x = row_size*x+row_gap+x_offset+1;
                    const cell_y = column_size*y+column_gap+y_offset+1;

                    ctx.fillRect(cell_x, cell_y, cell_size, cell_size);
                }
            }
        }

    },
    delay: 100
});

game.startEvolution();

window.gameStart = () => game.resumeEvolution();
window.gameStop = () => game.pauseEvolution();

declare global {
    interface Window { 
        gameStart: Function; 
        gameStop: Function; 
    }
}
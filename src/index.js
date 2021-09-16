const canvas = document.querySelector('#gameboard-main');
const ctx = canvas.getContext('2d');

import { GameLife } from './game/core/GameLife.js'
import { Rectangle } from './game/core/structures/CartesianPlane.js'

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

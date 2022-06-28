<div>
  <p>
    <!-- <b>game-life</b> -->
  </p>
  <p>
     <i>Customizable Conway's "Game of life" cellular automat generator</i>
  </p>
  <p>


[![NPM version](https://img.shields.io/npm/v/game-life?style=flat-square)](https://www.npmjs.com/package/game-life)
[![Package size](https://img.shields.io/bundlephobia/min/game-life?style=flat-square)](https://www.npmjs.com/package/game-life)
![npm](https://img.shields.io/npm/dt/game-life?style=flat-square)
![GitHub](https://img.shields.io/github/license/jafb321/game-life?style=flat-square)
![GitHub Repo stars](https://img.shields.io/github/stars/jafb321/game-life?style=social)
[![Twitter](https://img.shields.io/twitter/follow/jafb321.svg?label=Follow&style=social)](https://twitter.com/jafb321)

  </p>
</div>

---

#### Content

* [Features](#features-)
* [Install](#install-)
* [Usage](#usage-)
* [API](#api-)

## Features ✨
- Easy to use
- Work with canvas element (cooming soon with DOM)
- No dependencies
- Scalable performance
- Made with love <3

## Install 🐱‍💻
There are 2 ways to install it in your project:
#### 1. Install npm package (ES6 Import)
```bash
npm install game-life
```   
#### 2. Or add Script CDN 
```html
<script crossorigin="anonymous" src="https://unpkg.com/game-life@1.1.2/umd/gamelife.min.js"></script>
```   

## Usage 💡
Depending on how you installed, there are two ways to use it:
#### 1. ES6 Import
```javascript
import GameLife from 'game-life'
const canvas = document.querySelector('canvas');

const game = GameLife(canvas);
```
#### 2. or with script CDN
```javascript
const canvas = document.querySelector('canvas');

const game = GameLife(canvas);
```
Whatever the case, you can also pass a **default config** to the game:
```javascript
const game = GameLife(canvas, {
    graphics: {
        board: {width: 1900, height: 800},
        colors: {background: '#FFFFFF', grid: '#E0E0E0'},
        cells: {size: 20}
    },
    game: {delay: 1000}
});
```

#### How to use
- Drag to explore the board
- Double click to spawn/kill cells
- Mouse wheel to zoom in/out
- Enter to start/pause evolution
- +/- keys to speed up/down

#### Manual actions 
```javascript
const game = GameLife(canvas)

game.bornCell({x: 10, t: 10}) // Spawn cell
game.killCell({x: 10, y: 10}) // Kill cell
game.startEvolution()         // Start 
game.stopEvolution()          // Stop
game.speedUp(1.5)             // Speed up 1.5x
game.speedDown(0.8)           // Speed down 0.8x
game.graphics.setConfig({     // Change graphics config
    colors: {background: '#F0F0F0', cell: '#000000'}
})
// and more
```

## API 👩‍💻
Cooming soon... 🚧

---
var CanvasPainter = /** @class */ (function () {
    function CanvasPainter(canvas, canvasContext) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
    }
    CanvasPainter.prototype.paint = function (config, aliveCells, selectedCells) {
        this.applyTransforms(config);
        this.renderBackground(config);
        this.renderCells(config, aliveCells, selectedCells);
        this.renderGrid(config);
    };
    CanvasPainter.prototype.renderGrid = function (config) {
        var ctx = this.canvasContext;
        var board = config.board, grid = config.grid, colors = config.colors, cells = config.cells;
        var width = board.width, height = board.height, offset_x = board.offset_x, offset_y = board.offset_y, zoom = board.zoom;
        var gridColor = colors.grid;
        // Scale grid to zoom
        var size = cells.size;
        var lineWidth = grid.lineWidth, gap = grid.gap;
        size = size * zoom / 100;
        size = Math.ceil(size);
        // Paint Grid
        ctx.lineWidth = (lineWidth);
        ctx.strokeStyle = gridColor;
        var cell_size = size + gap * 4;
        for (var x = 0; x < width * 2 + (Math.abs(offset_x)); x += cell_size) {
            ctx.moveTo(x, gap - height - offset_y);
            ctx.lineTo(x, height * 2 - offset_y);
            ctx.moveTo(-x + gap * 2, gap - height - offset_y);
            ctx.lineTo(-x + gap * 2, height * 2 - offset_y);
        }
        for (var y = 0; y < height * 2 + (Math.abs(offset_y)); y += cell_size) {
            ctx.moveTo(gap - width - offset_x, y);
            ctx.lineTo(width * 2 - offset_x, y);
            ctx.moveTo(gap - width - offset_x, -y + gap * 2);
            ctx.lineTo(width * 2 - offset_x, -y + gap * 2);
        }
        ctx.stroke();
    };
    CanvasPainter.prototype.renderCells = function (config, aliveCells, selectedCells) {
        var ctx = this.canvasContext;
        var cells = config.cells, colors = config.colors, grid = config.grid, board = config.board;
        var zoom = board.zoom;
        var cell_color = colors.cell, selected_cell_color = colors.selected_cell;
        // Scale cell size to zoom
        var gap = grid.gap;
        var size = cells.size;
        size = size * zoom / 100;
        size = Math.ceil(size);
        var cell_size = size + gap * 4;
        ctx.fillStyle = cell_color;
        for (var _i = 0, aliveCells_1 = aliveCells; _i < aliveCells_1.length; _i++) {
            var point = aliveCells_1[_i];
            var x = point.x, y = point.y;
            var cell_x = (x) * (cell_size) + gap * 2;
            var cell_y = (y) * (cell_size) + gap * 2;
            ctx.fillRect(cell_x, cell_y, size, size);
        }
        ctx.fillStyle = selected_cell_color;
        for (var _a = 0, selectedCells_1 = selectedCells; _a < selectedCells_1.length; _a++) {
            var point = selectedCells_1[_a];
            var x = point.x, y = point.y;
            var cell_x = (x) * (size + gap * 4) + gap * 3;
            var cell_y = (y) * (size + gap * 4) + gap * 3;
            ctx.fillRect(cell_x, cell_y, size, size);
        }
    };
    CanvasPainter.prototype.renderBackground = function (config) {
        var ctx = this.canvasContext;
        var board = config.board, colors = config.colors;
        var width = board.width, height = board.height, offset_x = board.offset_x, offset_y = board.offset_y;
        var background = colors.background;
        ctx.fillStyle = background;
        ctx.fillRect(0 - offset_x, 0 - offset_y, width, height);
    };
    CanvasPainter.prototype.applyTransforms = function (config) {
        var ctx = this.canvasContext;
        var board = config.board;
        var offset_x = board.offset_x, offset_y = board.offset_y, zoom = board.zoom;
        var newZoom = zoom / 100;
        var currentTransform = ctx.getTransform();
        var zoomChanged = currentTransform.a !== newZoom;
        var offsetChanged = currentTransform.e !== offset_x || currentTransform.f !== offset_y;
        // Only transform if config changed
        if (zoomChanged || offsetChanged) {
            ctx.reset();
            // ctx.scale(newZoom, newZoom); Deprecated
            ctx.translate(offset_x, offset_y);
        }
        var startOffset = 0.5;
        ctx.translate(startOffset, startOffset);
    };
    return CanvasPainter;
}());
export { CanvasPainter };
//# sourceMappingURL=CanvasPainter.js.map
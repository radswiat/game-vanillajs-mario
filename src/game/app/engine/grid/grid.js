import { isDefined } from 'utils';
import { canvasCfg } from 'config';

export default new class Grid {

  canvasSize = [window.innerWidth, window.innerHeight];
  cellSize = 350;

  static toArray(number) {
    const arr = [];
    for (let i = number; i > 0; i--) {
      arr.push({});
    }
    return arr;
  }

  constructor() {
    this.createGrid();
  }

  setTiles(tiles) {
    this.tiles = tiles;
  }

  createGrid() {
    // this.grid = [
    //   Grid.toArray(Math.ceil(this.canvasSize[0] / this.cellSize)),
    //   Grid.toArray(Math.ceil(this.canvasSize[1] / this.cellSize)),
    // ];
    const grid = [];
    const gridX = Math.ceil(this.canvasSize[0] / this.cellSize);
    const gridY = Math.ceil(this.canvasSize[1] / this.cellSize);
    for (let x = gridX; x >= 0; x--) {
      for (let y = gridY; y >= 0; y--) {
        if (!isDefined(grid[x])) {
          grid[x] = {};
        }
        grid[x][y] = {};
      }
    }
    this.grid = grid;
    console.warn(this.grid);

  }

  getContainingGrid(entity) {
    // x grid
    const x = Math.floor(entity.location.x / this.cellSize);

    // y grid
    const y = Math.floor(entity.location.y / this.cellSize);

    if (!isDefined(this.grid[x]) || !isDefined(this.grid[x][y])) return;

    this.grid[x][y].hasEntities = true;

    const col = this.getAllCollidingObjectsInGrid([x, y]);

    // remove hasEntities over the time
    setTimeout(() => {
      this.grid[x][y].hasEntities = false;
    }, 1000);
  }

  getAllCollidingObjectsInGrid(gridCoords) {
    this.collindingTiles = this.tiles.filter((tile) => {
      const x = Math.floor(tile.location.x / this.cellSize);
      const y = Math.floor(tile.location.y / this.cellSize);
      if (x === gridCoords[0] && y === gridCoords[1]) {
        return true;
      }
      return false;
    });
  }

  debug(ctx) {
    return;
    // highlight containing grid for the entity
    // the one that entity is inside
    for (const row of Object.keys(this.grid)) {
      for (const col of Object.keys(this.grid[row])) {
        ctx.strokeStyle = '#7c7c7c';
        ctx.lineWidth = '1';
        ctx.beginPath();
        ctx.rect(
          this.cellSize * row, this.cellSize * col,
          this.cellSize, this.cellSize,
        );
        if (this.grid[row][col].hasEntities) {
          ctx.strokeStyle = '#FF0000';
          ctx.lineWidth = '2';
        }
        ctx.stroke();
      }
    }

    if (!this.collindingTiles) return;

    // highlight all tiles that colision should be checked against
    this.collindingTiles.map((tile) => {
      ctx.strokeStyle = '#1dff07';
      ctx.lineWidth = '2';
      ctx.beginPath();
      ctx.rect(
        tile.location.x, tile.location.y,
        canvasCfg.blockSize, canvasCfg.blockSize,
      );
      ctx.stroke();
    });
  }
};

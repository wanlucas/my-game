class Settings {
  width: number;
  height: number;
  lines: number;
  rows: number;
  tileWidth: number;
  tileHeight: number;

  constructor() {
    this.width = 1280;
    this.height = 720;
    this.lines = 16;
    this.rows = 9;
    this.tileWidth = this.width / this.lines;
    this.tileHeight = this.height / this.rows;
  }
}

export default new Settings();
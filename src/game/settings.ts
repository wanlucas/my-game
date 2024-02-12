class Settings {
  width = 1280;
  height = 720;
  lines = 16;
  rows = 9;
  tileWidth = this.width / this.lines;
  tileHeight = this.height / this.rows;
}

export default new Settings();
class Settings {
  width = 1280;
  height = 720;
  columns = 18;
  rows = 10;
  tileWidth = this.width / this.columns;
  tileHeight = Math.round((this.height * 1.06) / this.rows);
}

export default new Settings();

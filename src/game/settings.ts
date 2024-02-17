class Settings {
  public width = window.innerWidth;
  public height = window.innerHeight;
  public columns = 18;
  public rows = 10;
  public tileWidth = this.width / this.columns;
  public tileHeight = Math.round((this.height * 1.06) / this.rows);
}

export default new Settings();

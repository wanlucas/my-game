class Settings {
  public width = 1920;
  public height = 1080;
  public columns = 18;
  public rows = 10;
  public tileWidth = Math.round(this.width / this.columns);
  public tileHeight = Math.round((this.height * 1.06) / this.rows);
}

export default new Settings();

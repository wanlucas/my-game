export default class Keyboard {
  private keys: Map<string, boolean> = new Map();
  private downEvents: Map<string, (() => void)[]> = new Map();
  private upEvents: Map<string, (() => void)[]> = new Map();

  constructor() {
    window.addEventListener(
      'keydown',
      (event) => !event.repeat && this.press(event.key)
    );

    window.addEventListener(
      'keyup',
      (event) => this.release(event.key)
    );
  }

  public press = (key: string) => {
    const treatedKey = key.toLowerCase();

    if (this.pressed(treatedKey)) return;

    this.downEvents.get(treatedKey)?.forEach(async (event) => event());
    this.keys.set(treatedKey, true);
  };

  public bulkPress = (...keys: string[]) => {
    keys.forEach((key) => this.press(key));
  };

  public release = (key: string) => {
    const treatedKey = key.toLowerCase();

    if (!this.pressed(treatedKey)) return;

    this.upEvents.get(treatedKey)?.forEach(async (event) => event());
    this.keys.set(treatedKey, false);
  };

  public bulkRelease = (...keys: string[]) => {
    keys.forEach((key) => this.release(key));
  };

  public pressed = (key: string) => {
    const treatedKey = key.toLowerCase();
    return this.keys.get(treatedKey) || false;
  };

  public onDown = (key: string, event: () => void) => {
    const treatedKey = key.toLowerCase();
    const events = this.downEvents.get(treatedKey) || [];
    events.push(event);
    this.downEvents.set(treatedKey, events);
  };

  public onUp = (key: string, event: () => void) => {
    const treatedKey = key.toLowerCase();
    const events = this.upEvents.get(treatedKey) || [];
    events.push(event);
    this.upEvents.set(treatedKey, events);
  };
}

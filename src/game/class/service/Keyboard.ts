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
      (event) => !event.repeat && this.release(event.key)
    );
  }

  public press = (key: string) => {
    this.downEvents.get(key.toLowerCase())?.forEach(async (event) => event());
    this.keys.set(key.toLowerCase(), true);
  };

  public release = (key: string) => {
    this.upEvents.get(key.toLowerCase())?.forEach(async (event) => event());
    this.keys.set(key.toLowerCase(), false);
  };

  public pressed = (key: string) => {
    return this.keys.get(key) || false;
  };

  public onDown = (key: string, event: () => void) => {
    const events = this.downEvents.get(key) || [];
    events.push(event);
    this.downEvents.set(key, events);
  };

  public onUp = (key: string, event: () => void) => {
    const events = this.upEvents.get(key) || [];
    events.push(event);
    this.upEvents.set(key, events);
  };
}

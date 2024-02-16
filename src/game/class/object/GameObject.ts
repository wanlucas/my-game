import Circle from './Circle';
import Rectangle from './Rectangle';

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export enum ObjectType {
  Rect,
  Circle,
  StaticRect,
  StaticCircle,
}

export default abstract class GameObject {
  public velocity: Velocity = {
    x: 0,
    y: 0,
  };

  private static rects: GameObject[] = [];
  private static circles: GameObject[] = [];
  private static staticRects: GameObject[] = [];
  private static staticCircles: GameObject[] = [];

  constructor(public position: Position, private type: ObjectType) {
    this.get(this.type).push(this);
  }

  private get(type: ObjectType) {
    switch (type) {
    case ObjectType.Rect:
      return GameObject.rects;
    case ObjectType.Circle:
      return GameObject.circles;
    case ObjectType.StaticRect:
      return GameObject.staticRects;
    case ObjectType.StaticCircle:
      return GameObject.staticCircles;
    }
  }

  public destroy() {
    const list = this.get(this.type);
    list.splice(list.indexOf(this), 1);
  }

  public abstract update(context: CanvasRenderingContext2D): void;

  public abstract xColWithRect(rect: Rectangle): boolean;

  public abstract yColWithRect(rect: Rectangle): boolean;

  public abstract onXColWithRect(rect: Rectangle): void;

  public abstract onYColWithRect(rect: Rectangle): void;

  public static update(context: CanvasRenderingContext2D) {
    GameObject.staticRects.forEach((rect) => {
      rect.update(context);

      const rectA = rect as Rectangle;

      GameObject.rects.forEach((otherRect) => {
        const rectB = otherRect as Rectangle;

        if (rectB.xColWithRect(rectA)) {
          rectB.onXColWithRect(rectA);
        }

        if (rectB.yColWithRect(rectA)) {
          rectB.onYColWithRect(rectA);
        }
      });
    });

    GameObject.rects.forEach((rect, a) => {
      rect.update(context);

      const rectA = rect as Rectangle;

      GameObject.rects.forEach((otherRect, b) => {
        if (a === b) return;

        const rectB = otherRect as Rectangle;

        if (rectA.xColWithRect(rectB)) {
          rectA.onXColWithRect(rectB);
        }

        if (rectA.yColWithRect(rectB)) {
          rectA.onYColWithRect(rectB);
        }
      });
    });

    GameObject.circles.forEach((circle) => {
      circle.update(context);

      const circleA = circle as Circle;

      GameObject.rects.forEach((rect) => {
        const rectA = rect as Rectangle;

        if (circleA.xColWithRect(rectA)) {
          circleA.onXColWithRect(rectA);
        }

        if (circleA.yColWithRect(rectA)) {
          circleA.onYColWithRect(rectA);
        }
      });
    });
  }
}

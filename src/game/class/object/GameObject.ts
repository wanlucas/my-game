/* eslint-disable @typescript-eslint/no-unused-vars */

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

  public name: string;

  private static rects: GameObject[] = [];
  private static circles: GameObject[] = [];
  private static staticRects: GameObject[] = [];
  private static staticCircles: GameObject[] = [];

  constructor(public position: Position, private type: ObjectType) {
    this.get(this.type).push(this);
    this.name = this.constructor.name;
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
  
  public onCollision(_: GameObject): void { }
 
  public onXCol(_: GameObject) { }

  public onYCol(_: GameObject) { }
 
  public onTopCol(_: GameObject) { }

  public onBottomCol(_: GameObject) { }

  public onLeftCol(_: GameObject) { }

  public onRightCol(_: GameObject) { }
  
  public abstract xColWithRect(rect: Rectangle): boolean;
  
  public abstract yColWithRect(rect: Rectangle): boolean;
  
  public abstract xColWithCircle(circle: Circle): boolean;
  
  public abstract yColWithCircle(circle: Circle): boolean;
  
  public abstract onXColWithRect(rect: Rectangle): void;
  
  public abstract onYColWithRect(rect: Rectangle): void;
  
  public abstract onXColWithCircle(circle: Circle): void;
  
  public abstract onYColWithCircle(circle: Circle): void;
  
  public abstract update(context: CanvasRenderingContext2D): void;

  public static update(context: CanvasRenderingContext2D) {
    GameObject.rects.forEach((rect, a) => {
      const rectA = rect as Rectangle;
      
      GameObject.rects.forEach((otherRect, b) => {
        if (a === b) return;

        const rectB = otherRect as Rectangle;
        
        if (rectA.yColWithRect(rectB)) {
          rectA.onYColWithRect(rectB);
          rectB.onYColWithRect(rectA);
        }
        if (rectA.xColWithRect(rectB)) {
          rectA.onXColWithRect(rectB);
          rectB.onXColWithRect(rectA);
        }
      });
    });

    GameObject.staticRects.forEach((rect) => {
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

      GameObject.circles.forEach((circle) => {
        const circleA = circle as Circle;

        if (circleA.xColWithRect(rectA)) {
          circleA.onXColWithRect(rectA);
        }

        if (circleA.yColWithRect(rectA)) {
          circleA.onYColWithRect(rectA);
        }
      });
    });
  
    GameObject.circles.forEach((circle) => {
      const circleA = circle as Circle;

      GameObject.rects.forEach((rect) => {
        const rectA = rect as Rectangle;

        if (circleA.xColWithRect(rectA)) {
          rectA.onXColWithCircle(circleA);
          circleA.onXColWithRect(rectA);
        }

        if (circleA.yColWithRect(rectA)) {
          rectA.onYColWithCircle(circleA);
          circleA.onYColWithRect(rectA);
        }
      });
    });

    GameObject.staticRects
      .concat(GameObject.staticCircles)
      .concat(GameObject.rects)
      .concat(GameObject.circles)
      .forEach((object) => {
        object.update(context);
      });
  }
}

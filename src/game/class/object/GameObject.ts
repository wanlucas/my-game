/* eslint-disable @typescript-eslint/no-unused-vars */

import Collision from '../service/Collision';
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
  
  public abstract update(context: CanvasRenderingContext2D): void;

  public static update(context: CanvasRenderingContext2D) {
    GameObject.rects.forEach((rect, a) => {
      const rectA = rect as Rectangle;

      rectA.update(context);
      
      GameObject.rects.forEach((otherRect, b) => {
        if (a === b) return;

        const rectB = otherRect as Rectangle;
        
        if (rectA.xColWithRect(rectB)) {
          Collision.onXRectRect(rectA, rectB);
        }

        if (rectA.yColWithRect(rectB)) {
          Collision.onYRectRect(rectA, rectB);
        }
      });
    });

    GameObject.circles.forEach((circle) => {
      const circleA = circle as Circle;

      circleA.update(context);

      GameObject.rects.forEach((rect) => {
        const rectA = rect as Rectangle;

        if (circleA.xColWithRect(rectA)) {
          Collision.onXRectCircle(rectA, circleA);
        }

        if (circleA.yColWithRect(rectA)) {
          Collision.onYRectCircle(rectA, circleA);
        }
      });
    });

    GameObject.staticRects.forEach((rect) => {
      const rectA = rect as Rectangle;

      rectA.update(context);

      GameObject.rects.forEach((otherRect) => {
        const rectB = otherRect as Rectangle;

        if (rectB.xColWithRect(rectA)) {
          Collision.onXRectRect(rectA, rectB);
        }

        if (rectB.yColWithRect(rectA)) {
          Collision.onYRectRect(rectA, rectB);
        }
      });

      GameObject.circles.forEach((circle) => {
        const circleA = circle as Circle;

        if (circleA.xColWithRect(rectA)) {
          Collision.onXRectCircle(rectA, circleA);
        }

        if (circleA.yColWithRect(rectA)) {
          Collision.onYRectCircle(rectA, circleA);
        }
      });
    });
  }
}

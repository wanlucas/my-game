import Circle from '../object/Circle';
import Rectangle from '../object/Rectangle';

export default class Collision {
  public static onXRectRect(a: Rectangle, b: Rectangle) {
    const { collider, collidee } = (() => {
      if (Math.abs(a.velocity.x) > Math.abs(b.velocity.x)) {
        return { collider: a, collidee: b };
      } else return { collider: b, collidee: a };
    })();

    collidee.position.x += collidee.velocity.x;
   
    if (collider.position.x > collidee.position.x) {
      collider.position.x = collidee.position.x + collidee.width;
      collider.onLeftCol(b);
    } else {
      collider.position.x = collidee.position.x - collider.width;
      collider.onRightCol(b);
    }
    
    collider.velocity.x = 0;
    collidee.velocity.x = 0;
    
    collidee.onCollision(collider);
    collider.onCollision(collidee);
    collidee.onXCol(a);
    collider.onXCol(b);
  }

  public static xRectRect(a: Rectangle, b: Rectangle) {
    return (
      a.position.x + a.velocity.x + a.width > b.position.x + b.velocity.x
      && a.position.x + a.velocity.x < b.position.x + b.width + b.velocity.x
      && a.position.y + a.height > b.position.y
      && a.position.y < b.position.y + b.height
    );
  }
  
  public static onYRectRect(a: Rectangle, b: Rectangle) {
    const { collider, collidee } = (() => {
      if (Math.abs(a.velocity.y) > Math.abs(b.velocity.y)) {
        return { collider: a, collidee: b };
      } else return { collider: b, collidee: a };
    })();

    collidee.position.y += collidee.velocity.y;
    
    if (collider.position.y > collidee.position.y) {
      collider.position.y = collidee.position.y + collidee.height;
      collider.onTopCol(b);
    } else {
      collider.position.y = collidee.position.y - collider.height;
      collider.onBottomCol(b);
    }
    
    collider.velocity.y = 0;
    collidee.velocity.y = 0;
    
    collidee.onCollision(collider);
    collider.onCollision(collidee);
    collidee.onYCol(a);
    collider.onYCol(b);
  }

  public static yRectRect(a: Rectangle, b: Rectangle) { 
    return (
      a.position.y + a.velocity.y + a.height > b.position.y + b.velocity.y
      && a.position.y + a.velocity.y < b.position.y + b.height + b.velocity.y
      && a.position.x + a.width > b.position.x
      && a.position.x < b.position.x + b.width
    );
  }

  public static onXRectCircle(rect: Rectangle, circle: Circle) {
    if (Math.abs(rect.velocity.x) > Math.abs(circle.velocity.x)) {
      circle.position.x += circle.velocity.x;

      if (rect.position.x > circle.position.x) {
        rect.position.x = circle.position.x + circle.radius;
        rect.onLeftCol(circle);
      } else {
        rect.position.x = circle.position.x - rect.width;
        rect.onRightCol(circle);
      }
    } else {
      rect.position.x += rect.velocity.x;

      if (circle.position.x > rect.position.x) {
        circle.position.x = rect.position.x + rect.width + circle.radius;
        circle.onLeftCol(rect);
      } else {
        circle.position.x = rect.position.x - circle.radius;
        circle.onRightCol(rect);
      }
    }

    rect.velocity.x = 0;
    circle.velocity.x = 0;

    circle.onCollision(rect);
    rect.onCollision(circle);
    circle.onXCol(rect);
    rect.onXCol(circle);
  }

  public static xRectCircle(a: Rectangle, b: Circle) {
    const ax = a.position.x + a.velocity.x;
    const bx = b.position.x + b.velocity.x;

    const closestX = Math.max(ax, Math.min(bx, ax + a.width));
    const closestY = Math.max(a.position.y, Math.min(b.position.y, a.position.y + a.height));
    const dx = bx - closestX;
    const dy = b.position.y - closestY;

    return dx * dx + dy * dy < b.radius ** 2;
  }

  public static onYRectCircle(rect: Rectangle, circle: Circle) {
    if (Math.abs(rect.velocity.y) > Math.abs(circle.velocity.y)) {
      circle.position.y += circle.velocity.y;

      if (rect.position.y > circle.position.y) {
        rect.position.y = circle.position.y + circle.radius;
        rect.onTopCol(circle);
      } else {
        rect.position.y = circle.position.y - rect.height;
        rect.onBottomCol(circle);
      }
    } else {
      rect.position.y += rect.velocity.y;

      if (circle.position.y > rect.position.y) {
        circle.position.y = rect.position.y + rect.height + circle.radius;
        circle.onTopCol(rect);
      } else {
        circle.position.y = rect.position.y - circle.radius;
        circle.onBottomCol(rect);
      }
    }

    rect.velocity.y = 0;
    circle.velocity.y = 0;

    circle.onCollision(rect);
    rect.onCollision(circle);
    circle.onYCol(rect);
    rect.onYCol(circle);
  }

  public static yRectCircle(a: Rectangle, b: Circle) {
    const ay = a.position.y + a.velocity.y;
    const by = b.position.y + b.velocity.y;

    const closestX = Math.max(a.position.x, Math.min(b.position.x, a.position.x + a.width));
    const closestY = Math.max(ay, Math.min(by, ay + a.height));
    const dx = b.position.x - closestX;
    const dy = by - closestY;

    return dx * dx + dy * dy < b.radius ** 2;
  }
  
  public static onXCircleCircle(a: Circle, b: Circle) {
    const { collider, collidee } = (() => {
      if (Math.abs(a.velocity.x) > Math.abs(b.velocity.x)) {
        return { collider: a, collidee: b };
      } else return { collider: b, collidee: a };
    })();

    collidee.position.x += collidee.velocity.x;

    if (collider.position.x > collidee.position.x) {
      collider.position.x = collidee.position.x + collidee.radius;
      collider.onLeftCol(b);
    } else {
      collider.position.x = collidee.position.x - collider.radius;
      collider.onRightCol(b);
    }

    collider.velocity.x = 0;
    collidee.velocity.x = 0;

    collidee.onCollision(collider);
    collider.onCollision(collidee);
    collidee.onXCol(a);
    collider.onXCol(b);
  }

  public static xCircleCircle(a: Circle, b: Circle) {
    const dx = a.position.x - b.position.x;
    const dy = a.position.y - b.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < a.radius + b.radius;
  }

  public static onYCircleCircle(a: Circle, b: Circle) {
    const { collider, collidee } = (() => {
      if (Math.abs(a.velocity.y) > Math.abs(b.velocity.y)) {
        return { collider: a, collidee: b };
      } else return { collider: b, collidee: a };
    })();

    collidee.position.y += collidee.velocity.y;

    if (collider.position.y > collidee.position.y) {
      collider.position.y = collidee.position.y + collidee.radius;
      collider.onTopCol(b);
    } else {
      collider.position.y = collidee.position.y - collider.radius;
      collider.onBottomCol(b);
    }

    collider.velocity.y = 0;
    collidee.velocity.y = 0;

    collidee.onCollision(collider);
    collider.onCollision(collidee);
    collidee.onYCol(a);
    collider.onYCol(b);
  }

  public static yCircleCircle(a: Circle, b: Circle) {
    const dx = a.position.x - b.position.x;
    const dy = a.position.y - b.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < a.radius + b.radius;
  }
}
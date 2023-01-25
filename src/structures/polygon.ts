import {Position, TransformationMatrix, transformPoint} from "./geometry";

export class Polygon {
  public readonly vertices: Position[];

  constructor(vertices: Position[]) {
    this.vertices = vertices;
    if (!this.isValid()) {
      throw new Error("Polygon must contain at least 2 vertices.");
    }
  }

  private isValid() {
    return this.vertices.length > 1;
  }

  public draw(ctx: CanvasRenderingContext2D, color: string) {
    if (!this.isValid()) {
      return;
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; ++i) {
      ctx.lineTo(this.vertices[i].x,this.vertices[i].y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  public transform(matrix: TransformationMatrix): Polygon {
    return new Polygon(this.vertices.map((vertex: Position) => transformPoint(vertex, matrix)));
  }
}

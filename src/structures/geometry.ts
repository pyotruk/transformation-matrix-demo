export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export type TransformationMatrix = number[][];

export const transformPoint = (point: Position, matrix: TransformationMatrix): Position => {
  return {
    x: point.x * matrix[0][0] + point.y * matrix[0][1],
    y: point.x * matrix[1][0] + point.y * matrix[1][1],
  };
};

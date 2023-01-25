import {Size, TransformationMatrix} from "./geometry";
import {Polygon} from "./polygon";

export const CANVAS_SIZE: Size = {
  w: 600,
  h: 600,
};

const INITIAL_POLYGON_SIZE = {
  w: 50,
  h: 50,
};

export const INITIAL_POLYGON = new Polygon([
  {x: CANVAS_SIZE.w / 2, y: CANVAS_SIZE.h / 2},
  {x: CANVAS_SIZE.w / 2 + INITIAL_POLYGON_SIZE.w, y: CANVAS_SIZE.h / 2},
  {x: CANVAS_SIZE.w / 2 + INITIAL_POLYGON_SIZE.w, y: CANVAS_SIZE.h / 2 + INITIAL_POLYGON_SIZE.h},
  {x: CANVAS_SIZE.w / 2, y: CANVAS_SIZE.h / 2 + INITIAL_POLYGON_SIZE.h},
]);

export const IDENTITY_MATRIX: TransformationMatrix = [[1, 0], [0, 1]];

import React, {useEffect, useRef, useState} from "react";
import "./App.scss";
import {Polygon} from "../structures/polygon";
import {CANVAS_SIZE, IDENTITY_MATRIX, INITIAL_POLYGON} from "../structures/constants";

function App() {
  const canvas = useRef<HTMLCanvasElement>();
  const ctx = useRef<null | CanvasRenderingContext2D>();

  const [inputs, setInputs] = useState<string[]>([
    IDENTITY_MATRIX[0][0].toString(),
    IDENTITY_MATRIX[0][1].toString(),
    IDENTITY_MATRIX[1][0].toString(),
    IDENTITY_MATRIX[1][1].toString(),
  ]);

  const drawPolygon = (polygon: Polygon, color: string): void => {
    if (!ctx.current) {
      return;
    }
    polygon.draw(ctx.current, color);
  };

  const initCanvas = (): void => {
    canvas.current = document.getElementById("canvas") as HTMLCanvasElement;
    ctx.current = canvas.current.getContext("2d");
    if (!ctx.current) {
      throw new Error("Failed to init canvas.");
    }
    ctx.current.canvas.width = CANVAS_SIZE.w;
    ctx.current.canvas.height = CANVAS_SIZE.h;

    drawPolygon(INITIAL_POLYGON, "red");
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const isNumeric = (val: string): boolean => {
    return /^-?\d+(\.\d+)?$/.test(val);
  };

  const handleMatrixInput = (): void => {
    let isInputsNumeric = true;
    inputs.forEach((val: string): void => {
      !isNumeric(val) && (isInputsNumeric = false);
    });
    if (!isInputsNumeric) {
      return;
    }

    drawPolygon(INITIAL_POLYGON.transform([
      [parseFloat(inputs[0]), parseFloat(inputs[1])],
      [parseFloat(inputs[2]), parseFloat(inputs[3])],
    ]), "blue");
  };

  const handleInput = (val: string, i: number): void => {
    setInputs((vals: string[]) => {
      const newInputs = [...vals];
      inputs[i] = val;
      handleMatrixInput();
      return newInputs;
    });
  };

  const handleClear = (): void => {
    if (!ctx.current || !canvas.current) {
      return;
    }
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawPolygon(INITIAL_POLYGON, "red");
  };

  return (
    <div className="App">
      <canvas id="canvas"></canvas>
      <div className="matrix">
        {inputs.map((val: string, i: number) => {
          return <input key={i} type="text" value={inputs[i]} onChange={event => handleInput(event.target.value, i)}/>;
        })}
        <button onClick={handleClear}>clear</button>
      </div>
    </div>
  );
}

export default App;

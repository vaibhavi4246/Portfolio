"use client";

import { useRef, useCallback, useEffect } from "react";

const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const GROUND_Y = 150;
const DINO_X = 60;
const DINO_W = 40;
const DINO_H = 50;
const OBSTACLE_W = 20;
const OBSTACLE_MIN_H = 30;
const OBSTACLE_MAX_H = 60;
const CANVAS_W = 800;
const CANVAS_H = 200;

interface Obstacle {
  x: number;
  h: number;
}

interface GameState {
  running: boolean;
  dead: boolean;
  dinoY: number;
  dinoVY: number;
  obstacles: Obstacle[];
  score: number;
  highScore: number;
  speed: number;
  frame: number;
  frameStep: number;
}

export function useDino(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const stateRef = useRef<GameState>({
    running: false,
    dead: false,
    dinoY: GROUND_Y,
    dinoVY: 0,
    obstacles: [],
    score: 0,
    highScore: 0,
    speed: 5,
    frame: 0,
    frameStep: 0,
  });
  const rafRef = useRef<number>(0);

  const getHighScore = () => {
    try {
      return parseInt(localStorage.getItem("dino-hs") || "0", 10);
    } catch {
      return 0;
    }
  };
  const saveHighScore = (s: number) => {
    try {
      localStorage.setItem("dino-hs", s.toString());
    } catch {}
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gs = stateRef.current;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Ground
    ctx.fillStyle = "#6a9955";
    ctx.fillRect(0, GROUND_Y + DINO_H, CANVAS_W, 2);

    // Dino body
    const dinoTop = gs.dinoY;
    ctx.fillStyle = gs.dead ? "#f44747" : "#4ec9b0";
    ctx.fillRect(DINO_X, dinoTop, DINO_W, DINO_H);

    // Dino eye
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(DINO_X + DINO_W - 10, dinoTop + 8, 6, 6);

    // Dino legs (animate when running)
    if (!gs.dead && gs.dinoY >= GROUND_Y) {
      const legOffset = gs.frameStep % 2 === 0 ? 0 : 10;
      ctx.fillStyle = "#4ec9b0";
      ctx.fillRect(DINO_X + 5, dinoTop + DINO_H, 10, legOffset === 0 ? 12 : 6);
      ctx.fillRect(DINO_X + 20, dinoTop + DINO_H, 10, legOffset === 0 ? 6 : 12);
    }

    // Obstacles (cacti)
    ctx.fillStyle = "#ce9178";
    for (const obs of gs.obstacles) {
      ctx.fillRect(obs.x, GROUND_Y + DINO_H - obs.h, OBSTACLE_W, obs.h);
      // Cactus arms
      ctx.fillRect(obs.x - 8, GROUND_Y + DINO_H - obs.h + 10, 8, 10);
      ctx.fillRect(obs.x + OBSTACLE_W, GROUND_Y + DINO_H - obs.h + 10, 8, 10);
    }

    // Score
    ctx.fillStyle = "#d4d4d4";
    ctx.font = "16px Consolas, monospace";
    ctx.textAlign = "right";
    ctx.fillText(`HI ${gs.highScore.toString().padStart(5, "0")}  ${gs.score.toString().padStart(5, "0")}`, CANVAS_W - 16, 28);
    ctx.textAlign = "left";

    // Dead overlay
    if (gs.dead) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = "#d4d4d4";
      ctx.font = "bold 20px Consolas, monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H / 2 - 10);
      ctx.font = "14px Consolas, monospace";
      ctx.fillText("Press SPACE to restart", CANVAS_W / 2, CANVAS_H / 2 + 16);
      ctx.textAlign = "left";
    }

    if (!gs.running && !gs.dead) {
      ctx.fillStyle = "#d4d4d4";
      ctx.font = "14px Consolas, monospace";
      ctx.textAlign = "center";
      ctx.fillText("Press SPACE to start", CANVAS_W / 2, CANVAS_H / 2);
      ctx.textAlign = "left";
    }
  }, [canvasRef]);

  const gameLoop = useCallback(() => {
    const gs = stateRef.current;
    if (!gs.running || gs.dead) {
      draw();
      return;
    }

    // Update dino
    gs.dinoVY += GRAVITY;
    gs.dinoY += gs.dinoVY;
    if (gs.dinoY >= GROUND_Y) {
      gs.dinoY = GROUND_Y;
      gs.dinoVY = 0;
    }

    // Update obstacles
    gs.obstacles = gs.obstacles
      .map((o) => ({ ...o, x: o.x - gs.speed }))
      .filter((o) => o.x > -OBSTACLE_W - 20);

    // Spawn obstacles
    gs.frame++;
    gs.frameStep = Math.floor(gs.frame / 8);
    const minGap = Math.max(60, 100 - gs.score / 10);
    const lastObs = gs.obstacles[gs.obstacles.length - 1];
    if (!lastObs || CANVAS_W - lastObs.x > minGap + Math.random() * 100) {
      const h = OBSTACLE_MIN_H + Math.random() * (OBSTACLE_MAX_H - OBSTACLE_MIN_H);
      gs.obstacles.push({ x: CANVAS_W, h });
    }

    // Score + speed
    gs.score = Math.floor(gs.frame / 6);
    gs.speed = 5 + gs.score / 200;

    // Collision (AABB)
    const dinoRect = {
      x: DINO_X + 4,
      y: gs.dinoY + 4,
      w: DINO_W - 8,
      h: DINO_H - 4,
    };
    for (const obs of gs.obstacles) {
      const obsRect = {
        x: obs.x + 2,
        y: GROUND_Y + DINO_H - obs.h + 4,
        w: OBSTACLE_W - 4,
        h: obs.h - 4,
      };
      if (
        dinoRect.x < obsRect.x + obsRect.w &&
        dinoRect.x + dinoRect.w > obsRect.x &&
        dinoRect.y < obsRect.y + obsRect.h &&
        dinoRect.y + dinoRect.h > obsRect.y
      ) {
        gs.dead = true;
        if (gs.score > gs.highScore) {
          gs.highScore = gs.score;
          saveHighScore(gs.score);
        }
        draw();
        return;
      }
    }

    draw();
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [draw]);

  const jump = useCallback(() => {
    const gs = stateRef.current;
    if (gs.dead) {
      // Restart
      gs.dead = false;
      gs.running = true;
      gs.dinoY = GROUND_Y;
      gs.dinoVY = 0;
      gs.obstacles = [];
      gs.score = 0;
      gs.speed = 5;
      gs.frame = 0;
      gs.frameStep = 0;
      rafRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (!gs.running) {
      gs.running = true;
      gs.highScore = getHighScore();
      rafRef.current = requestAnimationFrame(gameLoop);
    }
    if (gs.dinoY >= GROUND_Y) {
      gs.dinoVY = JUMP_FORCE;
    }
  }, [gameLoop]);

  useEffect(() => {
    stateRef.current.highScore = getHighScore();
    draw();
  }, [draw]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { jump };
}

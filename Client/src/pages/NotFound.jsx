import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const GROUND_Y = 220;
const PLAYER_X = 60;
const PLAYER_SIZE = 32;
const GRAVITY = 1.2;
const JUMP_VELOCITY = -19;

const NotFound = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    playerY: GROUND_Y - PLAYER_SIZE,
    velocity: 0,
    obstacles: [],
    frame: 0,
    speed: 3,
    running: false,
    score: 0,
  });

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState("ready"); 

  const resetGame = useCallback(() => {
    stateRef.current = {
      playerY: GROUND_Y - PLAYER_SIZE,
      velocity: 0,
      obstacles: [],
      frame: 0,
      speed: 3,
      running: true,
      score: 0,
    };
    setScore(0);
    setStatus("playing");
  }, []);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s.running) {
      resetGame();
      return;
    }
    if (s.playerY >= GROUND_Y - PLAYER_SIZE) {
      s.velocity = JUMP_VELOCITY;
    }
  }, [resetGame]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    function loop() {
      const s = stateRef.current;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      // ground line
      ctx.strokeStyle = "#242B3D";
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + 0.5);
      ctx.lineTo(width, GROUND_Y + 0.5);
      ctx.stroke();

      if (s.running) 
        {
            s.frame += 1;

            // physics
            s.velocity += GRAVITY;
            s.playerY += s.velocity;
            if (s.playerY > GROUND_Y - PLAYER_SIZE) 
            {
                s.playerY = GROUND_Y - PLAYER_SIZE;
                s.velocity = 0;
            }

        // obstacles 
        const spawnGap = Math.max(140 - Math.floor(s.speed * 12), 80);
        if (s.frame % spawnGap === 0) 
        {
          s.obstacles.push({ x: width, w: 24, h: 32 + Math.random() * 28 });
        }

        // move 
        s.obstacles.forEach((o) => (o.x -= s.speed));
        s.obstacles = s.obstacles.filter((o) => o.x + o.w > 0);

        // difficulty ramp — slow and gradual
        s.speed += 0.0008;

        // score
        if (s.frame % 6 === 0) 
        {
          s.score += 1;
          setScore(s.score);
        }

        // collision check
        for (const o of s.obstacles) 
        {
          const playerBottom = s.playerY + PLAYER_SIZE;
          const playerRight = PLAYER_X + PLAYER_SIZE;
          const obstacleTop = GROUND_Y - o.h;
          if (PLAYER_X < o.x + o.w && playerRight > o.x && playerBottom > obstacleTop) 
          {
            s.running = false;
            setStatus("gameover");
            setBestScore((b) => Math.max(b, s.score));
            break;
          }
        }
      }

      // player (vector node)
      ctx.fillStyle = "#4FD9C5";
      ctx.beginPath();
      ctx.roundRect(PLAYER_X, s.playerY, PLAYER_SIZE, PLAYER_SIZE, 8);
      ctx.fill();

      // obstacles (doc fragments)
      ctx.fillStyle = "#333B52";
      s.obstacles.forEach((o) => {
        ctx.fillRect(o.x, GROUND_Y - o.h, o.w, o.h);
      });

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Keyboard control
  useEffect(() => {
    function handleKey(e) {
      if (e.code === "Space") 
      {
        e.preventDefault();
        jump();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [jump]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0B0E14] px-6 py-16 text-[#E9ECF3]"
      style={{ backgroundImage: "radial-gradient(circle at 20% 15%, rgba(79,217,197,0.10), transparent 55%), radial-gradient(circle at 85% 85%, rgba(232,165,82,0.06), transparent 50%)",}}>
      <style>{` @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');`}</style>

      <div className="text-center">
        <h1 className="text-7xl font-bold text-[#4FD9C5] md:text-8xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }} >
          404
        </h1>
        <h2 className="mt-3 text-2xl font-semibold md:text-3xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Page Not Found
        </h2>
        <p className="mt-2 text-[#97A1B8]">The page you're looking for doesn't exist or has been moved.</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="rounded-lg border border-[#242B3D] px-6 py-2.5 font-semibold text-[#E9ECF3] transition hover:border-[#4FD9C5]">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="w-full max-w-170">
        <div className="mb-2 flex items-center justify-between text-xs text-[#97A1B8]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <span>
            SCORE <span className="text-[#E9ECF3]">{score}</span>
          </span>
          <span>
            BEST <span className="text-[#E9ECF3]">{bestScore}</span>
          </span>
        </div>

        <canvas ref={canvasRef} width={680} height={260} onClick={jump} className="block cursor-pointer rounded-lg border border-[#242B3D] bg-[#131722]" style={{ width: "100%", height: "auto", touchAction: "manipulation" }} />

        <p className="mt-2 text-center text-xs text-[#565F75]" style={{ fontFamily: "'IBM Plex Mono', monospace" }} >
          {status === "playing"
            ? "space or tap to jump"
            : status === "gameover"
            ? "game over — space or tap to retry"
            : "space or tap to start"}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
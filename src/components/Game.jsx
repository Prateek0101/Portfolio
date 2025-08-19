import React, { useRef, useEffect, useState, useCallback } from "react";
import { X, Play, Pause, RotateCcw, Gamepad2 } from "lucide-react";

// Individual Game Components
const BrickBreaker = ({ isDarkMode = false, playing = false, onGameEnd }) => {
  const canvasRef = useRef(null);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const gameStateRef = useRef({ 
    animationId: null, 
    gameRunning: false,
    rightPressed: false,
    leftPressed: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768;
    let width = (canvas.width = isMobile ? 350 : 600);
    let height = (canvas.height = isMobile ? 250 : 400);

    // Game objects
    let paddleHeight = isMobile ? 8 : 12;
    let paddleWidth = isMobile ? 60 : 80;
    let paddleX = (width - paddleWidth) / 2;
    let paddleY = height - (isMobile ? 30 : 40);

    let ballRadius = isMobile ? 4 : 6;
    let x = width / 2;
    let y = paddleY - 20;
    let dx = isMobile ? 2 : 3;
    let dy = isMobile ? -2 : -3;

    // Bricks
    let brickRowCount = isMobile ? 3 : 4;
    let brickColumnCount = isMobile ? 5 : 8;
    let brickWidth = isMobile ? 50 : 60;
    let brickHeight = isMobile ? 12 : 15;
    let brickPadding = isMobile ? 5 : 8;
    let brickOffsetTop = isMobile ? 30 : 50;
    let brickOffsetLeft = (width - (brickColumnCount * (brickWidth + brickPadding) - brickPadding)) / 2;

    let bricks = [];
    let currentScore = score;
    let currentLives = lives;

    // Initialize bricks
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
      ctx.fill();
      ctx.closePath();
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          if (b.status === 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              dy = -dy;
              b.status = 0;
              currentScore += 10;
              setScore(currentScore);

              // Check for win condition
              let allBroken = true;
              for (let cc = 0; cc < brickColumnCount; cc++) {
                for (let rr = 0; rr < brickRowCount; rr++) {
                  if (bricks[cc][rr].status === 1) {
                    allBroken = false;
                    break;
                  }
                }
                if (!allBroken) break;
              }
              
              if (allBroken) {
                onGameEnd("win", currentScore);
                gameStateRef.current.gameRunning = false;
              }
            }
          }
        }
      }
    }

    function resetBall() {
      x = width / 2;
      y = paddleY - 20;
      dx = isMobile ? 2 : 3;
      dy = isMobile ? -2 : -3;
      paddleX = (width - paddleWidth) / 2;
    }

    function draw() {
      if (!gameStateRef.current.gameRunning) return;

      ctx.fillStyle = isDarkMode ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, width, height);

      drawBricks();
      drawBall();
      drawPaddle();
      
      if (playing) {
        collisionDetection();

        // Wall bounce
        if (x + dx > width - ballRadius || x + dx < ballRadius) dx = -dx;
        if (y + dy < ballRadius) dy = -dy;

        // Paddle & bottom check
        else if (y + dy > paddleY - ballRadius) {
          if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            const hitPos = (x - paddleX) / paddleWidth;
            dx = (isMobile ? 3 : 4) * (hitPos - 0.5);
          } else if (y > height - ballRadius) {
            currentLives--;
            setLives(currentLives);
            
            if (currentLives <= 0) {
              onGameEnd("lose", currentScore);
              gameStateRef.current.gameRunning = false;
              return;
            } else {
              resetBall();
            }
          }
        }

        // Paddle movement
        if (gameStateRef.current.rightPressed && paddleX < width - paddleWidth) {
          paddleX += isMobile ? 4 : 6;
        } else if (gameStateRef.current.leftPressed && paddleX > 0) {
          paddleX -= isMobile ? 4 : 6;
        }

        x += dx;
        y += dy;
      }

      gameStateRef.current.animationId = requestAnimationFrame(draw);
    }

    // Event handlers
    function keyDownHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        e.preventDefault();
        gameStateRef.current.rightPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        e.preventDefault();
        gameStateRef.current.leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        e.preventDefault();
        gameStateRef.current.rightPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        e.preventDefault();
        gameStateRef.current.leftPressed = false;
      }
    }

    // Touch handlers for mobile
    let touchStartX = 0;
    function touchStartHandler(e) {
      touchStartX = e.touches[0].clientX;
    }

    function touchMoveHandler(e) {
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const rect = canvas.getBoundingClientRect();
      const relativeX = touchX - rect.left;
      paddleX = relativeX - paddleWidth / 2;
      if (paddleX < 0) paddleX = 0;
      if (paddleX > width - paddleWidth) paddleX = width - paddleWidth;
    }

    // Start game loop
    gameStateRef.current.gameRunning = true;
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    canvas.addEventListener("touchstart", touchStartHandler);
    canvas.addEventListener("touchmove", touchMoveHandler);
    
    draw();

    return () => {
      gameStateRef.current.gameRunning = false;
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
      canvas.removeEventListener("touchstart", touchStartHandler);
      canvas.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [playing, isDarkMode]);

  // Reset game when playing changes
  useEffect(() => {
    if (playing) {
      setScore(0);
      setLives(3);
    }
  }, [playing]);

  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full max-w-md text-sm font-medium">
        <span className="text-gray-600 dark:text-gray-400">Score: {score}</span>
        <span className="text-gray-600 dark:text-gray-400">Lives: {lives}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
        width={isMobile ? 350 : 600}
        height={isMobile ? 250 : 400}
      />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {isMobile ? "Touch and drag to move paddle" : "Use ← → arrow keys to move paddle"}
      </div>
    </div>
  );
};

const Snake = ({ isDarkMode = false, playing = false, onGameEnd }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const gameStateRef = useRef({ 
    animationId: null, 
    gameRunning: false,
    direction: 'RIGHT'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768;
    canvas.width = isMobile ? 350 : 600;
    canvas.height = isMobile ? 250 : 400;
    
    const gridSize = isMobile ? 15 : 20;
    let snake = [{x: Math.floor(canvas.width/2/gridSize)*gridSize, y: Math.floor(canvas.height/2/gridSize)*gridSize}];
    let food = {x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize};
    let currentScore = 0;

    function drawGame() {
      // Clear canvas
      ctx.fillStyle = isDarkMode ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
      snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
      });

      // Draw food
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
      ctx.fillRect(food.x, food.y, gridSize, gridSize);
      
      // Draw food border to distinguish from snake
      ctx.strokeStyle = isDarkMode ? "#000000" : "#ffffff";
      ctx.lineWidth = 1;
      ctx.strokeRect(food.x, food.y, gridSize, gridSize);
    }

    function moveSnake() {
      if (!playing) return;

      const head = {...snake[0]};
      
      switch (gameStateRef.current.direction) {
        case 'UP': head.y -= gridSize; break;
        case 'DOWN': head.y += gridSize; break;
        case 'LEFT': head.x -= gridSize; break;
        case 'RIGHT': head.x += gridSize; break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        onGameEnd("lose", currentScore);
        return;
      }

      // Check self collision
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        onGameEnd("lose", currentScore);
        return;
      }

      snake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        currentScore += 10;
        setScore(currentScore);
        // Generate new food
        food = {
          x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
          y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };
      } else {
        snake.pop();
      }
    }

    function gameLoop() {
      if (!gameStateRef.current.gameRunning) return;
      
      moveSnake();
      drawGame();
      
      setTimeout(() => {
        gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
      }, isMobile ? 200 : 150);
    }

    function keyHandler(e) {
      const { direction } = gameStateRef.current;
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') gameStateRef.current.direction = 'UP';
          break;
        case 'ArrowDown':
          if (direction !== 'UP') gameStateRef.current.direction = 'DOWN';
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') gameStateRef.current.direction = 'LEFT';
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') gameStateRef.current.direction = 'RIGHT';
          break;
      }
      e.preventDefault();
    }

    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    function touchStartHandler(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }

    function touchEndHandler(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      const { direction } = gameStateRef.current;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 30 && direction !== 'LEFT') {
          gameStateRef.current.direction = 'RIGHT';
        } else if (deltaX < -30 && direction !== 'RIGHT') {
          gameStateRef.current.direction = 'LEFT';
        }
      } else {
        // Vertical swipe
        if (deltaY > 30 && direction !== 'UP') {
          gameStateRef.current.direction = 'DOWN';
        } else if (deltaY < -30 && direction !== 'DOWN') {
          gameStateRef.current.direction = 'UP';
        }
      }
    }

    gameStateRef.current.gameRunning = true;
    document.addEventListener('keydown', keyHandler);
    canvas.addEventListener('touchstart', touchStartHandler);
    canvas.addEventListener('touchend', touchEndHandler);
    drawGame();
    
    if (playing) {
      gameLoop();
    }

    return () => {
      gameStateRef.current.gameRunning = false;
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
      document.removeEventListener('keydown', keyHandler);
      canvas.removeEventListener('touchstart', touchStartHandler);
      canvas.removeEventListener('touchend', touchEndHandler);
    };
  }, [playing, isDarkMode]);

  useEffect(() => {
    if (playing) {
      setScore(0);
    }
  }, [playing]);

  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Score: {score}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
      />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {isMobile ? "Swipe to control the snake" : "Use arrow keys to control the snake"}
      </div>
    </div>
  );
};

const Tetris = ({ isDarkMode = false, playing = false, onGameEnd }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const gameStateRef = useRef({
    animationId: null,
    gameRunning: false,
    dropTime: 0,
    currentPiece: null,
    nextPiece: null
  });

  const SHAPES = [
    [[[1,1,1,1]]], // I
    [[[1,1],[1,1]]], // O
    [[[0,1,0],[1,1,1]]], // T
    [[[0,1,1],[1,1,0]]], // S
    [[[1,1,0],[0,1,1]]], // Z
    [[[1,0,0],[1,1,1]]], // J
    [[[0,0,1],[1,1,1]]], // L
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768;
    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = isMobile ? 12 : 20;
    
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;

    let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    let currentPiece = { shape: SHAPES[0], x: 4, y: 0, rotation: 0 };
    let currentScore = 0;
    let currentLines = 0;
    let dropCounter = 0;
    let lastTime = 0;

    function getRandomPiece() {
      return {
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        x: 4,
        y: 0,
        rotation: 0
      };
    }

    function drawBlock(x, y, filled) {
      ctx.fillStyle = filled ? (isDarkMode ? "#ffffff" : "#000000") : (isDarkMode ? "#000000" : "#ffffff");
      ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      
      if (filled) {
        ctx.strokeStyle = isDarkMode ? "#000000" : "#ffffff";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }

    function drawBoard() {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          drawBlock(col, row, board[row][col]);
        }
      }
    }

    function drawPiece(piece) {
      const shape = piece.shape[piece.rotation] || piece.shape[0];
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            drawBlock(piece.x + col, piece.y + row, true);
          }
        }
      }
    }

    function isValidMove(piece, newX, newY, rotation) {
      const shape = piece.shape[rotation] || piece.shape[0];
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const x = newX + col;
            const y = newY + row;
            if (x < 0 || x >= COLS || y >= ROWS || (y >= 0 && board[y][x])) {
              return false;
            }
          }
        }
      }
      return true;
    }

    function placePiece(piece) {
      const shape = piece.shape[piece.rotation] || piece.shape[0];
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const y = piece.y + row;
            if (y >= 0) {
              board[y][piece.x + col] = 1;
            }
          }
        }
      }
    }

    function clearLines() {
      let linesCleared = 0;
      for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell === 1)) {
          board.splice(row, 1);
          board.unshift(Array(COLS).fill(0));
          linesCleared++;
          row++;
        }
      }
      if (linesCleared > 0) {
        currentLines += linesCleared;
        currentScore += linesCleared * 100;
        setLines(currentLines);
        setScore(currentScore);
      }
    }

    function gameLoop(time = 0) {
      if (!gameStateRef.current.gameRunning || !playing) return;

      const deltaTime = time - lastTime;
      dropCounter += deltaTime;

      if (dropCounter > 500) {
        if (isValidMove(currentPiece, currentPiece.x, currentPiece.y + 1, currentPiece.rotation)) {
          currentPiece.y++;
        } else {
          placePiece(currentPiece);
          clearLines();
          currentPiece = getRandomPiece();
          
          if (!isValidMove(currentPiece, currentPiece.x, currentPiece.y, currentPiece.rotation)) {
            onGameEnd("lose", currentScore);
            return;
          }
        }
        dropCounter = 0;
      }

      // Clear canvas
      ctx.fillStyle = isDarkMode ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawBoard();
      drawPiece(currentPiece);

      lastTime = time;
      gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
    }

    function keyHandler(e) {
      if (!playing) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (isValidMove(currentPiece, currentPiece.x - 1, currentPiece.y, currentPiece.rotation)) {
            currentPiece.x--;
          }
          break;
        case 'ArrowRight':
          if (isValidMove(currentPiece, currentPiece.x + 1, currentPiece.y, currentPiece.rotation)) {
            currentPiece.x++;
          }
          break;
        case 'ArrowDown':
          if (isValidMove(currentPiece, currentPiece.x, currentPiece.y + 1, currentPiece.rotation)) {
            currentPiece.y++;
          }
          break;
        case 'ArrowUp':
        case ' ':
          const newRotation = (currentPiece.rotation + 1) % (currentPiece.shape.length || 1);
          if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, newRotation)) {
            currentPiece.rotation = newRotation;
          }
          break;
      }
      e.preventDefault();
    }

    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    function touchStartHandler(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }

    function touchEndHandler(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30) {
          // Swipe right
          if (isValidMove(currentPiece, currentPiece.x + 1, currentPiece.y, currentPiece.rotation)) {
            currentPiece.x++;
          }
        } else if (deltaX < -30) {
          // Swipe left
          if (isValidMove(currentPiece, currentPiece.x - 1, currentPiece.y, currentPiece.rotation)) {
            currentPiece.x--;
          }
        }
      } else {
        if (deltaY > 30) {
          // Swipe down
          if (isValidMove(currentPiece, currentPiece.x, currentPiece.y + 1, currentPiece.rotation)) {
            currentPiece.y++;
          }
        } else if (deltaY < -30) {
          // Swipe up - rotate
          const newRotation = (currentPiece.rotation + 1) % (currentPiece.shape.length || 1);
          if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, newRotation)) {
            currentPiece.rotation = newRotation;
          }
        }
      }
    }

    function tapHandler(e) {
      // Single tap to rotate
      const newRotation = (currentPiece.rotation + 1) % (currentPiece.shape.length || 1);
      if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, newRotation)) {
        currentPiece.rotation = newRotation;
      }
    }

    gameStateRef.current.gameRunning = true;
    currentPiece = getRandomPiece();
    
    document.addEventListener('keydown', keyHandler);
    canvas.addEventListener('touchstart', touchStartHandler);
    canvas.addEventListener('touchend', touchEndHandler);
    canvas.addEventListener('click', tapHandler);

    if (playing) {
      gameLoop();
    }

    return () => {
      gameStateRef.current.gameRunning = false;
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
      document.removeEventListener('keydown', keyHandler);
      canvas.removeEventListener('touchstart', touchStartHandler);
      canvas.removeEventListener('touchend', touchEndHandler);
      canvas.removeEventListener('click', tapHandler);
    };
  }, [playing, isDarkMode]);

  useEffect(() => {
    if (playing) {
      setScore(0);
      setLines(0);
    }
  }, [playing]);

  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full max-w-md text-sm font-medium">
        <span className="text-gray-600 dark:text-gray-400">Score: {score}</span>
        <span className="text-gray-600 dark:text-gray-400">Lines: {lines}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
      />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {isMobile ? "Swipe to move, tap to rotate" : "Arrow keys to move, up/space to rotate"}
      </div>
    </div>
  );
};

const Pong = ({ isDarkMode = false, playing = false, onGameEnd }) => {
  const canvasRef = useRef(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const gameStateRef = useRef({
    animationId: null,
    gameRunning: false,
    upPressed: false,
    downPressed: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768;
    canvas.width = isMobile ? 350 : 600;
    canvas.height = isMobile ? 250 : 400;

    // Game objects
    const paddleWidth = isMobile ? 8 : 12;
    const paddleHeight = isMobile ? 50 : 80;
    const ballSize = isMobile ? 6 : 8;

    let playerPaddle = {
      x: 20,
      y: (canvas.height - paddleHeight) / 2,
      width: paddleWidth,
      height: paddleHeight,
      speed: isMobile ? 4 : 6
    };

    let aiPaddle = {
      x: canvas.width - 20 - paddleWidth,
      y: (canvas.height - paddleHeight) / 2,
      width: paddleWidth,
      height: paddleHeight,
      speed: isMobile ? 3 : 4
    };

    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: ballSize,
      speedX: isMobile ? 3 : 4,
      speedY: isMobile ? 2 : 3
    };

    let currentPlayerScore = 0;
    let currentAiScore = 0;

    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speedX = (Math.random() > 0.5 ? 1 : -1) * (isMobile ? 3 : 4);
      ball.speedY = (Math.random() - 0.5) * (isMobile ? 4 : 6);
    }

    function drawRect(x, y, width, height) {
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
      ctx.fillRect(x, y, width, height);
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
      ctx.fill();
      ctx.closePath();
    }

    function drawNet() {
      ctx.setLineDash([5, 15]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = isDarkMode ? "#ffffff" : "#000000";
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawScore() {
      ctx.font = isMobile ? "20px Arial" : "30px Arial";
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
      ctx.textAlign = "center";
      ctx.fillText(currentPlayerScore, canvas.width / 4, isMobile ? 30 : 50);
      ctx.fillText(currentAiScore, (3 * canvas.width) / 4, isMobile ? 30 : 50);
    }

    function update() {
      if (!playing) return;

      // Move ball
      ball.x += ball.speedX;
      ball.y += ball.speedY;

      // Ball collision with top and bottom walls
      if (ball.y - ball.size <= 0 || ball.y + ball.size >= canvas.height) {
        ball.speedY = -ball.speedY;
      }

      // Ball collision with paddles
      if (ball.x - ball.size <= playerPaddle.x + playerPaddle.width &&
          ball.y >= playerPaddle.y &&
          ball.y <= playerPaddle.y + playerPaddle.height &&
          ball.speedX < 0) {
        ball.speedX = -ball.speedX;
        const hitPos = (ball.y - (playerPaddle.y + playerPaddle.height / 2)) / (playerPaddle.height / 2);
        ball.speedY = hitPos * (isMobile ? 3 : 5);
      }

      if (ball.x + ball.size >= aiPaddle.x &&
          ball.y >= aiPaddle.y &&
          ball.y <= aiPaddle.y + aiPaddle.height &&
          ball.speedX > 0) {
        ball.speedX = -ball.speedX;
        const hitPos = (ball.y - (aiPaddle.y + aiPaddle.height / 2)) / (aiPaddle.height / 2);
        ball.speedY = hitPos * (isMobile ? 3 : 5);
      }

      // Score
      if (ball.x < 0) {
        currentAiScore++;
        setAiScore(currentAiScore);
        if (currentAiScore >= 5) {
          onGameEnd("lose", currentPlayerScore);
          return;
        }
        resetBall();
      } else if (ball.x > canvas.width) {
        currentPlayerScore++;
        setPlayerScore(currentPlayerScore);
        if (currentPlayerScore >= 5) {
          onGameEnd("win", currentPlayerScore);
          return;
        }
        resetBall();
      }

      // Player paddle movement
      if (gameStateRef.current.upPressed && playerPaddle.y > 0) {
        playerPaddle.y -= playerPaddle.speed;
      }
      if (gameStateRef.current.downPressed && playerPaddle.y + playerPaddle.height < canvas.height) {
        playerPaddle.y += playerPaddle.speed;
      }

      // AI paddle movement (simple AI)
      const aiPaddleCenter = aiPaddle.y + aiPaddle.height / 2;
      if (ball.y < aiPaddleCenter - 10 && aiPaddle.y > 0) {
        aiPaddle.y -= aiPaddle.speed * 0.8; // Make AI slightly slower
      } else if (ball.y > aiPaddleCenter + 10 && aiPaddle.y + aiPaddle.height < canvas.height) {
        aiPaddle.y += aiPaddle.speed * 0.8;
      }
    }

    function draw() {
      if (!gameStateRef.current.gameRunning) return;

      // Clear canvas
      ctx.fillStyle = isDarkMode ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw game elements
      drawNet();
      drawRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
      drawRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
      drawBall();
      drawScore();

      update();

      gameStateRef.current.animationId = requestAnimationFrame(draw);
    }

    function keyDownHandler(e) {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          gameStateRef.current.upPressed = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          gameStateRef.current.downPressed = true;
          break;
      }
      e.preventDefault();
    }

    function keyUpHandler(e) {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          gameStateRef.current.upPressed = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          gameStateRef.current.downPressed = false;
          break;
      }
      e.preventDefault();
    }

    // Touch controls for mobile
    let touchY = 0;

    function touchStartHandler(e) {
      touchY = e.touches[0].clientY;
    }

    function touchMoveHandler(e) {
      e.preventDefault();
      const currentTouchY = e.touches[0].clientY;
      const rect = canvas.getBoundingClientRect();
      const relativeY = currentTouchY - rect.top;
      
      playerPaddle.y = relativeY - playerPaddle.height / 2;
      if (playerPaddle.y < 0) playerPaddle.y = 0;
      if (playerPaddle.y + playerPaddle.height > canvas.height) {
        playerPaddle.y = canvas.height - playerPaddle.height;
      }
    }

    gameStateRef.current.gameRunning = true;
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    canvas.addEventListener('touchstart', touchStartHandler);
    canvas.addEventListener('touchmove', touchMoveHandler);

    resetBall();
    draw();

    return () => {
      gameStateRef.current.gameRunning = false;
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      canvas.removeEventListener('touchstart', touchStartHandler);
      canvas.removeEventListener('touchmove', touchMoveHandler);
    };
  }, [playing, isDarkMode]);

  useEffect(() => {
    if (playing) {
      setPlayerScore(0);
      setAiScore(0);
    }
  }, [playing]);

  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full max-w-md text-sm font-medium">
        <span className="text-gray-600 dark:text-gray-400">You: {playerScore}</span>
        <span className="text-gray-600 dark:text-gray-400">AI: {aiScore}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
      />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {isMobile ? "Touch and drag to move paddle" : "Use ↑↓ arrow keys or W/S to move"}
      </div>
    </div>
  );
};

// Game Selection Component
const GameSelector = ({ onSelectGame }) => {
  const games = [
    { id: 'brick-breaker', name: 'Brick Breaker', icon: '🧱' },
    { id: 'snake', name: 'Snake', icon: '🐍' },
    { id: 'tetris', name: 'Tetris', icon: '🔷' },
    { id: 'pong', name: 'Pong', icon: '🏓' }
  ];

  const isMobile = window.innerWidth < 768;

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2 gap-4 p-4' : 'grid-cols-2 gap-6 p-8'}`}>
      {games.map((game) => (
        <button
          key={game.id}
          onClick={() => onSelectGame(game.id)}
          className="bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-2xl p-6 aspect-square flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className={`${isMobile ? 'text-4xl mb-2' : 'text-6xl mb-4'}`}>{game.icon}</div>
          <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{game.name}</h3>
        </button>
      ))}
    </div>
  );
};

// Main Game Modal Component
const GameModal = ({ isOpen, onClose, gameId, isDarkMode }) => {
  const [playing, setPlaying] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const handleGameEnd = useCallback((result, score) => {
    setPlaying(false);
    setGameResult({ result, score });
  }, []);

  const handleRestart = () => {
    setGameResult(null);
    setPlaying(true);
  };

  const handleClose = () => {
    setPlaying(false);
    setGameResult(null);
    onClose();
  };

  const renderGame = () => {
    switch (gameId) {
      case 'brick-breaker':
        return <BrickBreaker isDarkMode={isDarkMode} playing={playing} onGameEnd={handleGameEnd} />;
      case 'snake':
        return <Snake isDarkMode={isDarkMode} playing={playing} onGameEnd={handleGameEnd} />;
      case 'tetris':
        return <Tetris isDarkMode={isDarkMode} playing={playing} onGameEnd={handleGameEnd} />;
      case 'pong':
        return <Pong isDarkMode={isDarkMode} playing={playing} onGameEnd={handleGameEnd} />;
      default:
        return null;
    }
  };

  const getGameTitle = () => {
    switch (gameId) {
      case 'brick-breaker': return 'Brick Breaker';
      case 'snake': return 'Snake';
      case 'tetris': return 'Tetris';
      case 'pong': return 'Pong';
      default: return 'Game';
    }
  };

  if (!isOpen) return null;

  const isMobile = window.innerWidth < 768;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto" style={{ maxWidth: isMobile ? '100%' : '800px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 dark:text-white`}>
            {getGameTitle()}
          </h2>
          <div className="flex items-center space-x-2">
            {!playing && !gameResult && (
              <button
                onClick={() => setPlaying(true)}
                className="flex items-center space-x-1 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-lg transition-colors text-sm"
              >
                <Play className="w-3 h-3" />
                <span>Play</span>
              </button>
            )}
            {playing && (
              <button
                onClick={() => setPlaying(false)}
                className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors text-sm"
              >
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </button>
            )}
            {gameResult && (
              <button
                onClick={handleRestart}
                className="flex items-center space-x-1 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-lg transition-colors text-sm"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restart</span>
              </button>
            )}
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Content */}
        <div className="p-4">
          {gameResult && (
            <div className="mb-4 text-center">
              <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2 ${gameResult.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                {gameResult.result === 'win' ? '🎉 You Win!' : '💀 Game Over!'}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                Final Score: {gameResult.score}
              </div>
            </div>
          )}
          {renderGame()}
        </div>
      </div>
    </div>
  );
};

// Main Component
const GameCenter = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    
    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const handleSelectGame = (gameId) => {
    setSelectedGame(gameId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-3xl shadow-2xl w-full" style={{ maxWidth: isMobile ? '100%' : '600px' }}>
        <div className="text-center p-6 border-b-2 border-black dark:border-white">
          <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-black dark:text-white mb-2`}>
            🎮 Game Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Choose your favorite retro game and start playing!
          </p>
        </div>
        
        <GameSelector onSelectGame={handleSelectGame} />
      </div>

      <GameModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        gameId={selectedGame}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default GameCenter;
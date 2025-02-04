import React, { useState, useEffect } from "react";
import "./App.css";

enum GameState {
  Playing,
  Won,
  Lost,
}

enum MessageType {
  Correct = "CORRECT",
  Almost = "ALMOST",
  Wrong = "WRONG",
}

const WORDS = ["APPLE", "GRAPE", "MELON", "PEACH", "OLIVE"];
const MAX_LIVES = 5;
const WORD_TO_GUESS = WORDS[Math.floor(Math.random() * WORDS.length)];

const WordGuessGame: React.FC = () => {
  const [lives, setLives] = useState(MAX_LIVES);
  const [guessedLetters, setGuessedLetters] = useState<string[]>(
    Array(WORD_TO_GUESS.length).fill("")
  );
  const [message, setMessage] = useState<{ text: string; type: MessageType } | null>(null);
  const [inputLetter, setInputLetter] = useState("");
  const [gameState, setGameState] = useState<GameState>(GameState.Playing);

  useEffect(() => {
    if (guessedLetters.join("") === WORD_TO_GUESS) {
      setGameState(GameState.Won);
    }
  }, [guessedLetters]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const letter = event.target.value.toUpperCase();
    if (!/^[A-Z]$/.test(letter)) return;
    setInputLetter("");

    const newGuessedLetters = [...guessedLetters];
    let currentPosition = newGuessedLetters.findIndex(char => char === "");
    
    if (currentPosition === -1) return;

    if (WORD_TO_GUESS[currentPosition] === letter) {
      newGuessedLetters[currentPosition] = letter;
      setGuessedLetters(newGuessedLetters);
      setMessage({ text: `Correct position for ${letter}!`, type: MessageType.Correct });
    } else {
      if (WORD_TO_GUESS.includes(letter)) {
        setMessage({ text: `${letter} is correct but wrong position!`, type: MessageType.Almost });
      } else {
        setMessage({ text: `${letter} is not in the word! you lost a life`, type: MessageType.Wrong });
        setLives(l => l - 1);
      }
    }

    setTimeout(() => setMessage(null), 2000);
  };

  useEffect(() => {
    if (lives <= 0) setGameState(GameState.Lost);
  }, [lives]);

  const resetGame = () => {
    setLives(MAX_LIVES);
    setGuessedLetters(Array(WORD_TO_GUESS.length).fill(""));
    setMessage(null);
    setGameState(GameState.Playing);
  };

  return (
    <div className="game-container">
      <div className="lives-container">
        {Array(lives).fill("❤️").map((_, i) => (
          <span key={i} className="heart">{'❤️'}</span>
        ))}
      </div>
      
      <div className="word-container">
        {guessedLetters.map((letter, i) => (
          <div key={i} className={`letter-block ${letter ? 'filled' : ''}`}>
            {letter || <span className="empty-char">?</span>}
          </div>
        ))}
      </div>

      <div className="message-container">
        {message && (
          <div className={`message ${message.type.toLowerCase()}`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="styled-input"
          value={inputLetter}
          onChange={handleInput}
          maxLength={1}
          disabled={gameState !== GameState.Playing}
          placeholder="Enter letter"
        />
      </div>

      {gameState !== GameState.Playing && (
        <div className="modal">
          <h3>{gameState === GameState.Won ? "🎉 You Won!" : "😢 Game Over"}</h3>
          <p>The word was: {WORD_TO_GUESS}</p>
          <button className="reset-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default WordGuessGame;
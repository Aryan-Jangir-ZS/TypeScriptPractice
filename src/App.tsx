import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const getWord = () => {
const words = ["apple", "banana", "cherry", "date", "elderberry", "figure", "grape"];
return words[Math.floor(Math.random() * words.length)];
};
const getRemainingGuess = () => 5;

const App: React.FC = () => {
  const [word, setWord] = useState<string[]>(getWord().toLowerCase().split(""));
  const [remainingGuesses, setRemainingGuesses] = useState(getRemainingGuess());
  const [guessList, setGuessList] = useState<string[]>(Array(word.length).fill(""));
  const [correctIndexes, setCorrectIndexes] = useState<number[]>([]);
  const [prefilledIndexes, setPrefilledIndexes] = useState<number[]>([]);
  const [status, setStatus] = useState<"Playing" | "Failed" | "Success">("Playing");
  const [difficulty, setDifficulty] = useState<"Easy" | "Hard" | null>(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (difficulty === "Easy") prefillEasyMode();
  }, [difficulty]);

  const prefillEasyMode = () => {
    const prefillCount = Math.floor(Math.random() * 2) + 2;
    const indexes = word.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, prefillCount);
    const newGuesses = [...guessList];
    indexes.forEach(i => newGuesses[i] = word[i]);
    setGuessList(newGuesses);
    setPrefilledIndexes(indexes);
    setCorrectIndexes(indexes);
  };

  const handleInputChange = (letter: string, index: number) => {
    if (status !== "Playing" || correctIndexes.includes(index)) return;
    
    const newLetter = letter.toLowerCase();
    const updatedGuesses = [...guessList];
    const prevLetter = updatedGuesses[index];

    if (newLetter === word[index]) {
      updatedGuesses[index] = newLetter;
      setCorrectIndexes(prev => [...prev, index]);
      autoFocusNextInput(index);
    } else if (newLetter && prevLetter !== newLetter) {
      if (!word.includes(newLetter)) {
        setRemainingGuesses(prev => prev - 1);
        updatedGuesses[index] = newLetter;
        setTimeout(() => {
          updatedGuesses[index] = "";
          setGuessList([...updatedGuesses]);
        }, 1000);
      } else updatedGuesses[index] = newLetter;
    }

    setGuessList(updatedGuesses);
  };

  const autoFocusNextInput = (currentIndex: number) => {
    const nextIndex = guessList.findIndex((_, i) => 
      i > currentIndex && !correctIndexes.includes(i) && !prefilledIndexes.includes(i)
    );
    inputsRef.current[nextIndex]?.focus();
  };

  useEffect(() => {
    if (remainingGuesses <= 0) setStatus("Failed");
    else if (guessList.every((char, i) => char === word[i])) setStatus("Success");
  }, [guessList, remainingGuesses]);

  const resetGame = () => {
    setWord(getWord().toLowerCase().split(""));
    setRemainingGuesses(getRemainingGuess());
    setGuessList(Array(word.length).fill(""));
    setCorrectIndexes([]);
    setPrefilledIndexes([]);
    setStatus("Playing");
    setDifficulty(null);
  };

  const getColor = (char: string, index: number) => 
    !char ? "" : correctIndexes.includes(index) ? "correct" : 
    word.includes(char) ? "wrong-position" : "incorrect";

  if (!difficulty) return (
    <div className="difficulty-container">
      <h1>Choose Difficulty</h1>
      <button className="level-button" onClick={() => setDifficulty("Easy")}>Easy</button>
      <button onClick={() => setDifficulty("Hard")}>Hard</button>
    </div>
  );

  return (
    <div className="game-container">
      <h1 className="game-title">
        {status === "Success" ? "🎉 You Won!" : status === "Failed" ? "😢 Game Over!" : "Guess the Word"}
      </h1>
      <div className="word-container">
        {guessList.map((char, index) => (
          <input
            key={index}
            className={`letter-input ${prefilledIndexes.includes(index) ? "prefilled" : getColor(char, index)}`}
            value={char.toUpperCase()}
            maxLength={1}
            readOnly={correctIndexes.includes(index) || prefilledIndexes.includes(index)}
            ref={el => inputsRef.current[index] = el}
            onChange={e => handleInputChange(e.target.value, index)}
            onKeyDown={e => e.key === "Backspace" && (guessList[index] = "")}
          />
        ))}
      </div>
      <div className="status-container">
        <p className="lives">Lives Remaining: {remainingGuesses}</p>
      </div>
      {status !== "Playing" && <button onClick={resetGame}>Play Again</button>}
    </div>
  );
};

export default App;
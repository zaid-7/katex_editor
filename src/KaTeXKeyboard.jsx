// src/KaTeXKeyboard.js
import React from 'react';

const katexSymbols = [
    { symbol: 'α', latex: '\\alpha' },
    { symbol: 'β', latex: '\\beta' },
    { symbol: 'γ', latex: '\\gamma' },
    // Add more symbols as needed
  ];

const KaTeXKeyboard = ({ onInsert }) => {
  return (
    <div>
      {katexSymbols.map((symbol, index) => (
        <button key={index} onClick={() => onInsert(symbol.latex)}>
          {symbol.symbol}
        </button>
      ))}
    </div>
  );
};

export default KaTeXKeyboard;

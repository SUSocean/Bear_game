// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WordsProvider } from './context/wordsContext.tsx'
import { BlocksProvider } from './context/blocksContext.tsx'
import { GameProvider } from './context/gameContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WordsProvider>
      <BlocksProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </BlocksProvider>
    </WordsProvider>
)

import { BrowserRouter, Routes, Route} from "react-router-dom"


import Game from "./pages/Game"
import MainMenu from "./pages/MainMenu"
import GameOver from "./pages/GameOver"
import Rules from "./pages/Rules"

function App() {

  return (
    <main>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainMenu/>}/>

        <Route path="/rules" element={<Rules/>}/>

        <Route path="/game" element={<Game/>}/>

        <Route path="/gameover" element={<GameOver/>}/>

      </Routes>
    </BrowserRouter>
    </main>
  )

}

export default App
import "./styles/main.css";
import * as Dialog from '@radix-ui/react-dialog'

import { useState, useEffect } from "react";

import axios from 'axios'

import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  //declarando q a variavem games é um array de objetos da Interface Game
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:8080/games')
        .then(response => {
            setGames(response.data) //salva os dados
        })
}, []) //se nao colocar nada nesse array, a ufncao so sera executada 1 vez

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className=" text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              titulo={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal/>
      </Dialog.Root>

    </div>
  )

}

export default App

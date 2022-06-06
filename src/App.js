import React, { useState, useEffect, useRef } from 'react';

import "./App.css";

import XMenTeam from "./XMenTeam";
import {villains, mystique} from "./villains";

export const teamColor = {
  blue: "blue",
  gold: "gold",
}

export const TeamContext = React.createContext();

function App() {

  const [villainHP, setVillainHP] = useState(100);
  const [mystiqueImage, setMystiqueImage] = useState(villains[1].imageURL);
  const [team, setTeam] = useState("blue");

  useEffect(() => {
    if (villainHP < 100) {
      setMystiqueImage(mystique[Math.ceil(Math.random() * 12)])
    }
  }, [villainHP]);

  const attack = () => {
    setVillainHP(villainHP - 10);
  }

  const [worldDomination, setWorldDomination] = useState(0);
  const counterRef = useRef(null);
  const dominationRef = useRef(0);

  useEffect(() => {
    counterRef.current = setInterval(() => {
      dominationRef.current += 1;
      setWorldDomination(dominationRef.current);
    }, 2000);
    if (worldDomination >= 100) {
      clearInterval(counterRef.current);
    }
  }, [])

  return (
    <main>
      <h1>
        Oh no!! The evilest supervillains are combining to take over the world!
        Only the X-Men stand in their way!
      </h1>
      <section>
        {villains.map((villain) => {
          return (
            <div key={villain.name}>
              <img
                src={villain.name === "Mystique" ? mystiqueImage : villain.imageURL}
                alt={villain.name}
                height="300"
                className={
                  villain.name === "Mister Sinister" ||
                  villain.name === "Juggernaut"
                    ? "flipped"
                    : ""
                }
              />
              <h5>{villain.name}</h5>
            </div>
          );
        })}
      </section>
        <div className="domination-bar">
          <span className="dom-completion" style={{width: `${worldDomination}%`}}>
            <span className="dom-words">World Domination</span>
          </span>
        </div>
        <div className="health-bar">
          <span className="hp-depletion" style={{width: `${villainHP}%`}}>
            <span className="hp-words">Villainous Hit Points</span>
          </span>
        </div>
      <br />
      <TeamContext.Provider value={{
          team,
          switchTeam: () => {
            setTeam(team === "blue" ? "gold" : "blue");
          }
        }}>
        <XMenTeam attack={attack}/>
      </TeamContext.Provider>
    </main>
  );
}

export default App;

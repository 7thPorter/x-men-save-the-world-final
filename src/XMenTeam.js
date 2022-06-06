import { useState, useEffect, useContext } from 'react';

import blueTeam from "./blueTeam";
import goldTeam from "./goldTeam";

import { TeamContext, teamColor } from "./App.js";


const XMenTeam = (props) => {
  //useState is used to create a variable and a function that will access and alter one piece of state
  const [teamMember, setTeamMember] = useState(blueTeam[0]);
  const [hasAttacked, setHasAttacked] = useState([]);
  const [activeTeam, setActiveTeam] = useState(blueTeam);

  const { switchTeam, team } = useContext(TeamContext);

  useEffect(() => {
    if (team === "blue") {
      setActiveTeam(blueTeam);
    } else {
      setActiveTeam(goldTeam);
    }
    setTeamMember(activeTeam[0]);
  }, [team, activeTeam]);

  return (
    <section className="x-men-team">
      <h1>{team === "blue" ? "BLUE TEAM" : "GOLD TEAM"}</h1>
      <div className="buttons">
        <div className="attack-button" onClick={hasAttacked.includes(teamMember.name) ? null : () => {
          props.attack();
          setHasAttacked([...hasAttacked, teamMember.name]);
        }}>
          <span>ATTACK</span>
        </div>
        <div className="switch-button" onClick={switchTeam}>
          <span>SWITCH TEAMS</span>
        </div>
      </div>
      <div className={hasAttacked.includes(teamMember.name) ? "team-member-card attacked" : "team-member-card"}>
        <img src={teamMember.cardImageURL} alt={teamMember.name} />
        <div>
          <big>Codename: </big>
          <span>{teamMember.name}</span>
        </div>
        <div>
          <big>Real Name: </big>
          <span>{teamMember.realName}</span>
        </div>
        <div>
          <big>Powers: </big>
          <span>{teamMember.powers.join(", ")}</span>
        </div>
        <div>
          <big>Team Role: </big>
          <span>{teamMember.teamRole}</span>
        </div>
        <div>
          <big>Height: </big>
          <span>
            {teamMember.heightFeet}'{teamMember.heightInches}"
          </span>
        </div>
        <div>
          <big>Weight: </big>
          <span>{teamMember.weight} lbs</span>
        </div>
        <div>
          <big>Eye Color: </big>
          <span>{teamMember.eyeColor}</span>
        </div>
        <div>
          <big>Hair Color: </big>
          <span>{teamMember.hairColor}</span>
        </div>
      </div>
      <div className="hero-lineup">
        {activeTeam.map((member) => {
          return (
            <div className="team-member" key={member.name} onClick={() => {setTeamMember(member)}}>
              <img src={member.imageURL} alt={member.name} height="300" />
              <h5>{member.name}</h5>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default XMenTeam;

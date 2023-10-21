import "tailwindcss/tailwind.css";
import TitleLogo from "./title-logo";
import { useState, useEffect } from "react";

export default function Title(props) {
  const [titleSize, setTitleSize] = useState("10%");

  useEffect(() => {
    if (props.game.settings.logo_url) {
      setTimeout(setTitleSize(window.innerWidth * 0.4), 2000);
    } else {
      setTimeout(setTitleSize(window.innerWidth * 0.7), 2000);
    }
  }, []);

  function returnTeamMates(team) {
    let players = [];
    console.debug(props.game);
    Object.keys(props.game.registeredPlayers).forEach((k) => {
      console.debug(k);
      if (props.game.registeredPlayers[k].team === team) {
        players.push(props.game.registeredPlayers[k].name);
      }
    });
    console.debug(players);
    return players;
  }
  return (
    <div className="bg-gradient-to-t from-cBlack via-cPurple to-cBlacky items-center justify-center flex min-h-screen min-w-screen"> {/* BACKGROUND - TITLE GAME */}
      <div
        style={{
          width: titleSize,
          transition: "width 2s",
        }}
        className="align-middle inline-block"
      >
        <div className="flex flex-col space-y-10">
          <div className="flex-grow">
            {props.game.settings.logo_url ? (
              <img src={`${props.game.settings.logo_url}`} size={titleSize} />
            ) : (
                <TitleLogo insert={props.game.title_text} size={titleSize} />
              )}
          </div>
          {/* ID GAME */}
          <div className="flex flex-row justify-center text-center">
            <p className="text-5xl font-bold p-5 text-foreground rounded" style={{background:"#042940"}}> 
              {props.game.room}
            </p>
          </div>
          {/* TEAM SECTION */}
          <div className="flex flex-row">
            {[0, 1].map(function(n) {
              return (
                <div className="flex-grow justify-center text-center" style={{ background:"#005C53", border: "2px solid black", alignContent: "center" }}>
                  {/* TEAM TITLE */}
                  <p className="text-3xl flex-grow font-bold" style={{color:"WHITE"}}>
                    {" "}
                    {props.game.teams[n].name}
                  </p>
                  <div className="flex flex-wrap flex-row justify-center">
                  {/* PLAYERS NAME */}
                    {returnTeamMates(n).map((m) => (
                      <div className=" m-2 rounded w-32 p-2" style={{background:"#D6D58E"}}> {/* Change bg-secondary-500 to bg-blue-500 */}
                        <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap" style={{color:"black"}}>{/* Make text bigger : text-2xl */}
                          {m}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

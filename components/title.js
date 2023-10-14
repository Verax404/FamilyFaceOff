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
    <div className="bg-gradient-to-t from-red-900 via-black-200 to-blue-900 items-center justify-center flex min-h-screen min-w-screen"> {/* BACKGROUND - TITLE GAME */}
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
            <p className="text-4xl font-bold p-5 text-foreground rounded bg-secondary-500"> {/* Change bg-secondary-500 to bg-red-500 */}
              {props.game.room}
            </p>
          </div>
          <div className="flex flex-row text-center">
            {[0, 1].map(function(n) {
              return (
                <div className="flex-grow">
                  <p className="text-4xl flex-grow text-foreground font-bold">
                    {" "}
                    {props.game.teams[n].name}
                  </p>
                  <div className="flex flex-wrap flex-row justify-center">
                  {/* PLAYERS NAME */}
                    {returnTeamMates(n).map((m) => (
                      <div className="bg-secondary-500 m-2 rounded w-32 p-2"> {/* Change bg-secondary-500 to bg-blue-500 */}
                        <p className="font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">{/* Make text bigger : text-2xl */}
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

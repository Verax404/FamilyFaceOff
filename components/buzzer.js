import { useState, useEffect, useRef } from "react";
import TitleLogo from "./title-logo";
import "tailwindcss/tailwind.css";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import cookieCutter from "cookie-cutter";
import getConfig from "next/config";
import Final from "./final";

let timerInterval = null;

const {
  publicRuntimeConfig: { BUZZER_SOUND },
} = getConfig();

export default function Buzzer(props) {
  const { i18n, t } = useTranslation();
  const [buzzed, setBuzzed] = useState(false);
  const [buzzerReg, setBuzzerReg] = useState(null);
  const [error, setErrorVal] = useState("");
  const [timer, setTimer] = useState(0);

  // Add a state to manage button disable state
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const audioRef = useRef(null);
  let refreshCounter = 0;

  function setError(e) {
    setErrorVal(e);
    setTimeout(() => {
      setErrorVal("");
    }, 5000);
  }

  window.addEventListener("scroll", (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  });

  let game = props.game;
  let ws = props.ws;

  const send = function (data) {
    data.room = props.room;
    data.id = props.id;
    ws.current.send(JSON.stringify(data));
  };

  const handleBuzzClick = () => {
    // Send buzz action to the server
    send({ action: "buzz", id: props.id });

    // Play the buzzer sound
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback error:", error);
      });
    }

    // Broadcast the state change to all connected clients
    send({ action: "disable_buttons", id: props.id });
  };

  useEffect(() => {
    setInterval(() => {
      if (ws.current.readyState !== 1) {
        setError(
          `lost connection to server refreshing in ${10 - refreshCounter}`
        );
        refreshCounter++;
        if (refreshCounter >= 10) {
          console.debug("buzzer reload()");
          location.reload();
        }
      } else {
        setError("");
      }
    }, 1000);

    if (props.id !== null && props.team !== null) {
      setBuzzerReg(props.id);
    }

    ws.current.addEventListener("message", (evt) => {
      let received_msg = evt.data;
      let json = JSON.parse(received_msg);
      console.log("Received WebSocket Message:", json);
      if (json.action === "ping") {
        // server gets the average latency periodically
        console.debug(props.id);
        send({ action: "pong", id: props.id });
      } else if (json.action === "quit") {
        props.setGame(null);
        props.setTeam(null);
      } else if (json.action === "set_timer") {
        setTimer(json.data);
      } else if (json.action === "stop_timer") {
        clearInterval(timerInterval);
      } else if (json.action === "start_timer") {
        let limit = json.data;
        timerInterval = setInterval(() => {
          if (limit > 0) {
            limit = limit - 1;
            setTimer(limit);
          } else {
            clearInterval(timerInterval);
            setTimer(json.data);
          }
        }, 1000);
      } else if (json.action === "data") {
        if (json.data.title_text === "Change Me") {
          json.data.title_text = t("Change Me");
        }
        if (json.data.teams[0].name === "Team 1") {
          json.data.teams[0].name = `${t("team")} ${t("number", { count: 1 })}`;
        }
        if (json.data.teams[1].name === "Team 2") {
          json.data.teams[1].name = `${t("team")} ${t("number", { count: 2 })}`;
        }
        props.setGame(json.data);
      } else if (json.action === "buzzed") {
        setBuzzed(true);
        // Add logic to disable buttons on all devices
        setButtonsDisabled(true);
      } else if (json.action === "clearbuzzers") {
        setBuzzed(false);
        // Add logic to enable buttons on all devices
        setButtonsDisabled(false);
      } else if (json.action === "change_lang") {
        console.debug("Language Change", json.data);
        i18n.changeLanguage(json.data);
      } else if (json.action === "registered") {
        console.debug(props.id);
        send({ action: "pong", id: props.id });
        setBuzzerReg(props.id);
      } else {
        console.debug("didnt expect action in buzzer: ", json);
      }
    });

    // Add the scroll event listener
    window.addEventListener("scroll", (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    });

    return () => {
      window.removeEventListener("scroll", (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
      });
    };
  }, [buzzed]);

  if (game.teams != null) {
    console.debug(game);
    return (
      <>
        <style>
          {`
        body {
          overflow: ${buzzed ? "hidden" : "auto"};
          position: fixed;
        }

        html, body {
             overscroll-behavior: none;
        }

        .center-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 75vh;
        }
        
        .center-container img {
          max-width: 100%;
          height: auto;
        }
      `}
        </style>
        <button
          className="shadow-md rounded-lg p-2 hover:bg-red-300 text-1xl font-bold uppercase w-24 self-end"
          style={{ background: "#D6D58E" }}
          onClick={() => {
            send({ action: "quit" });
          }}
        >
          {t("quit")}
        </button>
        {buzzerReg !== null ? (
          <>
            {!game.title && !game.is_final_round ? (
              <div className="pt-8 flex flex-col space-y-5">
                {/* BUZZER BUTTON */}
                <div
                  className="center-container"
                  style={{ width: "110%", textAlign: "center" }}
                >
                  {buzzed ? (
                    <>
                      <img
                        className={`cursor-pointer ${buttonsDisabled ? 'opacity-50' : ''}`}
                        style={{ width: "100%", display: "inline-block" }}
                        onClick={!buttonsDisabled ? handleBuzzClick : undefined}
                        src="buzzed.svg"
                      />
                      <audio ref={audioRef} autoPlay={false}>
                        <source src={BUZZER_SOUND} type="audio/mp3" />
                      </audio>
                    </>
                  ) : (
                    <>
                      <img
                        className="cursor-pointer"
                        style={{ width: "100%", display: "inline-block" }}
                        onClick={() => {
                          send({ action: "buzz", id: props.id });
                          if (audioRef.current) {
                            audioRef.current.play().catch((error) => {
                              // Handle play error if necessary
                              console.error("Audio playback error:", error);
                            });
                          }
                        }}
                        src="buzz.svg"
                      />
                      <audio ref={audioRef} autoPlay={false}>
                        <source src={BUZZER_SOUND} type="audio/mp3" />
                      </audio>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                {game.is_final_round ? (
                  <div>
                    <Final game={game} timer={timer} />
                  </div>
                ) : (
                  <div>
                    {props.game.settings.logo_url ? (
                      <img src={`${props.game.settings.logo_url}`} />
                    ) : (
                      <TitleLogo insert={props.game.title_text} />
                    )}
                    <p className="text-3xl text-center py-12 text-foreground">
                      {t("Waiting for host to start")}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {props.game.settings.logo_url ? (
              <img src={`${props.game.settings.logo_url}`} />
            ) : (
              <TitleLogo insert={props.game.title_text} />
            )}
            <div className="flex flex-row justify-center">
              <h1 className="text-3xl text-foreground">
                {t("team")}:{" "}
                {props.team != null
                  ? game.teams[props.team].name
                  : t("pick your team")}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="hover:shadow-md rounded-md p-5"
                style={{ background: "#005C53" }}
                onClick={() => {
                  cookieCutter.set("session", `${props.room}:${props.id}:0`);
                  props.setTeam(0);
                }}
              >
                {game.teams[0].name}
              </button>

              <button
                className="hover:shadow-md rounded-md p-5"
                style={{ background: "#005C53" }}
                onClick={() => {
                  cookieCutter.set("session", `${props.room}:${props.id}:1`);
                  props.setTeam(1);
                }}
              >
                {game.teams[1].name}
              </button>
            </div>
            <div className="flex flex-row justify-center">
              <button
                className="py-8 px-16 hover:shadow-md rounded-md bg-success-200 uppercase"
                style={{ background: "#9FC131" }}
                onClick={() => {
                  if (props.team != null) {
                    send({ action: "registerbuzz", team: props.team });
                  } else {
                    let errors = [];
                    props.team == null
                      ? errors.push(t("pick your team"))
                      : null;
                    setError(errors.join(` ${t("and")} `));
                  }
                }}
              >
                {t("join")}
              </button>
            </div>
            {error != null && error !== "" ? <p>👾 {error}</p> : null}
          </>
        )}
      </>
    );
  } else {
    return (
      <div>
        <p className="text-foreground">{t("loading")}</p>
      </div>
    );
  }
}

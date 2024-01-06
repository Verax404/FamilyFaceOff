function TeamControls(props) {
    const { i18n, t } = useTranslation();
    const audioElement = new Audio("points.mp3");
  
    return (
      <>
        <button
          disabled={props.pointsGivin.state}
          className={`border-4 text-2xl ${props.pointsGivin.color} rounded p-10 ${props.pointsGivin.textColor}`}
          onClick={() => {
            props.game.teams[props.team].points =
              props.game.point_tracker[props.game.round] +
              props.game.teams[props.team].points;
            props.setPointsGivin({
              state: true,
              color: "bg-secondary-500",
              textColor: "text-foreground",
            });
            props.setGame((prv) => ({ ...prv }));
            props.send({ action: "data", data: props.game });
            audioElement.play().catch((error) => {
              console.error("Audio playback error:", error);
            });
          }}
        >
          {t("team")} {t("number", { count: props.team + 1 })}:{" "}
          {props.game.teams[props.team].name} {t("Gets Points")}
        </button>
        <button
          className="border-4 bg-failure-500 text-2xl rounded p-10 text-foreground"
          onClick={() => {
            if (props.game.teams[props.team].mistakes < 3)
              props.game.teams[props.team].mistakes++;
            props.setGame((prv) => ({ ...prv }));
            props.send({ action: "data", data: props.game });
            props.send({
              action: "mistake",
              data: props.game.teams[props.team].mistake,
            });
          }}
        >
          {t("team")} {t("number", { count: props.team + 1 })}:{" "}
          {props.game.teams[props.team].name} {t("mistake")}
        </button>
        
        <button
          className="border-4 bg-failure-500 text-2xl rounded p-10 text-foreground"
          onClick={() => {
            if (props.game.teams[props.team].mistakes > 0)
              props.game.teams[props.team].mistakes--;
            props.setGame((prv) => ({ ...prv }));
            props.send({ action: "data", data: props.game });
          }}
        >
          {t("team")} {t("number", { count: props.team + 1 })}:{" "}
          {t("remove")} {t("mistake")}
        </button>
      </>
    );
  }
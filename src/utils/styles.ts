import {makeStyles, Theme} from "@material-ui/core/styles";

const useGameStyles = makeStyles((theme: Theme) =>
    ({
        game: {
            padding: theme.spacing(10),
        },
        gameDisabled: {
            pointerEvents: "none"
        },
    }),
);

const useCardStyles = makeStyles((theme: Theme) =>
    ({
        card: {
            width: "100%",
            maxHeight: 200,
            maxWidth: 200,
            cursor: "pointer",
            boxShadow: "0 0 10px #bababa",
            webkitBoxShadow: "0 0 10px #bababa",
            borderRadius: 8,
            overflow: "hidden"
        },
        cardDisabled: {
            cursor: "default",
            pointerEvents: "none"
        },
        fallback: {
            height: "100%",
            width: "100%",
            paddingTop: "100%",
        },
        front: {},
        back: {}
    }),
);

export {useGameStyles, useCardStyles};
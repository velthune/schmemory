import React, {FC, RefObject, useCallback, useMemo, useRef, useState} from "react";
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";

import Card, {CardPropsRef} from "../../components/card";
import {useGameStyles} from "../../utils/styles";
import Text from "../../components/text";
import CountDown, {CountDownPropsRef} from "../../components/countDown";
import {generateShuffleArray} from "../../utils/game";

interface GameScore {
    total: number;
    attempts: number;
}

interface GameProps {
    cardNumber?: number
}

interface GameProps {
    cardNumber?: number
}

const maxCardNumber = 16
// Is the time, in seconds, that an user have to find the second card
const timeToReset = 5

const Game: FC<GameProps> = ({
                                 cardNumber = maxCardNumber
                             }) => {
    const [shuffle, setShuffle] = useState(false)
    const [score, setScore] = useState<GameScore>({total: 0, attempts: 0})
    const [flippedCard, setFlippedCard] = useState<string | undefined>()
    const [previousCardRef, setPreviousCardRef] = useState<RefObject<CardPropsRef> | undefined>()
    const [isUserInteractionDisabled, setUserInteractionDisabled] = useState(false)

    const refs = useRef<RefObject<CardPropsRef>[]>([]);
    const countDownRef = useRef<CountDownPropsRef>(null);

    const cards: string[] = useMemo(() => generateShuffleArray(cardNumber), [cardNumber]);
    // Accepted card number: positive number, odd and less than max card number
    const validCardNumber = useMemo(() => cardNumber > 0 && cardNumber <= maxCardNumber && !(cardNumber % 2), [cardNumber])
    const isGameComplete = useCallback(() => cardNumber / 2 === score.total, [cardNumber, score])
    const cardRefs = useMemo(() => {
        refs.current = cards.map((ref, index) => refs.current[index] = React.createRef())
        return refs
    }, [cards])

    const classes = useGameStyles();

    const resetPrevCardInfo = () => {
        setPreviousCardRef(undefined)
        setFlippedCard(undefined)
        setUserInteractionDisabled(false)
        countDownRef?.current?.reset();
    }

    const incrementAttempts = () => setScore({...score, attempts: score.attempts + 1})
    const incrementScore = () => setScore({...score, total: score.total + 1})

    const onCardClick = (identifier: string, ref: RefObject<CardPropsRef>) => {
        if (!previousCardRef) {
            setPreviousCardRef(ref)
            setFlippedCard(identifier)
            ref.current?.flip()
            countDownRef?.current?.start();
        } else {
            if (flippedCard && flippedCard === identifier) {
                ref.current?.disable()
                incrementScore()
                ref.current?.flip()
                resetPrevCardInfo()
            } else {
                setUserInteractionDisabled(true)
                ref.current?.flip()
                setTimeout(() => {
                    incrementAttempts()
                    ref.current?.flip()
                    previousCardRef.current?.flip()
                    resetPrevCardInfo()
                }, 1000)
            }
        }
    }

    const reset = () => {
        resetPrevCardInfo()
        cardRefs.current?.forEach((ref: RefObject<CardPropsRef>) => ref.current?.flip())
        setScore({total: 0, attempts: 0})
        countDownRef?.current?.reset()
        setShuffle(!shuffle)
    }

    return <>
        {
            validCardNumber
                ?
                <>
                    <Text remSize={2}>{`Schmemory with ${cardNumber} cards`}</Text>
                    <Text remSize={1.5}>{`Score: ${score.total}`}</Text>
                    <Text remSize={1.4}>{`Attempts: ${score.attempts}`}</Text>
                    <CountDown
                        ref={countDownRef}
                        onFinish={() => {
                            incrementAttempts()
                            resetPrevCardInfo()
                            previousCardRef?.current?.flip()
                        }} seconds={timeToReset}/>
                    {isGameComplete() && <Button onClick={reset}>Reset</Button>}
                    <Grid
                        className={`${classes.game} ${isUserInteractionDisabled ? classes.gameDisabled : ""}`}
                        container
                        spacing={3}>
                        {
                            cards.map((identifier: string, i: number) =>
                                <Grid item xs={6} sm={3}>
                                    <Card
                                        ref={cardRefs.current[i]}
                                        onClick={() => onCardClick(identifier, cardRefs.current[i])}
                                        key={`card-${i}`}
                                        imageIdentifier={identifier}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </>
                : <Text>{`You should insert a valid card number (odd or <=16)`}</Text>
        }
    </>
}

export default Game;
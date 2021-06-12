import React, {
    forwardRef,
    ForwardRefRenderFunction,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState
} from "react";

import {useCardStyles} from "../../utils/styles";
import {toHex} from "../../utils/string";

export type CardPropsRef = {
    flip: () => void;
    disable: () => void;
    isBack: () => boolean;
}

export interface CardProps {
    imageIdentifier: string;
    onFlip?: () => void;
    onClick: () => void;
}

enum CardStatus {
    front,
    back
}

const back = require('../../assets/images/card-back.jpeg')

const Card: ForwardRefRenderFunction<CardPropsRef, CardProps> = ({imageIdentifier, onFlip, onClick, ...props}, ref) => {

    const [cardStatus, setCardStatus] = useState(CardStatus.back)
    const [disable, setDisable] = useState(false)
    const [fallbackImage, setFallbackImage] = useState<JSX.Element | undefined>()

    useEffect(() => setDisable(!isBack()), [cardStatus])

    const classes = useCardStyles();

    const isBack = useCallback(() => CardStatus.back === cardStatus, [cardStatus])

    useImperativeHandle(ref, () => ({
        flip,
        isBack,
        disable: () => setDisable(true)
    }));

    const flip = () => {
        setCardStatus(cardStatus === CardStatus.back ? CardStatus.front : CardStatus.back)
        onFlip?.()
    }

    const setupFallbackImage = () => {
        console.log("[dd] imageIdentifier", imageIdentifier)
        setFallbackImage(<div className={classes.fallback} style={{backgroundColor: toHex(imageIdentifier)}}/>)
    }

    return <div
        className={`${classes.card} ${disable ? classes.cardDisabled : ""}`}
        onClick={onClick}>
        {
            isBack()
                ? <img className={classes.card} alt={"card-back"} src={back.default}/>
                : (
                    fallbackImage
                    || <img className={classes.card} alt={"card-front"}
                            onError={setupFallbackImage}
                            onLoad={() => setFallbackImage(undefined)}
                            src={`http://localhost:8111/svg/${imageIdentifier}/200`}/>
                )
        }
    </div>
}

export default forwardRef(Card);
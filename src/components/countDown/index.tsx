import React, {forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, useState} from 'react'
import Text from "../text";
import {leadingZeros} from "../../utils/numer";

export interface CountDownPropsRef {
    reset: () => void;
    start: () => void;
}

interface CountDownProps {
    seconds: number;
    onFinish: () => void;
}

enum CountDownState {
    Idle,
    Counting
}

const CountDown: ForwardRefRenderFunction<CountDownPropsRef, CountDownProps> =
    ({
         seconds: initialSeconds,
         onFinish
     }, ref) => {

        const [seconds, setSeconds] = useState(initialSeconds);
        const [state, setState] = useState(CountDownState.Idle);

        const timeout = useRef<NodeJS.Timeout | null>(null);

        useImperativeHandle(ref, () => ({
            reset: () => {
                setState(CountDownState.Idle)
                setSeconds(initialSeconds)
            },
            start: () => setState(CountDownState.Counting),
        }));

        useEffect(() => {
            return () => {
                clearTimeoutRef()
            };
        });

        useEffect(() => {
            CountDownState.Counting === state && loop()
        }, [state])

        useEffect(() => {
            if (state === CountDownState.Idle) {
                clearTimeoutRef()
                return
            }
            if (seconds === 0) {
                onFinish()
                clearTimeoutRef()
            } else {
                loop()
            }
        }, [seconds, state])

        const clearTimeoutRef = () => timeout.current && clearTimeout(timeout.current);

        const loop = () => {
            clearTimeoutRef()
            timeout.current = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
            }, 1000)
        }

        return <Text remSize={1.4}>Remaining time: {leadingZeros(seconds)}</Text>
    }

export default forwardRef(CountDown);
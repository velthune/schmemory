import {useEffect, useRef} from "react";

export const usePrevious = <T extends any>(value: T) => {
    const ref = useRef<T>()
    useEffect(() => void (ref.current = value), [value])
    return ref.current
}

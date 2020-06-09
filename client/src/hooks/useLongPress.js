import { useState, useEffect, useCallback } from 'react';

export default (callback = () => {}, ms = 1000) => {
    const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
        let timerId;
        if (startLongPress) {
            timerId = setTimeout(callback, ms);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [callback, ms, startLongPress]);

    const start = useCallback(() => {
        setStartLongPress(true);
    }, []);
    const stop = useCallback(() => {
        setStartLongPress(false);
    }, []);

    return {
        isLongPressing: startLongPress,
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
}
import { useEffect } from "react";

export function useOutsideClick(ref: React.RefObject<HTMLDivElement | null>, callback: Function) {
    useEffect(() => {
        const listener = (event: any) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            callback(event);
        };

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                callback(event);
            }
        }

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, callback]);
};
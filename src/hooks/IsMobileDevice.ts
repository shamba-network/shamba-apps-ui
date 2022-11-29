import { useEffect, useState } from "react";

export const useIsMobileDevice = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const onWindowResize = () => setWidth(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', onWindowResize)
        return () => window.removeEventListener('resize', onWindowResize)
    }, []);

    return { isMobile: (width <= 768) }
}

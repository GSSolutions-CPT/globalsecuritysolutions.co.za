'use client'

import { GoogleAnalytics } from "@next/third-parties/google";
import { useState, useEffect } from "react";

export const DeferredAnalytics = ({ gaId }: { gaId: string }) => {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        // Delay GA loading by 4 seconds to prioritize LCP/TBT
        const timer = setTimeout(() => setShouldLoad(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    if (!shouldLoad) return null;

    return <GoogleAnalytics gaId={gaId} />;
};

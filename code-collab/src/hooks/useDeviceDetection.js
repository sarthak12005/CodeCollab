import { useState, useEffect } from 'react';

const useDeviceDetection = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        screenWidth: 0,
        screenHeight: 0,
        orientation: 'portrait'
    });

    useEffect(() => {
        const updateDeviceInfo = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Device type detection based on screen width
            const isMobile = width < 768;
            const isTablet = width >= 768 && width < 1024;
            const isDesktop = width >= 1024;
            
            // Orientation detection
            const orientation = width > height ? 'landscape' : 'portrait';
            
            // Additional mobile detection using user agent
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            
            // Touch capability detection
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            setDeviceInfo({
                isMobile: isMobile || (isMobileDevice && width < 1024),
                isTablet: isTablet && !isMobileDevice,
                isDesktop: isDesktop && !isMobileDevice,
                screenWidth: width,
                screenHeight: height,
                orientation,
                isTouchDevice,
                isMobileDevice,
                // Specific breakpoints
                isSmallMobile: width < 480,
                isMediumMobile: width >= 480 && width < 768,
                isSmallTablet: width >= 768 && width < 900,
                isLargeTablet: width >= 900 && width < 1024,
                isSmallDesktop: width >= 1024 && width < 1280,
                isLargeDesktop: width >= 1280
            });
        };

        // Initial detection
        updateDeviceInfo();

        // Listen for resize events
        window.addEventListener('resize', updateDeviceInfo);
        window.addEventListener('orientationchange', updateDeviceInfo);

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateDeviceInfo);
            window.removeEventListener('orientationchange', updateDeviceInfo);
        };
    }, []);

    return deviceInfo;
};

export default useDeviceDetection;

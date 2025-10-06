import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Smartphone, ArrowLeft, Code, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';

const MobileRestrictionPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme.bg.primary}`}>
            <Header />
            
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
                <div className={`max-w-md w-full ${theme.bg.secondary} rounded-2xl ${theme.shadow.lg} p-8 text-center`}>
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className={`p-4 ${theme.bg.tertiary} rounded-full`}>
                            <AlertTriangle className={`w-12 h-12 ${theme.text.warning}`} />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>
                        Desktop Required
                    </h1>

                    {/* Description */}
                    <p className={`${theme.text.secondary} mb-6 leading-relaxed`}>
                        The coding environment requires a larger screen for the best experience. 
                        Please access this page from a desktop or laptop computer.
                    </p>

                    {/* Device Icons */}
                    <div className="flex justify-center items-center gap-8 mb-8">
                        <div className="text-center">
                            <div className={`p-3 ${theme.bg.tertiary} rounded-lg mb-2`}>
                                <Smartphone className={`w-8 h-8 ${theme.text.error}`} />
                            </div>
                            <span className={`text-sm ${theme.text.error} font-medium`}>Mobile</span>
                        </div>
                        
                        <div className={`w-8 h-px ${theme.border.primary}`}></div>
                        
                        <div className="text-center">
                            <div className={`p-3 ${theme.bg.tertiary} rounded-lg mb-2`}>
                                <Monitor className={`w-8 h-8 ${theme.text.success}`} />
                            </div>
                            <span className={`text-sm ${theme.text.success} font-medium`}>Desktop</span>
                        </div>
                    </div>

                    {/* Features that require desktop */}
                    <div className={`${theme.bg.tertiary} rounded-lg p-4 mb-6`}>
                        <h3 className={`text-sm font-semibold ${theme.text.primary} mb-3`}>
                            Desktop Features:
                        </h3>
                        <div className="space-y-2 text-left">
                            <div className="flex items-center gap-2">
                                <Code className={`w-4 h-4 ${theme.text.accent}`} />
                                <span className={`text-sm ${theme.text.secondary}`}>Full code editor</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Monitor className={`w-4 h-4 ${theme.text.accent}`} />
                                <span className={`text-sm ${theme.text.secondary}`}>Split-screen layout</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Code className={`w-4 h-4 ${theme.text.accent}`} />
                                <span className={`text-sm ${theme.text.secondary}`}>Real-time collaboration</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/problems')}
                            className={`w-full px-6 py-3 ${theme.button.primary} rounded-lg font-medium transition-all duration-200`}
                        >
                            Browse Problems
                        </button>
                        
                        <button
                            onClick={() => navigate(-1)}
                            className={`w-full px-6 py-3 ${theme.button.secondary} rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className={`mt-6 p-3 ${theme.bg.primary} rounded-lg`}>
                        <p className={`text-xs ${theme.text.tertiary}`}>
                            You can still browse problems, view solutions, and access other features on mobile.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileRestrictionPage;

import { useTheme } from '../../context/ThemeContext';

const ProblemDescription = ({ problem }) => {
    const { theme } = useTheme();

    if (!problem) {
        return (
            <div className={`h-full overflow-y-auto px-4 py-3 ${theme.bg.secondary}`}>
                <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
                        <p className={`text-xs ${theme.text.secondary}`}>Loading problem...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`h-full overflow-y-auto px-4 py-3 ${theme.bg.secondary}`} style={{ fontSize: '14px' }}>
            <div className="space-y-4">
                {/* Description */}
                <div className={`${theme.text.secondary} leading-relaxed`}>
                    <p className="text-sm">{problem.description}</p>
                </div>

                {/* Examples */}
                {problem.examples?.length > 0 && (
                    <div className="space-y-3">
                        {problem.examples.map((example, index) => (
                            <div key={index}>
                                <p className={`text-sm font-semibold ${theme.text.primary} mb-2`}>
                                    Example {index + 1}:
                                </p>
                                <div className={`${theme.bg.tertiary} rounded-lg p-3 space-y-1 border ${theme.border.primary}`}>
                                    <div className="font-mono text-xs">
                                        <span className={`${theme.text.primary} font-semibold`}>Input:</span>{' '}
                                        <span className={theme.text.secondary}>{example.input}</span>
                                    </div>
                                    <div className="font-mono text-xs">
                                        <span className={`${theme.text.primary} font-semibold`}>Output:</span>{' '}
                                        <span className={theme.text.secondary}>{example.output}</span>
                                    </div>
                                    {example.explanation && (
                                        <div className="font-mono text-xs pt-1">
                                            <span className={`${theme.text.primary} font-semibold`}>Explanation:</span>{' '}
                                            <span className={`${theme.text.secondary} font-sans`}>{example.explanation}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Constraints */}
                {problem.constraints?.length > 0 && (
                    <div>
                        <p className={`text-sm font-semibold ${theme.text.primary} mb-2`}>Constraints:</p>
                        <ul className={`space-y-1 ${theme.text.secondary}`}>
                            {problem.constraints.map((constraint, index) => (
                                <li key={index} className="flex items-start gap-2 text-xs">
                                    <span className="mt-1.5">•</span>
                                    <span className="font-mono">{constraint}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProblemDescription;

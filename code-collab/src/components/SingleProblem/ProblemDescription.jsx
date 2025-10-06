
import { useTheme } from '../../context/ThemeContext';

const ProblemDescription = ({ problem }) => {
    const { theme } = useTheme();

    if (!problem) {
        return (
            <div className={`h-full overflow-y-auto p-6 ${theme.bg.secondary}`}>
                <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
                        <p className={`${theme.text.secondary}`}>Loading problem description...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`h-full overflow-y-auto p-6 ${theme.bg.secondary}`}>
            <div className="space-y-8">
                {/* Description */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <h2 className={`text-lg font-bold ${theme.text.primary}`}>Description</h2>
                    </div>
                    <div className={`${theme.text.secondary} leading-relaxed space-y-4`}>
                        <p className="text-base">{problem.description}</p>
                    </div>
                </div>

                {/* Examples */}
                {problem.examples?.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <h3 className={`text-lg font-bold ${theme.text.primary}`}>Examples</h3>
                        </div>
                        <div className="space-y-4">
                            {problem.examples.map((example, index) => (
                                <div key={index} className={`${theme.bg.tertiary} rounded-lg p-5 border ${theme.border.primary} shadow-sm`}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <span className={`text-sm font-semibold ${theme.text.primary}`}>
                                            Example {index + 1}
                                        </span>
                                    </div>
                                    <div className="space-y-3 font-mono text-sm">
                                        <div className={`${theme.bg.primary} rounded p-3 border ${theme.border.primary}`}>
                                            <div className="flex items-start gap-2">
                                                <span className="text-blue-500 font-semibold min-w-fit">Input:</span>
                                                <span className={`${theme.text.primary} break-all`}>{example.input}</span>
                                            </div>
                                        </div>
                                        <div className={`${theme.bg.primary} rounded p-3 border ${theme.border.primary}`}>
                                            <div className="flex items-start gap-2">
                                                <span className="text-green-500 font-semibold min-w-fit">Output:</span>
                                                <span className={`${theme.text.primary} break-all`}>{example.output}</span>
                                            </div>
                                        </div>
                                        {example.explanation && (
                                            <div className={`${theme.bg.primary} rounded p-3 border ${theme.border.primary}`}>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-yellow-500 font-semibold min-w-fit">Explanation:</span>
                                                    <span className={`${theme.text.secondary} font-sans text-sm leading-relaxed`}>
                                                        {example.explanation}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Constraints */}
                {problem.constraints?.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <h3 className={`text-lg font-bold ${theme.text.primary}`}>Constraints</h3>
                        </div>
                        <div className={`${theme.bg.tertiary} rounded-lg p-5 border ${theme.border.primary} shadow-sm`}>
                            <ul className={`text-sm ${theme.text.secondary} space-y-3`}>
                                {problem.constraints.map((constraint, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span className="font-mono">{constraint}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Tags */}
                {problem.tags && problem.tags.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <h3 className={`text-lg font-bold ${theme.text.primary}`}>Tags</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {problem.tags.map((tag, index) => (
                                <span key={index} className={`px-3 py-1 rounded-full text-xs font-medium ${theme.bg.tertiary} ${theme.text.secondary} border ${theme.border.primary}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDescription;

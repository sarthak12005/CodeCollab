

const ProblemDescription = ({ problem }) => {
    if (!problem) return null;

    return (
        <div className="h-full overflow-y-auto p-6 bg-slate-800">
            <div className="space-y-6">
                {/* Description */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-white">Problem Description</h2>
                    <div className="text-gray-300 leading-relaxed space-y-4">
                        <p>{problem.description}</p>
                    </div>
                </div>

                {/* Examples */}
                {problem.examples?.length > 0 && (
                    <div>
                        <h3 className="text-md font-semibold mb-4 text-white">Examples</h3>
                        <div className="space-y-4">
                            {problem.examples.map((example, index) => (
                                <div key={index} className="bg-slate-700 rounded-lg p-4">
                                    <p className="text-sm font-semibold text-white mb-3">
                                        Example {index + 1}:
                                    </p>
                                    <div className="text-sm space-y-2 font-mono">
                                        <div>
                                            <span className="text-blue-400">Input:</span>{' '}
                                            <span className="text-gray-300">{example.input}</span>
                                        </div>
                                        <div>
                                            <span className="text-green-400">Output:</span>{' '}
                                            <span className="text-gray-300">{example.output}</span>
                                        </div>
                                        {example.explanation && (
                                            <div className="pt-2">
                                                <span className="text-yellow-400">Explanation:</span>{' '}
                                                <span className="text-gray-300">{example.explanation}</span>
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
                        <h3 className="text-md font-semibold mb-4 text-white">Constraints</h3>
                        <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                            {problem.constraints.map((constraint, index) => (
                                <li key={index}>{constraint}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDescription;

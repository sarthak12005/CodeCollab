import { useRef, useEffect } from 'react';

const SimpleCodeEditor = ({ code, setCode, language }) => {
    const textareaRef = useRef(null);

    // Handle tab key for indentation and other editor shortcuts
    const handleKeyDown = (e) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (e.key === 'Tab') {
            e.preventDefault();

            if (e.shiftKey) {
                // Shift+Tab: Remove indentation
                const lines = code.split('\n');
                const startLine = code.substring(0, start).split('\n').length - 1;
                const endLine = code.substring(0, end).split('\n').length - 1;

                for (let i = startLine; i <= endLine; i++) {
                    if (lines[i].startsWith('    ')) {
                        lines[i] = lines[i].substring(4);
                    }
                }

                setCode(lines.join('\n'));
            } else {
                // Tab: Add indentation
                const newValue = code.substring(0, start) + '    ' + code.substring(end);
                setCode(newValue);

                // Set cursor position after the tab
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 4;
                }, 0);
            }
        } else if (e.key === 'Enter') {
            // Auto-indent on new line
            const lines = code.substring(0, start).split('\n');
            const currentLine = lines[lines.length - 1];
            const indent = currentLine.match(/^(\s*)/)[1];

            e.preventDefault();
            const newValue = code.substring(0, start) + '\n' + indent + code.substring(end);
            setCode(newValue);

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
            }, 0);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [code]);

    return (
        <div className="h-full bg-slate-900 flex flex-col overflow-hidden hide-scrollbar">
            {/* Editor Header */}
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 font-medium">
                        {language.charAt(0).toUpperCase() + language.slice(1)} Editor
                    </span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">Ready</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Tab: Indent</span>
                    <span>Shift+Tab: Unindent</span>
                    <span>Enter: Auto-indent</span>
                </div>
            </div>
            
            {/* Code Editor */}
            <div className="flex-1 relative overflow-y-scroll hide-scrollbar">
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full bg-slate-900 text-gray-100 font-mono text-sm leading-6 resize-none border-none outline-none "
                    style={{
                        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        tabSize: 4,
                        minHeight: '100%',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        paddingRight: '16px',
                        paddingLeft: `${Math.max(2, code.split('\n').length.toString().length) * 8 + 40}px`
                    }}
                    placeholder={`Write your ${language} code here...`}
                    spellCheck={false}
                />
                
                {/* Line numbers overlay */}
                <div
                    className="absolute left-0 top-0 p-4 pointer-events-none text-gray-500 font-mono text-sm leading-6 select-none bg-slate-800 border-r border-slate-700"
                    style={{ width: `${Math.max(2, code.split('\n').length.toString().length) * 8 + 24}px` }}
                >
                    {code.split('\n').map((_, index) => (
                        <div key={index} className="h-6 text-right pr-2">
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Footer */}
            <div className="bg-slate-800 border-t border-slate-700 px-4 py-1 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                    <span>Lines: {code.split('\n').length}</span>
                    <span>Characters: {code.length}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="capitalize">{language}</span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span>UTF-8</span>
                </div>
            </div>
        </div>
    );
};

export default SimpleCodeEditor;

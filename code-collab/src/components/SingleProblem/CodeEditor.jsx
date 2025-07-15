import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
// import '../../utils/monacoSetup'; // Ensure Monaco is set up correctly


const CodeEditor = ({ code, setCode, language }) => {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            // Monaco Editor configuration
            monacoRef.current = monaco.editor.create(editorRef.current, {
                value: code,
                language: language === 'python' ? 'python' : 'javascript',
                theme: 'vs-dark',
                fontSize: 14,
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8
                },
                lineHeight: 20,
                letterSpacing: 0.5,
                wordWrap: 'on',
                contextmenu: true,
                mouseWheelZoom: true,
                cursorBlinking: 'blink',
                cursorSmoothCaretAnimation: true,
                renderWhitespace: 'selection',
                renderControlCharacters: false,
                fontLigatures: true,
                fixedOverflowWidgets: true,
                acceptSuggestionOnEnter: 'on',
                acceptSuggestionOnCommitCharacter: true,
                quickSuggestions: true,
                parameterHints: {
                    enabled: true,
                    cycle: true
                },
                suggestOnTriggerCharacters: true,
                tabCompletion: 'on',
                wordBasedSuggestions: true,
                formatOnType: true,
                formatOnPaste: true,
                dragAndDrop: true,
                links: true,
                colorDecorators: true,
                lightbulb: {
                    enabled: true
                },
                codeActionsOnSave: {
                    'source.organizeImports': true
                },
                bracketPairColorization: {
                    enabled: true
                },
                guides: {
                    bracketPairs: true,
                    bracketPairsHorizontal: true,
                    highlightActiveBracketPair: true,
                    indentation: true,
                    highlightActiveIndentation: true
                }
            });

            // Handle code changes
            monacoRef.current.onDidChangeModelContent(() => {
                setCode(monacoRef.current.getValue());
            });

            // Custom theme for better matching
            monaco.editor.defineTheme('codecollab-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: 'comment', foreground: '6A737D' },
                    { token: 'keyword', foreground: 'F97583' },
                    { token: 'string', foreground: '9ECBFF' },
                    { token: 'number', foreground: '79B8FF' },
                    { token: 'regexp', foreground: '7C3AED' },
                    { token: 'operator', foreground: 'F97583' },
                    { token: 'namespace', foreground: 'FFD33D' },
                    { token: 'type', foreground: '79B8FF' },
                    { token: 'struct', foreground: '79B8FF' },
                    { token: 'class', foreground: 'FFD33D' },
                    { token: 'interface', foreground: '79B8FF' },
                    { token: 'parameter', foreground: 'E1E4E8' },
                    { token: 'variable', foreground: 'E1E4E8' },
                    { token: 'property', foreground: 'E1E4E8' },
                    { token: 'enumMember', foreground: '79B8FF' },
                    { token: 'function', foreground: 'B392F0' },
                    { token: 'member', foreground: 'B392F0' },
                    { token: 'macro', foreground: 'FFD33D' },
                    { token: 'label', foreground: 'FFD33D' },
                    { token: 'constant', foreground: '79B8FF' }
                ],
                colors: {
                    'editor.background': '#0f172a',
                    'editor.foreground': '#e2e8f0',
                    'editorLineNumber.foreground': '#64748b',
                    'editorLineNumber.activeForeground': '#cbd5e1',
                    'editor.selectionBackground': '#374151',
                    'editor.inactiveSelectionBackground': '#1f2937',
                    'editor.lineHighlightBackground': '#1e293b',
                    'editorCursor.foreground': '#60a5fa',
                    'editorWhitespace.foreground': '#374151',
                    'editorIndentGuide.background': '#374151',
                    'editorIndentGuide.activeBackground': '#4b5563',
                    'editor.findMatchBackground': '#fbbf24',
                    'editor.findMatchHighlightBackground': '#f59e0b',
                    'editorBracketMatch.background': '#374151',
                    'editorBracketMatch.border': '#60a5fa',
                    'scrollbarSlider.background': '#374151',
                    'scrollbarSlider.hoverBackground': '#4b5563',
                    'scrollbarSlider.activeBackground': '#6b7280'
                }
            });

            monaco.editor.setTheme('codecollab-dark');
        }

        return () => {
            if (monacoRef.current) {
                monacoRef.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (monacoRef.current) {
            const model = monacoRef.current.getModel();
            if (model) {
                const newLanguage = language === 'python' ? 'python' :
                    language === 'javascript' ? 'javascript' :
                        language === 'java' ? 'java' :
                            language === 'cpp' ? 'cpp' : 'python';

                monaco.editor.setModelLanguage(model, newLanguage);
            }
        }
    }, [language]);

    return (
        <div className="h-full bg-slate-900">
            <div
                ref={editorRef}
                className="w-full h-full"
                style={{ minHeight: '400px' }}
            />
        </div>
    );
};

export default CodeEditor;
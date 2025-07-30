import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
// import '../../utils/monacoSetup'; // Ensure Monaco is set up correctly


const CodeEditor = ({ code, setCode, language }) => {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    // Language mapping for Monaco Editor - using safe language identifiers
    const languageMap = {
        'python': 'python',
        'javascript': 'javascript',
        'java': 'java',
        'cpp': 'cpp',
        'c': 'c'
    };

    // Get Monaco language with safe fallback
    const getMonacoLanguage = (lang) => {
        // Use simple text mode for potentially problematic languages
        if (lang === 'cpp' || lang === 'c') {
            return 'text'; // Avoid C++ language mode issues
        }
        return languageMap[lang] || 'text';
    };

    useEffect(() => {
        if (editorRef.current) {
            try {
                // Monaco Editor configuration - simplified to avoid issues
                monacoRef.current = monaco.editor.create(editorRef.current, {
                    value: code,
                    language: getMonacoLanguage(language),
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
                    renderWhitespace: 'selection',
                    renderControlCharacters: false,
                    fontLigatures: true,
                    fixedOverflowWidgets: true
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
            } catch (error) {
                // Monaco editor creation failed
            }
        }

        return () => {
            if (monacoRef.current) {
                monacoRef.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        // Always recreate editor when language changes to avoid Monaco language switching issues
        if (monacoRef.current && editorRef.current) {
            const currentValue = monacoRef.current.getValue();
            monacoRef.current.dispose();

            // Create new editor with the new language
            setTimeout(() => {
                if (editorRef.current) {
                    try {
                        monacoRef.current = monaco.editor.create(editorRef.current, {
                            value: currentValue,
                            language: getMonacoLanguage(language),
                            theme: 'codecollab-dark',
                            fontSize: 14,
                            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
                            lineNumbers: 'on',
                            roundedSelection: false,
                            scrollBeyondLastLine: false,
                            readOnly: false,
                            automaticLayout: true,
                            minimap: { enabled: false },
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
                            fixedOverflowWidgets: true
                        });

                        monacoRef.current.onDidChangeModelContent(() => {
                            setCode(monacoRef.current.getValue());
                        });
                    } catch (error) {
                        // Monaco editor creation failed
                    }
                }
            }, 50);
        }
    }, [language]);

    return (
        <div className="h-full bg-slate-900" key={`editor-${language}`}>
            <div
                ref={editorRef}
                className="w-full h-full"
                style={{ minHeight: '400px' }}
            />
        </div>
    );
};

export default CodeEditor;
import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../context/ThemeContext';

const MonacoCodeEditor = ({ code, setCode, language }) => {
    const editorRef = useRef(null);

    // Map our language IDs to Monaco language IDs
    const getMonacoLanguage = (lang) => {
        const languageMap = {
            'python': 'python',
            'javascript': 'javascript',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c'
        };
        return languageMap[lang] || 'python';
    };

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        
        // Configure editor options (disable some features that can cause cancelled async work when models switch)
        editor.updateOptions({
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'off',
            folding: true,
            glyphMargin: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            padding: { top: 16, bottom: 16 },
            // reduce background async contributions that may be cancelled when models are swapped or disposed
            occurrencesHighlight: false,
            selectionHighlight: false,
        });
    };

    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
        theme: 'vs-dark', // Always use dark theme
        // disable occurrence/selection highlights to avoid Monaco producing "Canceled" async rejections during model switches
        occurrencesHighlight: false,
        selectionHighlight: false,
    };

    // Attach a scoped handler to silence harmless "Canceled" unhandled promise rejections
    // emitted by Monaco when models are disposed or switched rapidly.
    // We only prevent default for errors that are clearly the Monaco "Canceled" token.
    useEffect(() => {
        const handler = (e) => {
            try {
                const reason = e && e.reason;
                if (
                    reason === 'Canceled' ||
                    (reason && (reason.message === 'Canceled' || String(reason).includes('Canceled')))
                ) {
                    e.preventDefault(); // silence the console noise
                }
            } catch (err) {
                // ignore any inspection errors here
            }
        };
        window.addEventListener('unhandledrejection', handler);
        return () => window.removeEventListener('unhandledrejection', handler);
    }, []);

    return (
        <div className="h-full w-full bg-slate-900">
            <Editor
                height="100%"
                language={getMonacoLanguage(language)}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                options={editorOptions}
                loading={
                    <div className="flex items-center justify-center h-full bg-slate-900">
                        <div className="text-gray-400">Loading editor...</div>
                    </div>
                }
            />
        </div>
    );
};

export default MonacoCodeEditor;

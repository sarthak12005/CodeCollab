import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../context/ThemeContext';

const MonacoCodeEditor = ({ code, setCode, language }) => {
    const editorRef = useRef(null);
    const { theme } = useTheme();

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
        
        // Configure editor options
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
            padding: { top: 16, bottom: 16 }
        });
    };

    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
        theme: theme.name === 'dark' ? 'vs-dark' : 'light',
    };

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

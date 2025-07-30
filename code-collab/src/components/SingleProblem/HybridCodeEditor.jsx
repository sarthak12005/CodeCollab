import { useState, useEffect } from 'react';
import SimpleCodeEditor from './SimpleCodeEditor';

// Hybrid editor that tries Monaco first, falls back to simple editor
const HybridCodeEditor = ({ code, setCode, language }) => {
    const [useSimpleEditor, setUseSimpleEditor] = useState(false);
    const [MonacoEditor, setMonacoEditor] = useState(null);

    useEffect(() => {
        // Try to load Monaco Editor
        const loadMonaco = async () => {
            try {
                const { default: CodeEditor } = await import('./CodeEditor');
                setMonacoEditor(() => CodeEditor);
            } catch (error) {
                console.warn('Monaco Editor failed to load, using simple editor:', error);
                setUseSimpleEditor(true);
            }
        };

        // Check if we should use simple editor based on previous errors
        const hasMonacoErrors = localStorage.getItem('monaco-errors') === 'true';
        if (hasMonacoErrors) {
            setUseSimpleEditor(true);
        } else {
            loadMonaco();
        }
    }, []);

    // Error boundary for Monaco Editor
    const handleMonacoError = () => {
        console.warn('Monaco Editor encountered an error, switching to simple editor');
        localStorage.setItem('monaco-errors', 'true');
        setUseSimpleEditor(true);
    };

    // If we should use simple editor or Monaco failed to load
    if (useSimpleEditor || !MonacoEditor) {
        return (
            <div className="h-full">
                <SimpleCodeEditor 
                    code={code} 
                    setCode={setCode} 
                    language={language} 
                />
            </div>
        );
    }

    // Try to use Monaco Editor with error boundary
    try {
        return (
            <div className="h-full">
                <MonacoEditor 
                    code={code} 
                    setCode={setCode} 
                    language={language} 
                />
            </div>
        );
    } catch (error) {
        handleMonacoError();
        return (
            <div className="h-full">
                <SimpleCodeEditor 
                    code={code} 
                    setCode={setCode} 
                    language={language} 
                />
            </div>
        );
    }
};

export default HybridCodeEditor;

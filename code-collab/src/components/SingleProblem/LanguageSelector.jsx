import React from 'react';
import { ChevronDown } from 'lucide-react';

const LanguageSelector = ({ language, setLanguage }) => {
    const languages = [
        { id: 'python', name: 'Python', extension: '.py' },
        { id: 'javascript', name: 'JavaScript', extension: '.js' },
        { id: 'java', name: 'Java', extension: '.java' },
        { id: 'cpp', name: 'C++', extension: '.cpp' },
        { id: 'c', name: 'C', extension: '.c' },
        { id: 'go', name: 'Go', extension: '.go' },
        { id: 'rust', name: 'Rust', extension: '.rs' },
        { id: 'typescript', name: 'TypeScript', extension: '.ts' }
    ];

    const currentLanguage = languages.find(lang => lang.id === language) || languages[0];

    return (
        <div className="relative">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8 hover:bg-slate-600 transition-colors cursor-pointer"
            >
                {languages.map((lang) => (
                    <option key={lang.id} value={lang.id} className="bg-slate-700 text-white">
                        {lang.name}
                    </option>
                ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
            </div>
        </div>
    );
};

export default LanguageSelector;
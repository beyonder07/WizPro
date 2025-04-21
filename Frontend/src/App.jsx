import { useState, useEffect, useRef } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from './axiosConfig';
import './App.css';
import Header from './components/Header';
import { FaCode, FaLightbulb, FaClock, FaCheckCircle, FaExclamationTriangle, 
         FaRocket, FaDownload, FaUpload, FaCopy, FaSearch, FaUndo, FaRedo } from 'react-icons/fa';

// Core Prism requirements
import "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

// Other languages that depend on the core
import "prismjs/components/prism-markup";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-php";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-go";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-sql";

// Plugins
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

prism.languages.plain = {
  'text': {
    pattern: /[\s\S]+/,
    alias: 'text'
  }
};

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('review');
  const [suggestions, setSuggestions] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [fontSize, setFontSize] = useState(14);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'jsx', name: 'React JSX' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'python', name: 'Python' },
    { id: 'css', name: 'CSS' },
    { id: 'java', name: 'Java' },
    { id: 'php', name: 'PHP' },
    { id: 'rust', name: 'Rust' },
    { id: 'go', name: 'Go' },
    { id: 'csharp', name: 'C#' },
    { id: 'sql', name: 'SQL' }
  ];

  const highlight = (code) => {
    try {
      if (!prism.languages[language]) {
        console.warn(`Language ${language} not loaded, falling back to plain text`);
        return prism.highlight(code, prism.languages.plain, 'plain');
      }

      try {
        return prism.highlight(code, prism.languages[language], language);
      } catch (highlightError) {
        console.warn(`Highlighting failed for ${language}, falling back to plain text`, highlightError);
        return prism.highlight(code, prism.languages.plain, 'plain');
      }
    } catch (error) {
      console.error('Highlighting error:', error);
      return code;
    }
  };

  const isEditorInitialized = useRef(false);

  useEffect(() => {
    if (!isEditorInitialized.current) {
      const savedTheme = localStorage.getItem('theme');
      const savedLanguage = localStorage.getItem('language') || 'javascript';
      const savedCode = localStorage.getItem(`code_${savedLanguage}`);
      const savedFontSize = localStorage.getItem('fontSize');

      if (savedTheme === 'dark') {
        setIsDarkMode(true);
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }

      if (savedFontSize) {
        setFontSize(parseInt(savedFontSize));
      }

      setLanguage(savedLanguage);
      if (savedCode) {
        setCode(savedCode);
        addToHistory(savedCode);
      } else {
        setCode(codeTemplates[savedLanguage] || codeTemplates.javascript);
        addToHistory(codeTemplates[savedLanguage] || codeTemplates.javascript);
      }

      isEditorInitialized.current = true;
    }
  }, []);

  const addToHistory = (newCode) => {
    if (history.length === 0 || history[history.length - 1] !== newCode) {
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, newCode]);
      setHistoryIndex(newHistory.length);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCode(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCode(history[historyIndex + 1]);
    }
  };

  useEffect(() => {
    localStorage.setItem(`code_${language}`, code);
    localStorage.setItem('language', language);
  }, [code, language]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    
    const savedCode = localStorage.getItem(`code_${newLanguage}`);
    if (savedCode) {
      setCode(savedCode);
      addToHistory(savedCode);
    } else {
      setCode(codeTemplates[newLanguage] || '');
      addToHistory(codeTemplates[newLanguage] || '');
    }
  };

  const codeTemplates = {
    javascript: `function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + item.price;
  }, 0);
}`,
    jsx: `function Welcome() {
  const [name, setName] = useState('Guest');
  
  return (
    <div className="welcome-container">
      <h1>Hello, {name}!</h1>
      <button onClick={() => setName('User')}>
        Set Name
      </button>
    </div>
  );
}`,
    python: `def find_duplicates(numbers):
    seen = set()
    duplicates = []
    
    for num in numbers:
        if num in seen:
            duplicates.append(num)
        else:
            seen.add(num)
            
    return duplicates`,
    css: `.card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}`,
    typescript: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function getUserDisplayName(user: User): string {
  return user.isActive ? user.name : 'Inactive User';
}`,
    java: `public class BinarySearch {
    public static int search(int[] array, int target) {
        int left = 0;
        int right = array.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (array[mid] == target) {
                return mid;
            }
            
            if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
}`,
    php: `<?php
function connectToDatabase($host, $username, $password, $database) {
    try {
        $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        return "Connection failed: " . $e->getMessage();
    }
}
?>`,
    rust: `fn bubble_sort<T: Ord>(arr: &mut [T]) {
    let n = arr.len();
    for i in 0..n {
        for j in 0..n-i-1 {
            if arr[j] > arr[j+1] {
                arr.swap(j, j+1);
            }
        }
    }
}`,
    go: `package main

import "fmt"

func fibonacci(n int) []int {
    fib := make([]int, n)
    fib[0], fib[1] = 0, 1
    
    for i := 2; i < n; i++ {
        fib[i] = fib[i-1] + fib[i-2]
    }
    
    return fib
}

func main() {
    result := fibonacci(10)
    fmt.Println(result)
}`,
    csharp: `using System;
using System.Linq;

class Program {
    static void Main() {
        int[] numbers = { 5, 10, 15, 20, 25 };
        double average = numbers.Average();
        Console.WriteLine($"The average is: {average}");
    }
}`,
    sql: `SELECT 
    customers.name,
    COUNT(orders.id) AS total_orders,
    SUM(orders.amount) AS total_spent
FROM 
    customers
LEFT JOIN 
    orders ON customers.id = orders.customer_id
GROUP BY 
    customers.id
HAVING 
    total_orders > 5
ORDER BY 
    total_spent DESC
LIMIT 10;`
  };

  async function reviewCode() {
    try {
      setIsLoading(true);
      setReview('');
      setSuggestions('');
      
      const response = await axios.post('get-review', { 
        code,
        language
      });
      
      console.log('API response:', response.data); // Debug log
      
      // Process the response data
      const result = {
        review: response.data,
        suggestions: response.data // Using same data for both in this case
      };
      
      setReview(result.review);
      setSuggestions(result.suggestions);
      showToast('success', 'Review completed', 'Your code has been analyzed successfully.');
    } catch (error) {
      console.error('Error reviewing code:', error);
      // Only fall back to mock review if there's a specific API error
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('API error response:', error.response.data);
        showToast('error', 'API Error', error.response.data.message || 'API request failed');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        const mockResult = generateMockReview(code, language);
        setReview(mockResult.review);
        setSuggestions(mockResult.suggestions);
        showToast('warning', 'Using offline review', 'API unavailable - showing mock review');
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
        showToast('error', 'Request Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const generateMockReview = (code, language) => {
    const commonFeedback = {
      javascript: {
        patterns: [
          { regex: /console\.log/g, feedback: "Consider removing console.log statements before production." },
          { regex: /var\s/g, feedback: "Consider using 'let' or 'const' instead of 'var' for better scoping." },
          { regex: /function\s+\w+\(\)/g, feedback: "Good job defining named functions!" },
          { regex: /\/\/\s*TODO/g, feedback: "There are TODO comments that should be addressed." },
          { regex: /if\s*\([^{]+\)\s*\w+/g, feedback: "Consider using curly braces for all if statements for clarity." }
        ],
        general: "Your JavaScript code looks *{quality}*. {suggestions}"
      },
      python: {
        patterns: [
          { regex: /print\(/g, feedback: "Consider using logging instead of print statements in production code." },
          { regex: /^\s*def\s+\w+\(/gm, feedback: "Good job with function definitions." },
          { regex: /except:/g, feedback: "Avoid bare except clauses; specify exceptions to catch." },
          { regex: /#\s*TODO/g, feedback: "There are TODO comments that should be addressed." },
          { regex: /if\s*.+:/g, feedback: "Your conditional statements look well-structured." }
        ],
        general: "Your Python code is *{quality}*. {suggestions}"
      }
    };
    
    let langFeedback = commonFeedback[language] || commonFeedback.javascript;
    
    let issues = [];
    let positives = [];
    
    langFeedback.patterns.forEach(pattern => {
      if (pattern.regex.test(code)) {
        if (pattern.feedback.includes("Good")) {
          positives.push(pattern.feedback);
        } else {
          issues.push(pattern.feedback);
        }
      }
    });
    
    let quality = "well-structured";
    if (issues.length > 3) {
      quality = "needs improvement";
    } else if (issues.length > 0) {
      quality = "generally good with some issues";
    } else if (positives.length > 1) {
      quality = "excellent";
    }
    
    let review = `# Code Review\n\n`;
    review += langFeedback.general.replace("{quality}", quality).replace("{suggestions}", issues.length > 0 ? "Here are some suggestions for improvement:" : "Keep up the good work!");
    
    if (issues.length > 0) {
      review += "\n\n## Issues Identified\n\n";
      issues.forEach((issue, i) => {
        review += `${i+1}. ${issue}\n`;
      });
    }
    
    if (positives.length > 0) {
      review += "\n\n## Positive Aspects\n\n";
      positives.forEach((positive, i) => {
        review += `${i+1}. ${positive}\n`;
      });
    }
    
    review += "\n\n## Code Structure\n\n";
    review += `Your code is ${code.split('\n').length} lines long. `;
    
    if (code.split('\n').length > 20) {
      review += "Consider breaking down larger functions into smaller, more focused ones for better readability.";
    } else {
      review += "The code length is appropriate.";
    }
    
    let suggestionsText = "# Suggested Improvements\n\n";
    
    if (issues.length > 0) {
      suggestionsText += "Here are some specific improvements you could make:\n\n";
      
      if (language === 'javascript') {
        if (issues.some(i => i.includes("console.log"))) {
          suggestionsText += "```javascript\n// Before\nfunction process(data) {\n  console.log('Processing data:', data);\n  return data * 2;\n}\n\n// After\nfunction process(data) {\n  return data * 2;\n}\n```\n\n";
        }
        
        if (issues.some(i => i.includes("var"))) {
          suggestionsText += "```javascript\n// Before\nvar result = 0;\nfor (var i = 0; i < 10; i++) {\n  result += i;\n}\n\n// After\nlet result = 0;\nfor (let i = 0; i < 10; i++) {\n  result += i;\n}\n```\n\n";
        }
      }
      
      if (language === 'python') {
        if (issues.some(i => i.includes("print("))) {
          suggestionsText += "```python\n# Before\ndef process_data(data):\n    print(f\"Processing {data}\")\n    return data * 2\n\n# After\nimport logging\n\ndef process_data(data):\n    logging.debug(f\"Processing {data}\")\n    return data * 2\n```\n\n";
        }
        
        if (issues.some(i => i.includes("except:"))) {
          suggestionsText += "```python\n# Before\ntry:\n    value = get_value()\nexcept:\n    value = default_value\n\n# After\ntry:\n    value = get_value()\nexcept (ValueError, KeyError):\n    value = default_value\n```\n\n";
        }
      }
    } else {
      suggestionsText += "Your code looks good! Here are some optional enhancements you might consider:\n\n";
      
      if (language === 'javascript') {
        suggestionsText += "- Add JSDoc comments for better documentation\n- Consider adding unit tests\n- Think about error handling for edge cases\n";
      } else if (language === 'python') {
        suggestionsText += "- Add docstrings for better documentation\n- Consider adding type hints\n- Add unit tests using pytest\n";
      } else {
        suggestionsText += "- Add more comprehensive documentation\n- Consider adding unit tests\n- Review error handling for completeness\n";
      }
    }
    
    return {
      review: review,
      suggestions: suggestionsText
    };
  };

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleThemeChange = (isDark) => {
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const clearCode = () => {
    addToHistory(code);
    setCode('');
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 0);
  };

  const loadExample = () => {
    addToHistory(code);
    setCode(codeTemplates[language] || codeTemplates.javascript);
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      showToast('success', 'Copied to clipboard', 'Your code has been copied to clipboard.');
    }, (err) => {
      showToast('error', 'Copy failed', 'Failed to copy code to clipboard.');
    });
  };

  const changeFontSize = (delta) => {
    const newSize = Math.max(10, Math.min(24, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setCode(content);
      addToHistory(content);
      
      const extension = file.name.split('.').pop().toLowerCase();
      const extensionMap = {
        'js': 'javascript',
        'jsx': 'jsx',
        'ts': 'typescript',
        'tsx': 'typescript',
        'py': 'python',
        'css': 'css',
        'java': 'java',
        'php': 'php',
        'rs': 'rust',
        'go': 'go',
        'cs': 'csharp',
        'sql': 'sql'
      };
      
      if (extensionMap[extension]) {
        setLanguage(extensionMap[extension]);
      }
      
      showToast('success', 'File loaded', `${file.name} has been loaded successfully.`);
    };
    reader.readAsText(file);
    
    event.target.value = null;
  };

  const downloadCode = () => {
    const langExtensions = {
      'javascript': 'js',
      'jsx': 'jsx',
      'typescript': 'ts',
      'python': 'py',
      'css': 'css',
      'java': 'java',
      'php': 'php',
      'rust': 'rs',
      'go': 'go',
      'csharp': 'cs',
      'sql': 'sql'
    };
    
    const extension = langExtensions[language] || 'txt';
    const filename = `code.${extension}`;
    
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    showToast('success', 'File downloaded', `Code saved as ${filename}.`);
  };

  return (
    <div className={isDarkMode ? 'dark app-container' : 'light app-container'} style={{ width: '100%', overflowX: 'hidden' }}>
      <Header onThemeChange={handleThemeChange} />
      <main style={{ width: '100%', overflowX: 'hidden' }}>
        <div className="container" style={{ width: '100%', maxWidth: '1280px' }}>
          <section className="section text-center fade-in">
            <h1 className="text-3xl font-bold mb-4">AI-Powered Code Review</h1>
            <p className="text-lg text-center max-w-2xl mx-auto text-secondary mb-8">
              Get instant feedback on your code quality, find bugs, and improve your coding skills.
            </p>
          </section>

          <section className="section editor-section">
            <div className="editor-container">
              <div className="code-editor-container">
                <div className="editor-header">
                  <div className="editor-title">
                    <FaCode />
                    <span>Code Editor</span>
                  </div>
                  <div className="editor-tabs">
                    <select 
                      value={language}
                      onChange={handleLanguageChange}
                      className="editor-language-select"
                    >
                      {languages.map(lang => (
                        <option key={lang.id} value={lang.id}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                    <div className="editor-actions">
                      <button 
                        className="editor-action-button" 
                        onClick={() => changeFontSize(-1)}
                        title="Decrease font size"
                      >
                        A-
                      </button>
                      <button 
                        className="editor-action-button" 
                        onClick={() => changeFontSize(1)}
                        title="Increase font size"
                      >
                        A+
                      </button>
                      <button 
                        className="editor-action-button" 
                        onClick={handleUndo}
                        title="Undo"
                        disabled={historyIndex <= 0}
                      >
                        <FaUndo />
                      </button>
                      <button 
                        className="editor-action-button" 
                        onClick={handleRedo}
                        title="Redo"
                        disabled={historyIndex >= history.length - 1}
                      >
                        <FaRedo />
                      </button>
                      <button 
                        className="editor-action-button" 
                        onClick={copyCodeToClipboard}
                        title="Copy code"
                      >
                        <FaCopy />
                      </button>
                      <button 
                        className="editor-action-button" 
                        onClick={() => fileInputRef.current.click()}
                        title="Upload file"
                      >
                        <FaUpload />
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleFileUpload} 
                        accept=".js,.jsx,.ts,.py,.css,.java,.php,.rs,.go,.cs,.sql,.txt"
                      />
                      <button 
                        className="editor-action-button" 
                        onClick={downloadCode}
                        title="Download code"
                      >
                        <FaDownload />
                      </button>
                      <button 
                        className="editor-action-button" 
                        onClick={clearCode}
                        title="Clear code"
                      >
                        Clear
                      </button>
                      <button 
                        className="editor-action-button" 
                        onClick={loadExample}
                        title="Load example"
                      >
                        Example
                      </button>
                    </div>
                  </div>
                </div>

                <div className="code-editor-wrapper" ref={editorRef}>
                  <div className="code-editor line-numbers">
                    <Editor
                      value={code}
                      onValueChange={newCode => {
                        setCode(newCode);
                        addToHistory(newCode);
                      }}
                      highlight={highlight}
                      padding={16}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: `${fontSize}px`,
                        height: '100%',
                        width: '100%',
                        outline: 'none',
                      }}
                      className="editor-textarea"
                      tabSize={2}
                    />
                  </div>
                </div>

                <div className="editor-footer">
                  <div className="editor-stats">
                    <span>{code.split('\n').length} lines</span>
                    <span>{code.length} chars</span>
                  </div>
                  <button
                    onClick={reviewCode}
                    className="review-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="spinner"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <FaRocket />
                        <span>Review Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="code-editor-container">
                <div className="editor-header">
                  <div className="editor-title">
                    <FaLightbulb />
                    <span>AI Review</span>
                  </div>
                  <div className="editor-tabs">
                    <button 
                      className={`editor-tab ${activeTab === 'review' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('review')}
                    >
                      Review
                    </button>
                    <button 
                      className={`editor-tab ${activeTab === 'suggestions' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('suggestions')}
                    >
                      Suggestions
                    </button>
                  </div>
                </div>

                <div className="markdown-preview">
  {isLoading ? (
    <div className="loading-container">
      <div className="skeleton" style={{ height: '24px', width: '60%', marginBottom: '16px' }}></div>
      <div className="skeleton" style={{ height: '16px', width: '90%', marginBottom: '12px' }}></div>
      <div className="skeleton" style={{ height: '16px', width: '80%', marginBottom: '12px' }}></div>
      <div className="skeleton" style={{ height: '16px', width: '85%', marginBottom: '24px' }}></div>
      <div className="skeleton" style={{ height: '100px', width: '100%', marginBottom: '16px' }}></div>
      <div className="skeleton" style={{ height: '16px', width: '70%', marginBottom: '12px' }}></div>
      <div className="skeleton" style={{ height: '16px', width: '75%', marginBottom: '12px' }}></div>
    </div>
  ) : activeTab === 'review' ? (
    review ? (
      <Markdown
        rehypePlugins={[rehypeHighlight]}
        className="prose dark:prose-invert max-w-none"
      >
        {review}
      </Markdown>
    ) : (
      <div className="empty-state">
        <div className="empty-state-icon">
          <FaCode size={32} />
        </div>
        <h3 className="empty-state-title">No review yet</h3>
        <p className="empty-state-description">
          Write or paste your code in the editor, then click "Review Code" to get AI-powered feedback.
        </p>
      </div>
    )
  ) : activeTab === 'suggestions' ? (
    suggestions ? (
      <Markdown
        rehypePlugins={[rehypeHighlight]}
        className="prose dark:prose-invert max-w-none"
      >
        {suggestions}
      </Markdown>
    ) : (
      <div className="empty-state">
        <div className="empty-state-icon">
          <FaLightbulb size={32} />
        </div>
        <h3 className="empty-state-title">No suggestions yet</h3>
        <p className="empty-state-description">
          Get code suggestions by clicking "Review Code" to analyze your code.
        </p>
      </div>
    )
  ) : null}
</div>
              </div>
            </div>
          </section>

          <section className="section" id="features">
            <h2 className="text-2xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="features">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaLightbulb />
                </div>
                <h3 className="feature-title">Smart Analysis</h3>
                <p className="feature-description">
                  Advanced AI analyzes your code for bugs, performance issues, and best practices in real-time.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaCode />
                </div>
                <h3 className="feature-title">Multi-language Support</h3>
                <p className="feature-description">
                  Support for JavaScript, TypeScript, Python, React, CSS, Java and more programming languages.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaClock />
                </div>
                <h3 className="feature-title">Instant Feedback</h3>
                <p className="feature-description">
                  Get immediate, detailed feedback to help you write better code faster.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
          </div>
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-message">{toast.message}</div>
          </div>
          <button className="toast-close" onClick={() => setToast(null)}>×</button>
        </div>
      )}
    </div>
  );
}

export default App;
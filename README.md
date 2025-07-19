# 🚀 [WiZpro – AI-Powered Code Review](https://wiz-pro-g5pc.vercel.app/)

> **Live Demo:** [https://wiz-pro-g5pc.vercel.app/](https://wiz-pro-g5pc.vercel.app/)

---

## ✨ Overview
WiZpro is an AI-powered code review platform that gives you instant feedback on your code quality, helps you find bugs, and improves your coding skills with personalized AI guidance. Built with Next.js (frontend) and Node.js/Express (backend), WiZpro leverages Google Gemini AI for smart, actionable code reviews.

---

## 🧩 Features
- **⚡ Instant Analysis:** Get immediate feedback on your code quality and improvements.
- **🐞 Bug Detection:** Automatically identify potential bugs and security vulnerabilities.
- **📈 Skill Improvement:** Learn best practices and improve your coding skills with AI guidance.
- **🌗 Dark/Light Mode:** Toggle between beautiful dark and light themes.
- **📝 Multi-language Support:** Review code in JavaScript, Python, C, C++, and more.
- **🎨 Interactive UI:** Modern, responsive, and user-friendly interface.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Google Gemini API
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)

---

## 🚀 Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/beyonder07/WizPro.git
cd WizPro
```

### 2. **Setup Backend**
```bash
cd BackEnd
npm install
```
- Create a `.env` file in `BackEnd/`:
  ```env
  GOOGLE_GEMINI_KEY=your-google-gemini-api-key
  PORT=5000
  ```
- Start the backend:
  ```bash
  node server.js
  ```

### 3. **Setup Frontend**
```bash
cd ../Frontend
npm install
```
- Create a `.env.local` file in `Frontend/`:
  ```env
  NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
  ```
- Start the frontend:
  ```bash
  npm run dev
  ```

---

## 🌐 Deployment
- **Frontend:** Deployed on [Vercel](https://wiz-pro-g5pc.vercel.app/)
- **Backend:** Deploy on [Render](https://render.com/) or [Railway](https://railway.app/)

### **Update Environment Variables in Vercel/Render**
- `NEXT_PUBLIC_BACKEND_URL` (Frontend)
- `GOOGLE_GEMINI_KEY` (Backend)

---

## 📦 Environment Variables
| Variable                  | Location   | Description                        |
|--------------------------|------------|------------------------------------|
| `GOOGLE_GEMINI_KEY`      | Backend    | Google Gemini API Key              |
| `PORT`                   | Backend    | Backend server port (default 5000) |
| `NEXT_PUBLIC_BACKEND_URL`| Frontend   | URL of deployed backend API        |

---

## 🖥️ Usage
1. Paste or write your code in the editor.
2. Select the language and click **Review Code**.
3. Instantly receive AI-powered feedback, bug detection, and improvement suggestions.

---

## 📚 Documentation
- [Features](https://wiz-pro-g5pc.vercel.app/features)
- [How It Works](https://wiz-pro-g5pc.vercel.app/how-it-works)
- [Pricing](https://wiz-pro-g5pc.vercel.app/pricing)
- [Documentation](https://wiz-pro-g5pc.vercel.app/documentation)

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License
[MIT](LICENSE)

---

> **Deployed at:** [https://wiz-pro-g5pc.vercel.app/](https://wiz-pro-g5pc.vercel.app/) 
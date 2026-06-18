# Im7o (إيمحو) - The Ultimate Party Games Platform 𓋹

The **Im7o** platform is an open-source Party Games platform that allows anyone to invent and add their own games.
The platform relies on an innovative architecture, acting as a **Custom Git-Backed CMS**: Any game created via the platform's dashboard automatically turns into a draft Pull Request on Github, and the creator is notified via email. Once the administration reviews the code and approves (Merge), an acceptance email is sent, and the game becomes instantly available to all players!

## Key Features 🌟

- **Offline Mode (العمل دون اتصال)**: The app works as a Progressive Web App (PWA), meaning you can play smoothly in places without internet, with game content updating automatically in the background.
- **Bilingual i18n (نظام ثنائي اللغة)**: The platform's UI supports both Arabic and English with Runtime Switching to expand the base of players and content creators.
- **Egyptian Aesthetic UI (تصميم فرعوني ديناميكي)**: Elegant interfaces with sophisticated visual effects inspired by Egyptian antiquities, featuring golden touches and micro-animations that bring the gaming experience to life.
- **Interactive Landing Page**: A welcoming page that explains how the platform works with smooth navigation to start playing or explore the source code.
- **Multiple Game Engines (محركات ألعاب متعددة)**: The platform has an advanced **Engines** system that allows for various gameplay mechanics:
  - `Classic`: Turn-based text challenges.
  - `MCQ / Trivia`: Question and Answer (hides the answer until the host decides to reveal it).
  - `Taboo`: Forbidden words (displays the word to guess along with a list of forbidden words).
  - `Hot Potato`: (البطاطس الساخنة) Pass the phone with an accelerating bomb timer.
  - `Imposter / Spyfall`: (الجاسوس) Pass the phone to see secret roles, then interrogate.
- **Automated CMS via Github**: The backend automatically pushes additions as Pull Requests the moment they are submitted, preventing any data loss.
- **Workflow & Email Alerts**: 
  - When a creator submits a new game or an Extension Pack via the UI, the system automatically creates a Pull Request and sends an email to the creator (asking them to wait).
  - The administration can inspect the game, merge it, and approve it.
  - Upon approval, the system sends a beautifully designed acceptance email to the creator.

---

## 🛠️ Architecture (كيف تعمل المنصة؟)

The project consists of two parts:
1. **Frontend (Next.js)**: The main UI, including play screens, the Engine dispatcher, PWA, and dashboards. It reads games directly from JSON files in `src/data/games/`.
2. **Backend (FastAPI)**: A lightweight, independent service to manage OAuth operations, receive dashboard submissions, automatically communicate with the Github API to create Pull Requests in the background, and send email alerts.

---

## 🤝 Contributing (المساهمة في المشروع)

We highly welcome your contributions! We have divided the contribution guidelines to make it easier:

### 1. Contributing Games (For Content Creators & Authors)
You can contribute and add games in two ways:
- **Directly from the platform**: Using the Creator Dashboard, which will automatically push the game to Github.
- **Manually via Github (Highly Recommended! - موصى به جداً!)**: For tech-savvy users and developers. If you know how to handle JSON files and Pull Requests, we highly recommend adding your creations directly via our GitHub repository. You will have 100% control, your edits will be processed much faster, and you will get an official Contributor badge in the project!

👉 **[Read the full guide for adding games here (CONTRIBUTING-GAMES.md)](./docs/CONTRIBUTING-GAMES.md)**

### 2. Code Contributions (For Developers)
If you want to develop a new game Engine with an innovative idea, or improve the current platform interfaces, we would be absolutely thrilled!

👉 **[Read the full code contribution guide here (CONTRIBUTING-CODE.md)](./docs/CONTRIBUTING-CODE.md)**

---

## 🚀 Local Development (تشغيل المشروع محلياً)

### Requirements
- Node.js (for Frontend)
- Python (for Backend)
- A Github account and a Personal Access Token to push Pull Requests.
- An SMTP server setup to send emails (required for the Backend).

### Running the App
1. Clone the repository and install frontend dependencies (`npm install`).
2. Run the frontend via `npm run dev`.
3. Navigate to the backend folder, install Python dependencies, then run it via Uvicorn (`uvicorn main:app --reload`).
4. Make sure to set up the `.env` file in the backend to include the `GITHUB_TOKEN`, `SMTP_SERVER`, and other configurations.

### Troubleshooting (استكشاف الأخطاء وإصلاحها)
- **Google OAuth Login Issue (redirects to landing page)**: 
  If you face an `ExpiredTokenError` due to your local machine's time difference with Google's servers, or an `InsecureTransportError` when using an IP instead of localhost:
  - Ensure `os.environ['AUTHLIB_INSECURE_TRANSPORT'] = '1'` is added in the backend (already added in `main.py`).
  - Make sure the login is exclusively via the `localhost` domain and not `127.0.0.1`. The backend is configured to ignore the JWT time check (`exp`) by using the direct `userinfo` call to avoid Clock Skew errors.

---

Coded with passion 🚀. We look forward to seeing your creations!

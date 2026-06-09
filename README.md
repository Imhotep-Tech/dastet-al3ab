# Im7o (إيمحو) - منصة ألعاب الحفلات 🎲

Im7o (إيمحو) is an open-source, mobile-first, offline-ready web platform for Arabic party games. Built with Next.js and Tailwind CSS, it features a dynamic engine capable of running different formats (Turn-based, Hot-potato, etc.) effortlessly.

We welcome two types of contributors: **Game Adders** (Content Creators) and **Feature Adders** (Developers). 

---

## 🎮 1. For Game Adders (Content Contributors)

You do **not** need to know how to code to add a completely new game! The platform is built on a template system. You only need to add your questions and configure a simple file.

### Step 1: Add your Game Cards (Questions)
Navigate to `src/data/cards/` and create a new JSON file (e.g., `my-game-cards.json`). Add your questions as a simple list:
```json
[
  "السؤال الأول هنا",
  "التحدي الثاني هنا",
  "الكلمة الثالثة هنا"
]
```

### Step 2: Add your Game Configuration
There are ready-to-use template examples in `src/data/templates/`!
To create your game, simply copy one of those templates into the `src/data/games/` folder and rename it (e.g., `my-game.json`), then modify the fields.

**The code automatically discovers all JSON files inside `src/data/games/` and adds them to the platform. You do not need to edit any TypeScript code!**

### Step 3: Create a Pull Request (PR)
When you are ready to submit your game, push your changes to GitHub and create a Pull Request.

**Important: To be accepted, your Pull Request title MUST follow this exact format:**
- **Add Game: [Your Game Name]** *(e.g. Add Game: لعبة الألغاز)*

#### ⚙️ Configuration Variables Dictionary
Here is a complete table of every possible variable you can add to your JSON file to perfectly control how your game plays:

| Variable Name | Type | Allowed Values / Examples | Description & Function |
|---|---|---|---|
| `"id"` | String | `"my-unique-game"` | A unique internal identifier for your game. Must be English, lowercase, no spaces (use hyphens). |
| `"engineTemplate"` | String | `"turn-based"` OR `"hot-potato"` | The core logic engine. `turn-based`: standard points system. `hot-potato`: ticking bomb survival system. |
| `"mode"` | String | `"individual"`, `"two-team"`, `"multi-team"` | Controls the setup lobby UI terminology (asking for "Player Names" vs "Team Names"). |
| `"turnStrategy"` | String | `"sequential"` OR `"open"` | *(Turn-Based Only)* `sequential`: players take turns strictly. `open`: question is open to everyone, host clicks who answered correctly. |
| `"allowPass"` | Boolean | `true` OR `false` | *(Turn-Based Only)* If true, adds a button allowing the active player to pass their question to the next person instead of getting a 0. |
| `"allowElimination"` | Boolean | `true` OR `false` | If true, adds a button allowing the host to instantly eliminate/kick out an active player permanently. |
| `"hasTimer"` | Boolean | `true` OR `false` | Shows a live countdown timer during gameplay. |
| `"defaultTimerSeconds"`| Number | `30`, `60`, `90`, etc. | The starting time of the countdown clock (if `hasTimer` is true). |
| `"isTimerCustomizable"`| Boolean | `true` OR `false` | If true, displays a text input in the lobby allowing players to change the timer duration before starting. |
| `"title"` | String | `"لعبتي الممتعة"` | The display name of the game (in Arabic). Appears on the dashboard and in-game headers. |
| `"author"` | String | `"أحمد صالح"` | *(Optional)* The name of the creator! Gives you credit directly inside the game under the title. |
| `"instructions"` | String | `"1. قواعد اللعبة...\n2. الهدف..."` | The text shown in the popup Instructions Modal. Use `\n` to break lines. |
| `"logo"` | String | `"individual"`, `"two-team"`, `"multi-team"`, `"bomb"` | Specifies which icon to render on the main dashboard grid. |
| `"themeColor"` | String | `"#EF4444"`, `"#3B82F6"`, `"#10B981"` | The main Hex color used to paint the buttons, borders, and overlays of your game. |
| `"cardsFile"` | String | `"my-game-cards.json"` | The exact name of the file inside `src/data/cards/` containing your questions array. |

#### Example JSON Configuration
```json
{
  "id": "my-game",
  "engineTemplate": "turn-based", 
  "mode": "multi-team", 
  "turnStrategy": "open", 
  "allowPass": true, 
  "title": "لعبتي الجديدة",
  "author": "اسمك هنا",
  "hasTimer": true,
  "defaultTimerSeconds": 60,
  "isTimerCustomizable": true,
  "allowElimination": false,
  "themeColor": "#8B5CF6",
  "logo": "users", 
  "instructions": "اكتب تعليمات وقواعد لعبتك هنا...",
  "cardsFile": "my-game-cards.json"
}
```



---

## 💻 2. For Feature Adders (Code/Engine Contributors)

If you are a developer looking to build entirely new gameplay mechanics, animations, or logic, you can add a new **Engine Template**.

### How the Architecture Works
The core routing relies on `src/engines/GameDispatcher.tsx`. When a user visits a game, the Dispatcher reads the `engineTemplate` string from the JSON config and mounts the appropriate React component.

### How to Add a New Engine
1. **Create the Engine Component**: Add your new logic in `src/engines/MyCustomEngine.tsx`. Use `TurnBasedEngine.tsx` as a structural reference.
2. **Update the Dispatcher**: Open `src/engines/GameDispatcher.tsx` and route your new template string to your component:
   ```tsx
   import MyCustomEngine from "./MyCustomEngine";

   export default function GameDispatcher({ config }: { config: any }) {
     if (config.engineTemplate === "my-new-mechanic") {
       return <MyCustomEngine config={config} />;
     }
     // ...
   }
   ```
3. Test your engine by creating a mock JSON config that uses `"engineTemplate": "my-new-mechanic"`.

---

## 🏃‍♂️ Running Locally

1. Clone the repository: `git clone https://github.com/imhotep-tech/im7o.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:3000` in your browser.

## 🛠️ Tech Stack
- Next.js 15 (App Router, Static Export)
- Tailwind CSS v4
- Lucide React (Icons)

## 📄 License
Developed proudly by **Imhotep Tech**. Open-source under the MIT License.

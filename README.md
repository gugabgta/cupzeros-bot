# 🛡️ Raid Activity Tracker

A sleek, interactive Discord bot built with **discord.js** to coordinate and track raid activities in your server. Prevent overlaps and keep your team informed with real-time status updates.

---

## 🔥 Features

-   **Interactive UI:** Uses modern Discord Buttons and Embeds for a clean user experience.
-   **Locking Mechanism:** Only one raider can be active at a time to prevent coordination conflicts.
-   **Permission Control:** Only the active raider can "Finish" their session, ensuring data integrity.
-   **Real-time Status:** Dynamic embed updates that change color and content based on activity.
-   **Docker Ready:** Fully containerized for easy deployment.

## 🚀 Quick Start

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16.11.0 or higher)
-   [npm](https://www.npmjs.com/)
-   A Discord Bot Token (Get one at the [Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd discord-bot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    DISCORD_TOKEN=your_bot_token_here
    ```

4.  **Launch the bot:**
    ```bash
    npm run dev
    ```

---

## 🛠 Usage

### Commands
-   `!setup-raid`: Deploys the interactive Raid Tracker embed in the current channel.
-   `ping`: A simple connectivity check.

### How it works
1.  Use `!setup-raid` to create the control panel.
2.  Click **Start Raid** to claim the active slot. The embed will turn **Orange** and display your name.
3.  While you are raiding, the button will be disabled for others.
4.  Once finished, click **Finish Raid** to clear the slot and reset the embed to **Green**.

---

## 🐳 Docker Deployment

Run the bot in a lightweight container:

```bash
# Build the image
docker build -t discord-raid-bot .

# Run the container
docker run -d --env-file .env discord-raid-bot
```

---


## 📜 License

This project is licensed under the **ISC License**.

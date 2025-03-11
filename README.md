React Native Expo Project

This is a React Native Expo project. Follow the steps below to set up and run the project.

📌 Prerequisites

Before you begin, ensure you have the following installed:

Node.js 20.0.0

Expo CLI → Install it globally using:

npm install -g expo-cli
Android Studio (For Android Emulator) or Xcode (For iOS Simulator) (Mac only)

🚀 Getting Started

1️⃣ Clone the Repository

git clone <repo-url>
cd <project-name>

2️⃣ Install Dependencies

npm install
# OR
yarn

3️⃣ Start the Expo Development Server

npx expo start

This will open the Expo Developer Tools in your browser.

📜 Project Structure

📂 project-root/
├── 📁 src/               # Main source code
│   ├── 📁 components/    # Reusable components
│   ├── 📁 screens/       # Application screens
│   ├── 📁 context/       # Context API providers
│   ├── 📁 assets/        # Images, icons, etc.          
                          # API calls and environment config
├── .env                  # Environment variables
├── app.json              # Expo configuration
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── ...                   # Other config files

✅ Additional Commands

Linting & Formatting:

npm run lint
npm run format

Running Tests:

npm test

Building the App for Production:

expo build:android
expo build:ios

🤝 Contributing

Feel free to fork this project, submit issues, or make pull requests.

📄 License

This project is licensed under the MIT License.

Happy coding! 🚀


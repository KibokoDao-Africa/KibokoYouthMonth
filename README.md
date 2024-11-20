<<<<<<< HEAD

# Hackathon Project Submission Guide 🚀

Welcome, Hackathon Participants! 🎉 This guide will walk you through the process of submitting your project to this repository using GitHub. We will cover everything from forking the repository to creating a pull request (PR). Follow these steps carefully to ensure your submission is successful and free of dependency issues.

---

## 📋 Prerequisites

Before you begin, ensure you have the following:
- A GitHub account.
- Git installed on your local machine.
- Node.js and npm installed (if applicable for your project).
- Basic understanding of Git and GitHub.

---

## 🚀 Step 1: Fork the Repository

1. **Fork this repository**:
   - Click on the "Fork" button at the top right corner of this repository page.
   - This will create a copy of this repository under your GitHub account.

2. **Clone your forked repository**:
   ```bash
   git clone https://github.com/<your-username>/<repository-name>.git
   ```
   Replace `<your-username>` with your GitHub username.

3. **Navigate into the cloned directory**:
   ```bash
   cd <repository-name>
   ```

---

## 🔄 Step 2: Set Upstream Repository

To keep your fork in sync with the original repository:

1. **Add the original repository as an upstream remote**:
   ```bash
   git remote add upstream https://github.com/<original-owner>/<repository-name>.git
   ```

2. **Verify the new upstream remote**:
   ```bash
   git remote -v
   ```

---

## 📂 Step 3: Create a Branch for Your Project

1. **Pull the latest changes from the main branch**:
   ```bash
   git pull upstream main
   ```

2. **Create a new branch for your hackathon project**:
   ```bash
   git checkout -b <team-name>-submission
   ```
   Replace `<team-name>` with your team's name.

---

## 📦 Step 4: Install Dependencies

To avoid dependency issues:

1. **Install project dependencies**:
   ```bash
   npm install
   ```

2. **Check for outdated or missing dependencies**:
   - If you encounter any issues, try using:
     ```bash
     npm audit fix
     ```

3. **Lock package versions**:
   - If you are adding new dependencies, ensure you use exact versions to avoid conflicts:
     ```bash
     npm install <package-name>@<version> --save-exact
     ```

4. **Commit the updated `package-lock.json` or `yarn.lock`**:
   ```bash
   git add package-lock.json
   git commit -m "Updated dependencies"
   ```

---

## 💻 Step 5: Develop Your Project

Now, build your hackathon project within the newly created branch. Make sure to:

- Write clean, modular, and well-documented code.
- Test your application thoroughly before submission.
- Include relevant documentation for your project in a separate `README.md` file.

---

## 🔄 Step 6: Sync with the Upstream Repository

Before submitting your pull request, ensure your branch is up to date:

1. **Fetch the latest changes from the upstream repository**:
   ```bash
   git fetch upstream
   ```

2. **Merge changes into your branch**:
   ```bash
   git merge upstream/main
   ```

3. **Resolve any merge conflicts**, if they occur.

---

## ✅ Step 7: Commit and Push Changes

1. **Add all your changes**:
   ```bash
   git add .
   ```

2. **Commit your changes with a descriptive message**:
   ```bash
   git commit -m "Add hackathon project submission by <team-name>"
   ```

3. **Push your branch to your forked repository**:
   ```bash
   git push origin <team-name>-submission
   ```

---

## 🔄 Step 8: Create a Pull Request (PR)

1. **Go to the original repository on GitHub**.
2. **Click on the "Compare & pull request" button**.
3. Ensure your pull request:
   - Targets the `main` branch of the original repository.
   - Has a clear title and description.
   - Includes relevant details such as your team members, project overview, and any special instructions.

4. **Submit your pull request**.

---

## 🛠 Troubleshooting Common Issues

1. **Dependency conflicts**:
   - Delete `node_modules` and `package-lock.json`, then run:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

2. **Merge conflicts**:
   - Use a merge tool like `git mergetool` or manually resolve conflicts, then commit the resolved files.

3. **Failed builds**:
   - Ensure that your project passes all tests and linting checks before submitting.

---

## 🎉 Congratulations!

You have successfully submitted your hackathon project! 🚀 Thank you for participating, and good luck! 🎊
https://t.me/Lisk_kenya
If you have any questions or need further assistance, feel free to reach out to us.

Happy Coding! 💻😊
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> d75fcb8 (kiboko hackathon)

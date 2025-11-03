# RaceTrack
This Repository is for Information Manage II Project named RaceTrack

Base the Website Design on this wireframe:
[Figma](https://www.figma.com/design/7J0zoxYEaQ9Z3AUaFX6iu6/IM-2-%3A-Electric-Boogalo?node-id=0-1&t=gboHDhLukfFZOEEE-0)

- **Group Members (IM 2):**
  - @Raidiniom
  - @CallenCaracy
  - @MarQtie
  - @Clarky-B

- **Group Members (AppDev):**
  - @Raidiniom
  - @bellebarmosa
  - @samantiporta
  - @ndlll5
  - _More to come_

# Environment Variables
Please Check the Projects Tab

# 🔹 Workflow
### 1. Before starting work
Always sync your repo first:
```bash
git fetch origin
git switch development
git pull origin development
```

### 2. Create a new branch
Branch naming rules:
- feat/feature-name → for new features
- bug/fix-name → for bug fixes
```bash
git switch -c feat/your-feature-name
git push -u origin feat/your-feature-name   # set upstream for future pushes
```

### 3. Do your work
Save progress frequently:
```bash
git branch -v                  # make sure you’re NOT on main or development
git add .
git commit -m "summarize what you did"
git push
```

### 4. Create Pull Request
If you are done with your work, create a Pull Request:
```rust
development <- 'branch-where-you-are-working'
```
- Go to GitHub → Open a PR from your branch into development
- Request reviews from teammates

## Summary Workflow
```bash
git fetch origin
git pull origin development
git switch -c feat/branch-name
# work on changes
git add .
git commit -m "..."
git push
# open PR → merge into development
git switch development
git pull origin development
git branch -d feat/branch-name
```

## Start / Run the Site
```bash
npm start
```

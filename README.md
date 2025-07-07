# GitHub Profile Card Generator

[![Deploy on Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://profile-card-generator-pi.vercel.app)
[![Made with Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js)](https://nextjs.org)
[![Made by AlexisRevol](https://img.shields.io/badge/Made%20by-AlexisRevol-blueviolet)](https://github.com/AlexisRevol)


Create a dynamic, stylized **GitHub profile card** that you can embed directly into your `README.md` GitHub profile.  
Rendering is generated in **real time** via the Github API based on your GitHub username.

 Example :  
![Carte GitHub Exemple](https://profile-card-generator-pi.vercel.app/api/card?user=AlexisRevol&template=dark)

---

##  How to use it

1. Copy the Markdown code below.
2. Replace `YOUR_USERNAME` with your GitHub login.
3. Paste it into your `README.md` profile.

```markdown
[![My card GitHub](https://profile-card-generator-pi.vercel.app/api/card?user=VOTRE_USERNAME)](https://github.com/VOTRE_USERNAME)
```

##  Available parameters

| Parameter  | Description                      | Required | Values available                                     |
|------------|----------------------------------|--------|-------------------------------------------------------|
| `user`     | GitHub username         | ✅     | `AlexisRevol`, `octocat`, etc.                        |
| `template` | Card visual theme         | ❌     | `classic`, `dark`, `holographic`, `blue` (default : `classic`) |

---

##  Examples of Themes

| Theme        | Overview |
|--------------|--------|
| `dark`       | <img src="https://profile-card-generator-pi.vercel.app/api/card?user=AlexisRevol&template=dark" width="300" /> |
| `holographic`| <img src="https://profile-card-generator-pi.vercel.app/api/card?user=AlexisRevol&template=holographic" width="300" /> |
| `classic`    | <img src="https://profile-card-generator-pi.vercel.app/api/card?user=AlexisRevol&template=classic" width="300" /> |


---

##  Technologies used

- **Next.js / React**: API server and dynamic rendering of SVG components.
- **TypeScript**: static typing and code security.
- **Vercel**: fast and easy continuous deployment.
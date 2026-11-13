# Deploy Code-Roast to GitHub Pages

This guide takes you from the project on your computer to a live website at **https://code-roast.com**, with **www.code-roast.com** redirecting to it. GitHub Pages hosts the built website; GoDaddy manages the domain's DNS. GitHub Actions builds and publishes the site whenever you push to `main`.

Nothing in this guide happens automatically until you follow the steps. DNS changes can take up to 24 hours, and HTTPS may take additional time to become available.

## Before you start

- Access to the [CatSealey/code-roast-website repository](https://github.com/CatSealey/code-roast-website) with administrator permissions.
- Access to the GoDaddy account that manages `code-roast.com` and its DNS.
- Node.js and npm installed, and the project set up locally as described in [QUICKSTART.md](./QUICKSTART.md).
- GitHub Pages available for your repository and plan. GitHub Free supports Pages for public repositories; private repositories require an eligible plan.

GitHub Pages is static hosting. The contact button opens a visitor's email application; it does not send an email from the website. Its email address is public in the link. Do not put passwords, API keys, or other secrets in this repository or the frontend.

> **Before changing DNS:** Record the existing DNS settings. Changing website records can interrupt a site currently using this domain. Do not delete mail-related records such as MX records or unrelated TXT records. If you use custom nameservers, DNS may be managed somewhere other than GoDaddy even though the domain was purchased there.

## 1. Check the site locally

In the VS Code terminal, from the project folder:

```bash
npm ci
npm test -- --run
npm run build -- --outDir .pages-preview
npm run preview -- --outDir .pages-preview
```

Open the address printed by Vite, normally [http://localhost:3001](http://localhost:3001), and check the page, carousel, images, theme toggle, and contact button. Press **Ctrl+C** in the terminal to stop the preview.

The separate `.pages-preview` directory avoids overwriting this repository's tracked `dist/` files. It is generated output: do not commit it. The deployment workflow below builds a fresh `dist/` on GitHub and does not rely on the committed `dist/`.

## 2. Add the deployment workflow

In VS Code, create the file `.github/workflows/deploy.yml` in the project root, creating the folders if necessary. Paste in:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build the site
        run: npm run build

      - name: Upload the built site
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Save the file. This workflow builds the current source, not a local preview folder. You do not need to create a `CNAME` file when publishing with a custom GitHub Actions workflow; GitHub stores the custom domain in the repository's Pages settings.

## 3. Commit and push your changes

Make sure your latest website changes **and** `.github/workflows/deploy.yml` are saved, committed, and pushed to `main`. In VS Code:

1. Open **Source Control** and review the changed files. Stage the website changes and workflow you want to publish, including any new files and deletions. Do not stage `.pages-preview` or unrelated changes.
2. Enter a commit message such as `Prepare site for GitHub Pages` and select **Commit**.
3. Select **Sync Changes** or **Push**. Sign in to GitHub if prompted.
4. Confirm the new commit and workflow file appear on the repository's `main` branch on GitHub.

Anything included in the repository and published site may be publicly accessible. Check your changes before pushing.

## 4. Enable GitHub Pages

1. Open the repository on GitHub and select **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open the repository's **Actions** tab and find **Deploy to GitHub Pages**. If the workflow did not run, select it, choose **Run workflow**, select `main`, and run it.
4. Open the run to see its build and deploy jobs. A green check means the deployment completed. If it fails, expand the failed step to read its error.

The default project URL would be `https://catsealey.github.io/code-roast-website/`. This site currently uses root-relative paths, so it is designed for the custom domain at `/` and may have missing assets or routing at that project URL. Use the local preview until the custom domain is configured; do not change Vite's base path for this custom-domain setup.

## 5. Verify ownership of your domain on GitHub

GitHub recommends verifying the domain before connecting it to a site, to help prevent domain takeovers.

1. On GitHub, click your profile picture → **Settings** → **Pages** in the account settings sidebar (not the repository settings).
2. Under **Verified domains**, choose **Add a domain**, enter `code-roast.com`, and follow the instructions.
3. GitHub will show a unique **TXT** record name and value. In GoDaddy, open your domain's **DNS** or **Manage DNS** page and add that exact record. Use the name format GoDaddy expects; it may append `code-roast.com` automatically.
4. Return to GitHub and click **Verify**. If verification fails, wait for DNS to update and try again. Keep the verification record in place.

Verifying the apex domain also verifies its immediate subdomains such as `www`. Follow GitHub's displayed instructions if the interface has changed: [Verifying your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

## 6. Set the custom domain in GitHub

**Do this before pointing the website DNS records to GitHub.**

1. Go back to the repository's **Settings** → **Pages**.
2. Under **Custom domain**, enter `code-roast.com` without `https://` or a trailing slash, then click **Save**.
3. GitHub may show a DNS check error until the records in the next step have propagated. Leave the domain saved and continue.

If GitHub says the domain is already in use, check whether another Pages site in your account has it configured before making DNS changes.

## 7. Point GoDaddy DNS to GitHub Pages

In GoDaddy, open **My Products** → your domain → **DNS** / **Manage DNS**. Labels may differ slightly. Add these records to the DNS provider actually used by the domain:

| Type | Name / Host | Value / Points to | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Default |
| A | `@` | `185.199.109.153` | Default |
| A | `@` | `185.199.110.153` | Default |
| A | `@` | `185.199.111.153` | Default |
| CNAME | `www` | `catsealey.github.io` | Default |

Add **four separate A records**. The CNAME value is the account's GitHub Pages hostname, **not** the repository URL and not `code-roast.com`. If GoDaddy adds a trailing dot, that is normal.

Remove or replace conflicting old website records for `@` and `www` as appropriate, including old A/AAAA records or a conflicting `www` CNAME; otherwise visitors may reach the wrong host. Do not remove unrelated records or the GitHub verification TXT record. Do not add a wildcard (`*`) DNS record: GitHub warns that wildcard records can expose subdomains to takeover. If you need IPv6, use all four GitHub Pages AAAA addresses listed in [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

On macOS, you can inspect the records in Terminal:

```bash
dig +short code-roast.com A
dig +short www.code-roast.com CNAME
```

The first should eventually show the four GitHub IP addresses, in any order; the second should show `catsealey.github.io.`. DNS caches may still have the old values while changes propagate. GitHub's Pages settings also provide a DNS check.

## 8. Turn on HTTPS and check the live site

1. Wait for the GitHub Pages DNS check to succeed. DNS changes can take up to 24 hours.
2. In repository **Settings** → **Pages**, select **Enforce HTTPS** once available. GitHub provisions the certificate; the option can remain unavailable while DNS or certificate provisioning finishes.
3. Open [https://code-roast.com](https://code-roast.com) and verify the browser shows a secure connection.
4. Open `https://www.code-roast.com` and confirm it redirects to `https://code-roast.com`. Test the page, images, carousel, theme toggle, and contact link on desktop and mobile.

## Publishing future changes

Save and test your edits, then commit and push them to `main`. The **Deploy to GitHub Pages** workflow runs automatically. Watch the run under **Actions**; after the deploy job succeeds, refresh the live page. A hard refresh or private window can help if your browser has cached an older version.

## Troubleshooting

- **Pages settings or GitHub Actions source missing:** Check repository admin permissions, Pages availability for your plan and repository visibility, and whether Actions is enabled in repository settings.
- **Workflow not listed:** Check that `.github/workflows/deploy.yml` is committed on `main`. Use **Run workflow** in the Actions tab after enabling the GitHub Actions publishing source.
- **Build fails:** Open the failed Actions step. Check that `package-lock.json` is committed and matches `package.json`, and reproduce locally with `npm ci` and `npm run build -- --outDir .pages-preview`.
- **Deploy fails:** Ensure Pages uses **GitHub Actions**, the workflow has the listed permissions, and any `github-pages` environment protection rules permit the deployment.
- **Domain does not resolve or shows another site:** Check the authoritative DNS provider, the four A records and `www` CNAME, remove conflicting website records, and allow time for propagation. Confirm the custom domain is saved in GitHub Pages settings.
- **HTTPS unavailable or certificate warning:** Wait for DNS and certificate provisioning, verify the DNS check, then retry **Enforce HTTPS**. Do not ask visitors to bypass certificate warnings.
- **Images or navigation fail on `github.io`:** The project is configured for the custom-domain root, not the repository subpath. Check the live custom-domain URL instead.
- **A future page returns 404 on refresh:** GitHub Pages does not automatically fall back to `index.html` for arbitrary React Router paths. The current site has only the homepage; new routes need a hosting-compatible routing strategy.
- **Contact link does not open:** The visitor needs an email app or browser mail handler configured. The site itself has no mail server.

## Official references

- [GitHub: custom workflows for Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub: managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: securing Pages with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [GoDaddy: add an A record](https://www.godaddy.com/help/add-an-a-record-19238) and [add a CNAME record](https://www.godaddy.com/help/add-a-cname-record-19236)

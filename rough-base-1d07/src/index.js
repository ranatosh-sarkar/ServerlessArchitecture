export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/run-tests") {
      // Replace with your actual GitHub repository and token
      const githubRepo = "YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"; 
      const githubToken = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"; 

      const githubAPI = `https://api.github.com/repos/${githubRepo}/actions/workflows/playwright.yml/dispatches`;

      const response = await fetch(githubAPI, {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "Authorization": `Bearer ${githubToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ref: "main" // Change branch if needed
        })
      });

      if (response.ok) {
        return new Response("Playwright test execution triggered successfully!", {
          headers: { "Content-Type": "text/plain" },
        });
      } else {
        return new Response(`Failed to trigger Playwright tests: ${await response.text()}`, { status: 500 });
      }
    }

    return new Response("Cloudflare Worker is ready!", { status: 200 });
  },
};

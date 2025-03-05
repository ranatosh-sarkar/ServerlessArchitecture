export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/run-tests") {
      return new Response(await triggerGitHubActions(env), {
        headers: { "Content-Type": "text/plain" },
      });
    }

    return new Response("Cloudflare Worker is ready!", { status: 200 });
  },
};

async function triggerGitHubActions(env) {
  const owner = "ranatosh-sarkar";
  const repo = "ServerlessArchitecture";          // e.g., "ServerlessArchitecture"
  const workflowFileName = "playwright.yml";      // The name of your workflow file
  const branch = "master";                        // or "main", whichever you use

  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowFileName}/dispatches`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "Authorization": `Bearer ${env.GITHUB_TOKEN}`, // The secret we stored
      "Content-Type": "application/json",
      "User-Agent": "CloudflareWorker-GitHubActions"
    },
    body: JSON.stringify({ ref: branch })  // 'ref' is the branch to run
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to trigger GitHub Actions: ${errorText}`);
  }

  return "Successfully triggered GitHub Actions workflow!";
}

export default {
  async fetch(request, env) {
    try {
      // Retrieve the latest test run from Cloudflare KV
      const storedResults = await env.TEST_RESULTS_citiAutomation.get("latest-run");

      // Check if data exists
      if (storedResults) {
        return new Response(storedResults, { 
          headers: { "Content-Type": "application/json" } 
        });
      } else {
        return new Response(JSON.stringify({ message: "No test results found in KV Store" }), { 
          headers: { "Content-Type": "application/json" } 
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: "Worker execution failed", details: error.message }), { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      });
    }
  }
};

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.ZEN_API_KEY,
  baseURL: "https://opencode.ai/zen/v1/chat/completions",
});

async function runReview() {
  // Fetch PR diff
  const diffUrl = process.env.PR_DIFF_URL;
  const diffResponse = await fetch(diffUrl, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3.diff",
    },
  });
  const diff = await diffResponse.text();

  // Truncate if too large (context window limit)
  const truncatedDiff = diff.slice(0, 30000);

  // Call OpenCode Zen
  const completion = await openai.chat.completions.create({
    model: "deepseek-v4-flash", // Cheap, fast, good for code review
    messages: [
      {
        role: "system",
        content: `You are a senior engineer reviewing a pull request. 
Check for: security issues, obvious bugs, missing error handling, and code clarity. 
Be concise. Format each issue as: FILE:line - SEVERITY: description`,
      },
      {
        role: "user",
        content: `Review this diff:\n\n${truncatedDiff}`,
      },
    ],
    max_tokens: 1024,
  });

  const review = completion.choices[0].message.content;

  // Post as PR comment
  const prNumber = process.env.PR_NUMBER;
  const repo = process.env.GITHUB_REPOSITORY;

  await fetch(
    `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: `🤖 AI Pre-Review (OpenCode Zen - DeepSeek V4 Flash):\n\n${review}`,
      }),
    },
  );
}

runReview().catch(console.error);

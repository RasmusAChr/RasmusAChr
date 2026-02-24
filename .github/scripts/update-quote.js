const fs = require("fs");

const quotesFile = "quotes.json";
const readmeFile = "README.md";

function getRandomQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateReadme(newQuoteHtml) {
  const readme = fs.readFileSync(readmeFile, "utf8");

  const updated = readme.replace(
    /<!-- QUOTE_START -->([\s\S]*?)<!-- QUOTE_END -->/,
    `<!-- QUOTE_START -->
${newQuoteHtml}
<!-- QUOTE_END -->`
  );

  fs.writeFileSync(readmeFile, updated);
}

function main() {
  const data = JSON.parse(fs.readFileSync(quotesFile, "utf8"));
  const randomQuote = getRandomQuote(data.quotes);

  const quoteHtml = `<p><i>"${randomQuote.quote}"</i> - ${randomQuote.author}</p>`;

  updateReadme(quoteHtml);

  console.log("README updated with new quote.");
}

main();
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const app = express();
const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "static"));
app.use(express.static(path.join(__dirname, "utils")));

// Generating a random string and color
function generateRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// It would not be secure to use Math.random() for generating sensitive data (passwords or tokens) in a production environment.
// A possible solution for this could be the crypto module in Node.js.

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    initialString: generateRandomString(),
    initialColor: generateRandomColor(),
  });
});

// Send the random string every 2 seconds
app.get("/random-string", (req, res) => {
  res.send(`
        <p hx-get="/random-string" 
            hx-trigger="every 2s"
            hx-swap="outerHTML"
            style="color: ${generateRandomColor()}" 
            id="random-string"
        >
            ${generateRandomString()}
        </p>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { shortUrl: null });
});

app.post("/", async (req, res) => {
  const longUrl = req.body.longUrl;
  console.log(longUrl);

  const data = {
    originalURL: longUrl,
    hideReferer: false,
    httpsLinks: false,
    domain: "link.beenay.com",
    linkType: "random",
  };

  const options = {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "sk_eCZkYNsTs9MlcV20",
    },
  };

  try {
    const response = await axios.post(
      "https://api.short.io/links/",
      data,
      options
    );
    console.log(response.data);
    res.render("index", { shortUrl: response.data.shortURL });
    console.log(response.data.shortURL);
  } catch (error) {
    res.render("index", { shortUrl: `Error: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

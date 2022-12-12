import puppeteer from "puppeteer";
import { writeFile, stat } from "fs/promises";
import path from "path";
import { describe } from "./describe.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const sites = [
  "https://www.target.com",

  "https://www.nike.com",
  "https://www.realtor.com",

  "https://www.staples.com",

  "https://www.walmart.com/",

  "https://www.katespade.com"
];
// const findSite = url => sites.find(url === url)

(async () => {
  // Initialize Puppeteer

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
        "--disable-site-isolation-trials",
        "--disable-features=BlockInsecurePrivateNetworkRequests"
      ]
    });
    const page = await browser.newPage();

    // await page.emulate("iPhone X");

    await page.goto(findSite("https://www.walmart.com"), {
      waitUntil: "load",
      timeout: 60000
    });
    console.log("page has been loaded!");

    page.on("console", async (msg) => {
      const args = await Promise.all(msg.args().map((arg) => describe(arg)));
      console.log(msg.text(), ...args);
    });

    const result = await page
      .evaluate(
        async (document, window) => {
          return await new Promise(async (resolve) => {
            const json = document.getElementById("__NEXT_DATA__").innerHTML;
            console.log("55:", json);
            window.next = json;
            resolve({ window, json });
          });
        },
        document,
        window
      )
      .then(async ({ window, json }) => {
        console.log(json);

        const file = await writeFile(json, "kate.json");
        console.log(file);
        const size = await stat(file).size;
        console.log(size);
        window.stop();
      });

    console.log(result);

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();

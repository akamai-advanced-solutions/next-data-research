import fs from "fs/promises";
import path from "node:path";

async function minifyAll(directory, callback) {
  try {
    const files = await fs.readdir(directory);
    for (const file of files) {
      console.log(file);
      callback(file);
    }
  } catch (error) {
    console.error(error);
  }
}

async function copyAndMinify(file) {
  try {
    const copiedFile = await copyFile(file, `${file.split(".")[0]}`);
    const write = await writeFile(`./formatted/${copiedFile}.json`, copiedFile);
    console.log(write);
  } catch (error) {
    console.error(error);
  }
}

async () => {
  await minifyAll(`${process.cwd()}/pristine`, (file) => copyAndMinify(file));
};

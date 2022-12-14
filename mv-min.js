import fs from "node:fs/promises";
import path from "node:path";

const __dirname = path.dir;

// The final version of the move function
async function moveFile(oldPath, newPath) {
  // 1. Create the destination directory
  // Set the `recursive` option to `true` to create all the subdirectories
  await fs.mkdir(path.dirname(newPath), { recursive: true });

  try {
    // 2. Rename the file (move it to the new directory)
    await fs.rename(oldPath, newPath);
  } catch (error) {
    if (error.code === "EXDEV") {
      // 3. Copy the file as a fallback
      await fs.copyFile(oldPath, newPath);
      // Remove the old file
      // await fs.unlink(oldPath);
    } else {
      // Throw any other error
      throw error;
    }
  }
}

try {
  // console.log(path.join(__dirname, "pristine"));
  const files = await fs.readdir("pristine", "utf8");
  console.log(files);
  console.count(process.cwd());

  for (const file of files) {
    await moveFile(file, `${process.cwd()}/formatted/${file}`);
  }
  // Handle success
  console.log("File moved successfully");
} catch (error) {
  // Handle the error
  console.error(error);
}
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

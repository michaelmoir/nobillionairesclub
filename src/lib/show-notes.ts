import { readFile } from "node:fs/promises";
import path from "node:path";

const notesDir = path.join(process.cwd(), "content", "podcast-show-notes");

export async function getShowNotesMarkdown(fileName: string): Promise<string> {
  const fullPath = path.join(notesDir, fileName);
  return readFile(fullPath, "utf-8");
}

import { exec } from "child_process";
import FileTypeExtractor from "./FileTypeExtractor";

export default class ZipExtractor extends FileTypeExtractor {
  extract = () => {
    exec(`unzip -q "${this.filePath}" -d${this.tmpDir}`, (error, stdout, stderr) => {
      if (error) {
        console.log(stdout);
        console.log(stderr);
        this.onError(error);
        return;
      }

      this.onSuccess();
    });
  };
}

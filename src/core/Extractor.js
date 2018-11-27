import fs from "fs";
import os from "os";
import path from "path";
import readChunk from "read-chunk";
import fileType from "file-type";
import ZipExtractor from "./extractors/ZipExtractor";
import UnsupportedExtractor from "./extractors/UnsupportedExtractor";

export default class Extractor {
  extract = filePath =>
    new Promise((resolve, reject) => {
      this.extractSync(filePath, resolve, reject);
    });

  extractSync = (filePath, onSuccess, onError) => {
    console.log(filePath);
    const tmpDir = this._getTmpDir();
    console.log(tmpDir);

    const params = {
      filePath,
      tmpDir,
      onSuccess: () => onSuccess(this._getAllImagesFilesRec(tmpDir, [])),
      onError
    };

    this._fileTypeExtractor(params).extract();
  };

  _fileTypeExtractor = params => {
    const buffer = readChunk.sync(params.filePath, 0, 4100);
    const ft = fileType(buffer);
    switch (ft.ext) {
      case "zip":
        return new ZipExtractor(params);
      default:
        return new UnsupportedExtractor(params, ft.ext);
    }
  };

  _getTmpDir = () => fs.mkdtempSync(path.join(os.tmpdir(), "test-"));

  // Attention : bien utiliser des Buffer pour les noms de fichiers,
  // avec des string les problèmes d'encoding sont ingérables.
  // TODO : ordonner par num pluto qu'alpha (2 avant 12) (option ?)
  _getAllImagesFilesRec = (dir, list) => {
    console.log(dir);
    const dirb = typeof dir === "string" ? Buffer.from(dir) : dir;
    // là une promise ?
    // On devrait utiliser l'option withFileTypes de readdirSync, mais
    // ça demande Node 10. Avec cette option statSync n'est plus utile
    const files = fs.readdirSync(dir, { encoding: "buffer" });
    const filesStat = files.map(f =>
      fs.statSync(this._joinPathBuffers(dirb, f))
    );
    const subDirs = files.filter((f, i) => filesStat[i].isDirectory());
    console.table(subDirs);
    const imgsFiles = files.filter(
      (f, i) => filesStat[i].isFile() && this._isImageType(f.toString("ascii"))
    );

    const imgsPathsB = [
      ...list,
      ...imgsFiles.map(f => this._joinPathBuffers(dirb, f))
    ];

    return subDirs.reduce(
      (allImgsPaths, subDir) =>
        this._getAllImagesFilesRec(
          this._joinPathBuffers(dirb, subDir),
          allImgsPaths
        ),
      imgsPathsB
    );
  };

  _joinPathBuffers = (first, second) => {
    const sepb = Buffer.from(path.sep);
    return Buffer.concat([first, sepb, second]);
  };

  _isImageType = fileName => {
    const imgExtensions = [".png", ".jpg", "gif"];
    const ext = path.extname(fileName).toLowerCase();
    return imgExtensions.includes(ext);
  };
}

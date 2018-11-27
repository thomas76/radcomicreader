// "Interface" pour les Extractors spécialisés.
// TODO : déclarer des objets héritant d'une interface "Configurable",
// pour construire automatiquement dans l'UI. Du coup pas la peine de faire
// un ZipExtractor, RarExtractor, etc... Juste définir dans la config la
// cmd à utilise pour chaque type de fichier.
export default class FileTypeExtractor {
  constructor(params) {
    this.filePath = params.filePath;
    this.tmpDir = params.tmpDir;
    this.onSuccess = params.onSuccess;
    this.onError = params.onError;
  }

  extract = () => {
    this.onError(`Unimplemented extractor for ${this.filePath}.`);
  };
}

import FileTypeExtractor from "./FileTypeExtractor";

export default class UnsupportedExtractor extends FileTypeExtractor {
  constructor(params, type) {
    super(params);
    this.type = type;
  }

  extract = () => {
    const error = this.type
      ? `File type not yet supported: ${this.type}.`
      : "Can't determine file type.";
    this.onError(error);
  };
}

import { remote } from "electron";
import fs from "fs";

const ImgSelect = (showImage) => {
  remote.dialog.showOpenDialog(
    remote.getCurrentWindow(),
    {
      filters: [{ name: "Images", extensions: ["png", "jpg"] }]
    },
    (filepaths /* , bookmarks */) => {
      // read image (note: use async in production)
      const img = fs.readFileSync(filepaths[0]).toString("base64");
      showImage(img);
    }
  );
  return null;
};

export default ImgSelect;

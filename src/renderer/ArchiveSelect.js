import { remote } from "electron";
import Extractor from "../core/Extractor";

// const ArchiveSelectS = showArchive => {
//   // TODO : better error handling
//   const extractor = new Extractor(showArchive, error => {
//     throw error;
//   });
//   remote.dialog.showOpenDialog(
//     remote.getCurrentWindow(),
//     {
//       filters: [{ name: "Archives", extensions: ["cbz", "cbr"] }]
//     },
//     (filepaths /* , bookmarks */) => {
//       extractor.extractSync(filepaths[0]);
//     }
//   );
//   return null;
// };

const ArchiveSelect = showArchive => {
  const extractor = new Extractor();
  remote.dialog.showOpenDialog(
    remote.getCurrentWindow(),
    {
      filters: [{ name: "Archives", extensions: ["cbz", "cbr"] }]
    },
    (filepaths /* , bookmarks */) => {
      extractor
        .extract(filepaths[0])
        .then(showArchive, error => {
          // TODO : better error handling
          throw error;
        })
        .catch(error => {
          // TODO : better error handling
          throw error;
        });
    }
  ).then(() => alert("toto"));
  return null;
};

export default ArchiveSelect;

import React, { Component } from "react";
import fs from "fs";
import Mousetrap from "mousetrap";
import Header from "./Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      imgList: null,
      imgIndex: 0,
      zoom: 100,
      top: 0
    };
  }

  componentDidMount = () => {
    this.handleKeys();
  };

  handleKeys = () => {
    Mousetrap.bind("pageup", () => this.shiftImage(-1));
    Mousetrap.bind("pagedown", () => this.shiftImage(1));
    Mousetrap.bind("shift+pageup", () => this.shiftImage(-5));
    Mousetrap.bind("shift+pagedown", () => this.shiftImage(5));
    Mousetrap.bind("end", () => this.goToEnd());
    Mousetrap.bind("home", () => this.showImage(0));
    Mousetrap.bind("+", () => this.zoom(5));
    Mousetrap.bind("-", () => this.zoom(-5));
    // shift++ marche pas (parce que ça fait '8' ?)
    Mousetrap.bind("shift++", () => this.zoom(15));
    Mousetrap.bind("shift+-", () => this.zoom(-15));

    Mousetrap.bind("up", () => this.scroll(10));
    Mousetrap.bind("down", () => this.scroll(-10));
    Mousetrap.bind("shift+up", () => this.scroll(30));
    Mousetrap.bind("shift+down", () => this.scroll(-30));
  };

  scroll = val => {
    const { top } = this.state;
    // il faudrait être + intelligent et scroller + ou - vite selon la taille ?
    let newTop = top + val;
    // vérif qu'on est pas trop bas ni trop haut…
    newTop = newTop <= 0 ? newTop : 0;

    this.setState({
      top: newTop
    });
  };

  zoom = val => {
    const { zoom } = this.state;
    let newZoom = zoom + val;
    newZoom = newZoom >= 5 ? newZoom : 5;
    this.setState({
      zoom: newZoom
    });
  };

  goToEnd = () => {
    const { imgList } = this.state;
    if (!imgList) return;
    this.showImage(imgList.length - 1);
  };

  showImage = imgIndex => {
    const { imgList } = this.state;
    if (!imgList) return;
    const img = fs.readFileSync(imgList[imgIndex]).toString("base64");
    this.setState({
      img,
      imgIndex,
      top: 0 // peut-être en bas si on fait un prev
    });
  };

  shiftImage = dif => {
    const { imgList, imgIndex } = this.state;
    let newIndex = imgIndex + dif;
    newIndex = newIndex < 0 ? 0 : newIndex;
    newIndex = imgList.length <= newIndex ? imgList.length - 1 : newIndex;
    if (newIndex !== imgIndex) {
      this.showImage(newIndex);
    }
  };

  showArchive = imgList => {
    console.table(imgList);
    this.setState({
      imgList
    });
    this.showImage(0);
  };

  handleImgClick = () => {
    this.shiftImage(1);
  };

  handleWheel = e => {
    if (e.deltaY < 0) {
      this.scroll(30);
    } else if (e.deltaY > 0) {
      this.scroll(-30);
    }
    // console.info(`x ${e.deltaX}`);
    // console.info(`y ${e.deltaY}`);
    // console.info(`z ${e.deltaZ}`);
    // console.info(`mode ${e.deltaMode}`);
  };

  render() {
    const { img, imgList, zoom, top } = this.state;
    return (
      <div>
        <Header showArchive={this.showArchive} />
        <div style={{ position: "relative", textAlign: "center" }}>
          {imgList ? (
            <img
              id="img"
              onClick={this.handleImgClick}
              onWheel={this.handleWheel}
              alt="test"
              width={`${zoom}%`}
              src={`data:image/png;base64,${img}`}
              style={{
                position: "relative",
                marginLeft: "auto",
                marginRigth: "auto",
                top: `${top}px`
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;

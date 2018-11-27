import React, { Component } from "react";
import PropTypes from "prop-types";
import ArchiveSelect from "./ArchiveSelect";

export default class Header extends Component {
  static propTypes = {
    showArchive: PropTypes.func.isRequired
  };

  render = () => {
    const { showArchive } = this.props;

    return (
      <header
        className="toolbar toolbar-header"
        style={{ position: "relative", zIndex: "2" }}
      >
        <div className="toolbar-actions">
          <div className="btn-group">
            <button type="button" className="btn btn-default">
              <span className="icon icon-home" />
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => {
                ArchiveSelect(showArchive);
              }}
            >
              <span className="icon icon-folder" />
            </button>
          </div>

          <button type="button" className="btn btn-default">
            <span className="icon icon-home icon-text" />
            Filters
          </button>

          <button
            type="button"
            className="btn btn-default btn-dropdown pull-right"
          >
            <span className="icon icon-megaphone" />
          </button>
        </div>
      </header>
    );
  };
}

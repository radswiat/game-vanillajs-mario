// import 'jquery-contextmenu';
import Vector from 'victor';
import 'lib/context-menu/context-menu';

import { canvasCfg } from 'config';
import tiles from 'objects/tiles';
import entities from 'objects/entities';

export default new class ClickActions {

  static findClickedObject(vectorLocation) {
    for (const tile of tiles.getAll()) {
      if (tile.location.distanceSq(vectorLocation) < (canvasCfg.blockSize * canvasCfg.blockSize) * 1) {
        return tile;
      }
    }
  }

  constructor() {
    this._createContextMenuPositionHandler();
    this._createContextMenu();
  }

  _createContextMenuPositionHandler() {
    document.addEventListener('contextmenu', ({ pageX, pageY }) => {
      this.lastContextMenuPosition = [pageX, pageY];
    });
  }

  _createContextMenu() {
    // define context menu
    const menu = [{
      name: 'delete',
      fun: this._handleContextMenuClick.bind(this, 'delete'),
    }, {
      name: 'drag over',
      fun: this._handleContextMenuClick.bind(this, 'drag'),
    }];
    // create context menu
    // it uses contextMenu plugin
    $('body').contextMenu(menu, { triggerOn: 'contextmenu' });
  }

  _handleContextMenuClick(type) {
    console.warn(type);
    // we can't use context menu event
    // as its not precise enough to find clicked object
    const mouse = new Vector(...this.lastContextMenuPosition);

    // find clicked object
    const clickedObject = ClickActions.findClickedObject(mouse);

    // any clicked object found ?
    if (!clickedObject) return;

    this[`_${type}`](clickedObject);

  }

  _delete(object) {
    object.location = new Vector(-100, -100);
  }

  _drag(object) {
    // handle dragging on mouse move
    const draging = ({ x, y }) => {
      console.log('dragging;');
      object.location = new Vector(x - canvasCfg.blockSize / 2, y - canvasCfg.blockSize / 2);
    };
    // handle unbind event listeners
    const unbind = () => {
      console.log('unbind!');
      window.removeEventListener('mousemove', draging);
      window.removeEventListener('click', unbind);
    };
    // add event listen
    window.addEventListener('mousemove', draging);
    // unbind event listen after click
    window.addEventListener('click', unbind);
  }
};

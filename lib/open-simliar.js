'use babel';
/*jshint esversion: 6 */

import { CompositeDisposable } from 'atom';
import * as fs from 'fs';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-simliar:open': () => this.openSimilar()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  openSimilar() {
    let editor, file, folderpath, filename;
    editor = atom.workspace.getActivePaneItem();
    if (editor) {
      file = editor.buffer.file;
      if (file) {
        filename = file.path.substring(file.path.lastIndexOf("/") + 1).replace(/\.[^/.]+$/, "");
        folderpath = file.path.substring(0, file.path.lastIndexOf("/"));
        fs.readdir(folderpath, {}, (err, files) => {
          files.forEach(file => {
            if (file.indexOf(".") > -1) {
              atom.workspace.open(folderpath + "/" + file);
            }
          });
        });
      }
    }
  }

};

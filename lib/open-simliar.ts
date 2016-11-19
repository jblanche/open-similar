'use babel';

import { CompositeDisposable } from 'atom';

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
    let editor, file, filepath;
    editor = atom.workspace.getActivePaneItem()
    if (editor) {
      file = editor.buffer.file
      if (file) {
        filePath = file.path

        let nearbyTxt = filePath.replace(/\.[^/.]+$/, "txt");
        console.log("nearbyTxt", nearbyTxt)
        atom.workspace.open(nearbyTxt);
      }
    }


    console.log("trying!", filePath);
  }

};

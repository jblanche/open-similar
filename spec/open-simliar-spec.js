'use babel';

import OpenSimliar from '../lib/open-simliar';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('OpenSimliar', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('open-simliar');
  });

  describe('when the open-simliar:open event is triggered', () => {
    it('opens all files with same name', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.open-simliar')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'open-simliar:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.open-simliar')).toExist();

        let openSimliarElement = workspaceElement.querySelector('.open-simliar');
        expect(openSimliarElement).toExist();

        let openSimliarPanel = atom.workspace.panelForItem(openSimliarElement);
        expect(openSimliarPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'open-simliar:toggle');
        expect(openSimliarPanel.isVisible()).toBe(false);
      });
    });
  });
});

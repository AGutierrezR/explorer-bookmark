import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'explorer-manager-bookmark.helloWorld',
    () => {
      vscode.window.showInformationMessage(
        'Hello World from Explorer Manager!',
      );
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

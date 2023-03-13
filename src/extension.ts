import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    ...[
      vscode.commands.registerCommand(
        'explorer-manager-bookmark.refreshEntry',
        () => {
          vscode.window.showInformationMessage('refreshEntry command!');
        },
      ),
      vscode.commands.registerCommand(
        'explorer-manager-bookmark.addEntry',
        (args) => {
          vscode.window.showInformationMessage('addEntry command!');
        },
      ),
      vscode.commands.registerCommand(
        'explorer-manager-bookmark.removeEntry',
        (args) => {
          vscode.window.showInformationMessage('removeEntry command!');
        },
      ),
    ],
  );
}

export function deactivate() {}

import * as vscode from 'vscode';
import { ExplorerManagerBookmark } from './ExplorerManagerBookmark';

export function activate(context: vscode.ExtensionContext) {
  const explorerBookmark = new ExplorerManagerBookmark();

  vscode.window.registerTreeDataProvider(
    'explorer-manager-bookmark',
    explorerBookmark,
  );

  context.subscriptions.push(
    ...[
      vscode.commands.registerCommand(
        'explorer-manager-bookmark.refreshEntry',
        () => explorerBookmark.refresh(),
      ),
      vscode.commands.registerCommand(
        'explorer-manager-bookmark.openFile',
        (file) => {
          vscode.commands.executeCommand(
            'vscode.open',
            vscode.Uri.parse(file.resourceUri.path),
          );
        },
      ),
      vscode.commands.registerCommand(
        'explorer-manager-bookmark.addEntry',
        (file) => explorerBookmark.addEntry(vscode.Uri.parse(file.path)),
      ),
      vscode.commands.registerCommand(
        'explorer-manager-bookmark.removeEntry',
        (file) => explorerBookmark.removeEntry(file.resourceUri),
      ),
    ],
  );
}

export function deactivate() {}

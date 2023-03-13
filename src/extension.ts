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
        'explorer-manager-bookmark.addEntry',
        () => explorerBookmark.addEntry(),
      ),
      vscode.commands.registerCommand(
        'explorer-manager-bookmark.removeEntry',
        () => explorerBookmark.removeEntry(),
      ),
    ],
  );
}

export function deactivate() {}

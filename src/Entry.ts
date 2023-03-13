import * as vscode from 'vscode';

export class Entry extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    uri: vscode.Uri,
  ) {
    super(label, collapsibleState);
    this.tooltip = uri.fsPath;
    this.resourceUri = uri;
    this.command =
      collapsibleState === vscode.TreeItemCollapsibleState.None
        ? {
            arguments: [this],
            command: 'explorer-manager-bookmark.openFile',
            title: this.label,
          }
        : undefined;
  }
}

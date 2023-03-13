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
  }
}

import * as vscode from 'vscode';
import * as path from 'path';
import { Entry } from './Entry';

export class ExplorerManagerBookmark implements vscode.TreeDataProvider<Entry> {
  private addedEntries: vscode.Uri[] = [];

  private _onDidChangeTreeData: vscode.EventEmitter<
    Entry | undefined | null | void
  > = new vscode.EventEmitter<Entry | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Entry | undefined | null | void> =
    this._onDidChangeTreeData.event;

  getTreeItem(element: Entry): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  async getChildren(element?: Entry): Promise<Entry[]> {
    if (this.addedEntries.length > 0) {
      return this.createEntries(this.addedEntries);
    }

    return Promise.resolve([]);
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  addEntry(uri: vscode.Uri | undefined) {
    if (uri) {
      this.addedEntries.push(uri);
    }

    this.refresh();
  }

  removeEntry() {
    console.log('removeEntry');
  }
  private async createEntries(addedEntries: vscode.Uri[]) {
    let entries: Entry[] = [];

    for (const item of addedEntries) {
      let entryType = (await vscode.workspace.fs.stat(item)).type;

      entries.push(
        new Entry(
          `${path.basename(item.path)}`,
          entryType === vscode.FileType.File
            ? vscode.TreeItemCollapsibleState.None
            : vscode.TreeItemCollapsibleState.Collapsed,
          item,
        ),
      );
    }

    return entries;
  }
}

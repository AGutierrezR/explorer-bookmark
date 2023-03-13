import * as vscode from 'vscode';
import * as path from 'path';
import { Entry } from './Entry';
import { getCollapsibleStateByType } from './utils/getCollapsibleStateByType';

export class ExplorerManagerBookmark implements vscode.TreeDataProvider<Entry> {
  private addedEntries: Entry[] = [];

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
      return this.addedEntries;
    }

    return Promise.resolve([]);
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  async addEntry(uri: vscode.Uri | undefined) {
    if (uri) {
      const entryType = (await vscode.workspace.fs.stat(uri)).type;
      const collapsibleState = getCollapsibleStateByType(entryType);

      this.addedEntries.push(
        new Entry(`${path.basename(uri.path)}`, collapsibleState, uri),
      );
    }

    this.refresh();
  }

  removeEntry() {
    console.log('removeEntry');
  }


}

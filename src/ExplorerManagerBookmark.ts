import * as vscode from 'vscode';
import { Entry } from './Entry';

export class ExplorerManagerBookmark implements vscode.TreeDataProvider<Entry> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    Entry | undefined | null | void
  > = new vscode.EventEmitter<Entry | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Entry | undefined | null | void> =
    this._onDidChangeTreeData.event;

  getTreeItem(element: Entry): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  async getChildren(element?: Entry): Promise<Entry[]> {
    return Promise.resolve([]);
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  addEntry() {
    console.log('addEntry');
  }

  removeEntry() {
    console.log('removeEntry');
  }
}

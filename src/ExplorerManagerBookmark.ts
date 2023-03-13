import * as vscode from 'vscode';
import { Entry } from './Entry';

export class ExplorerManagerBookmark implements vscode.TreeDataProvider<Entry> {
  getTreeItem(element: Entry): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  async getChildren(element?: Entry): Promise<Entry[]> {
    return Promise.resolve([]);
  }

  refresh() {
    console.log('refresh');
  }

  addEntry() {
    console.log('addEntry');
  }

  removeEntry() {
    console.log('removeEntry');
  }
}

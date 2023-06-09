import * as vscode from 'vscode';
import * as path from 'path';
import { Entry } from './Entry';
import { nativeFileSorting } from './utils/nativeFilesOrder';
import { getCollapsibleStateByType } from './utils/getCollapsibleStateByType';
import { safe } from './utils/safe';

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
    if (element?.resourceUri) {
      return this.directorySearch(element.resourceUri);
    }

    if (this.addedEntries.length > 0) {
      return this.createEntries(this.addedEntries);
    }

    return Promise.resolve([]);
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  async addEntry(uri: vscode.Uri | undefined) {
    if (uri) {
      this.addedEntries.push(uri);
    }

    this.refresh();
  }

  removeEntry(uri: vscode.Uri | undefined) {
    if (uri) {
      const index = this.addedEntries.indexOf(uri);
      if (index > -1) {
        this.addedEntries.splice(index, 1);
      }
    }
    this.refresh();
  }

  private async directorySearch(uri: vscode.Uri) {
    const folders = await vscode.workspace.fs.readDirectory(uri);
    return folders.sort(nativeFileSorting).map((item) => {
      const [name, type] = item;
      const collapsibleState = getCollapsibleStateByType(type);

      return new Entry(
        name,
        collapsibleState,
        vscode.Uri.joinPath(uri, '/' + name),
      );
    });
  }

  private async createEntries(addedEntries: vscode.Uri[]) {
    let entries: Entry[] = [];

    for (const item of addedEntries) {
      const [entryType, fileNotFound] = await safe(() =>
        vscode.workspace.fs.stat(item).then((stat) => stat.type),
      );

      if (fileNotFound || !entryType) {
        continue;
      }

      const collapsibleState = getCollapsibleStateByType(entryType);

      entries.push(
        new Entry(
          `${path.basename(item.path)}`,
          collapsibleState,
          item,
        ).setContextValue('savedEntry'),
      );
    }

    return entries;
  }
}

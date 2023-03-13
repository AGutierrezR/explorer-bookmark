import * as vscode from 'vscode';

export function getCollapsibleStateByType(fileType: vscode.FileType) {
  return fileType === vscode.FileType.File
    ? vscode.TreeItemCollapsibleState.None
    : vscode.TreeItemCollapsibleState.Collapsed;
}

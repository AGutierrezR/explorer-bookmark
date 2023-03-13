import * as vscode from 'vscode';

export function nativeFileSorting(
  a: [string, vscode.FileType],
  b: [string, vscode.FileType],
) {
  if (a[1] === vscode.FileType.Directory && b[1] === vscode.FileType.File) {
    return -1;
  }
  if (a[1] === vscode.FileType.File && b[1] === vscode.FileType.Directory) {
    return 1;
  }

  return a[0].localeCompare(b[0]);
}

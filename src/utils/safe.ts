import * as vscode from 'vscode';

export async function safe(
  callback: () => Thenable<vscode.FileType>,
): Promise<[vscode.FileType, undefined] | [undefined, Error]> {
  try {
    const success = await callback();
    return [success, undefined];
  } catch (error) {
    return [undefined, error as Error];
  }
}

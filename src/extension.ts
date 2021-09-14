import * as vscode from "vscode";
import * as fs from "fs-extra";
import sortobject from "deep-sort-object";
import prettier from "prettier";

export async function activate(context: vscode.ExtensionContext) {
  const { readJsonSync, writeFileSync } = fs;
  const { format } = prettier;

  const disposable = vscode.workspace.onDidSaveTextDocument(
    ({ uri: { path } }: vscode.TextDocument) => {
      if (!path.endsWith(".json")) {
        return;
      }

      const json = readJsonSync(path);
      const sortedJson = sortobject(json);

      writeFileSync(
        path,
        format(JSON.stringify(sortedJson), { parser: "json-stringify" })
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

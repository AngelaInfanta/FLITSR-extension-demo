// Import the module and reference it with the alias vscode in your code below

const { runProjectWithInputFile } = require('./extension_inputFile');
const { runProjectWithInputFolder } = require('./extension_inputFolder');
const { inputPercent_at_n_file} = require('./extension_percentAtNPlot');

// Use the imported functions in your extension

const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const outputChannel = vscode.window.createOutputChannel('Output Panel');

	outputChannel.appendLine('Congratulations, your extension "flitsr-extension-demo" is now active!');
	
	const command = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr "$@" `;
	exec(command, (error, stdout, stderr) => {
        if (error) {
            outputChannel.appendLine(`Error executing command: ${error}`);
            return;
        }
        if (stderr) {
            outputChannel.appendLine(`Std Error: ${stderr}`);
        }
			outputChannel.appendLine(`Flitsr argument ${stdout}`);
    });

	let disposable3 = vscode.commands.registerCommand('flitsr-extension-demo.showInputPanel', () => {
        const panel = vscode.window.createWebviewPanel(
            'inputPanel', // Identifies the type of the webview. Used internally
            'Input Panel', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true, // Enable JavaScript in the webview panel
            }
        );

		const htmlPath = path.join(context.extensionPath, 'extension_inputPanel.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        // HTML content for the webview panel
        panel.webview.html = htmlContent;
		panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'submitForm':
					const { flitsr_arg,  fileName, filePath,folderPath } = JSON.parse(message.data);
					// Pass the data to your functions
					//testUserInterface(flitsr_arg,  fileName, filePath, folderPath);
					                    // Process the file path and show the output in the output channel
					try {					
						outputChannel.appendLine('Input flitsr Argument: ' + flitsr_arg);
							outputChannel.appendLine('File Name: ' +  fileName);
							outputChannel.appendLine('File Path: ' + filePath);
						outputChannel.appendLine('Folder Path: ' + folderPath);

						//runProjectWithInputFile(fileName, filePath, flitsr_arg, outputChannel);
						runProjectWithInputFolder(folderPath,  outputChannel);
						
					} catch (error) {
						outputChannel.appendLine('Error reading file: ' + error.message);
					}
					outputChannel.show(); // Show the output channel
					break;
			}
		});
		
    });

    context.subscriptions.push(disposable3);

}

// This method is called when your extension is deactivated
function deactivate() {
	console.log("Deactivated Extension.");
}

module.exports = {
	activate,
	deactivate
}
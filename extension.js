// Import the module and reference it with the alias vscode in your code below

const { runProjectWithInputFile } = require('./extension_inputFile');
const { runProjectWithInputFolder } = require('./extension_inputFolder');
const { inputPercent_at_n_file} = require('./extension_percentAtNPlot');
//const {testUserInterface} = require('./extension_userinterface');

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

	outputChannel.appendLine('Congratulations, your extension "FLITSR SBFL" is now active!');

	const FLITSR_HOME = process.env.FLITSR_HOME;
	const VENV_PATH = `${FLITSR_HOME}/.venv/bin/python3`;
	//console.log(process.env);
	const env = Object.create(process.env);
	env.PATH = `${FLITSR_HOME}/bin:${env.PATH}`;
	env.PYTHONPATH = `${FLITSR_HOME}:${env.PYTHONPATH || ''}`;

	const command = `${VENV_PATH} -m flitsr "$@"`;	
	
	exec(command, { env: env}, (error, stdout, stderr) => {
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
            'Input Panel for Localisation', // Title of the panel displayed to the user
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
					const { flitsr_arg,  fileName, filePath, folderPath, isTCM } = JSON.parse(message.data);
					// Process the file path and show the output in the output channel
					try {					
						outputChannel.appendLine('Input flitsr Argument: ' + flitsr_arg);
							outputChannel.appendLine('File Name: ' +  fileName);
							outputChannel.appendLine('File Path: ' + filePath);
						outputChannel.appendLine('Folder Path: ' + folderPath);
						outputChannel.appendLine('isTCM : ' + isTCM);
						if (fileName == 'Not provided'  && folderPath == 'Not provided'){
							outputChannel.appendLine('Please provide either a file or a folder to proceed');
							outputChannel.appendLine("--------------------------------------------------------------------------------------------------------------------");
						}
						else if (folderPath == 'Not provided'){
							runProjectWithInputFile(VENV_PATH, env, fileName, filePath, flitsr_arg, outputChannel);
							}
						else if (fileName == 'Not provided'){
							runProjectWithInputFolder(FLITSR_HOME, VENV_PATH, env, folderPath, isTCM, outputChannel);
							}
					} catch (error) {
						outputChannel.appendLine('Error reading file: ' + error.message);
					}
					outputChannel.show(); // Show the output channel
					break;
			}
		});
		
    });

    context.subscriptions.push(disposable3);

	let disposable4 = vscode.commands.registerCommand('flitsr-extension-demo.showPlottingInputPanel', () => {
        const panel2 = vscode.window.createWebviewPanel(
            'plottingInputPanel', // Identifies the type of the webview. Used internally
            'Input Panel for Plotting', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true, // Enable JavaScript in the webview panel
            }
        );

		const htmlPath2 = path.join(context.extensionPath, 'extension_plottingInputPanel.html');
        const htmlContent2 = fs.readFileSync(htmlPath2, 'utf8');

        // HTML content for the webview panel
        panel2.webview.html = htmlContent2;

		panel2.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'submitForm':
					const { metrics, flitsrs, mode, linearLog, all, fileName, filePath} = JSON.parse(message.data);
					// Process the file path and show the output in the output channel
					try {					
							outputChannel.appendLine('Input metrics: ' + metrics);
							outputChannel.appendLine('Input flitsrs: ' + flitsrs);
							outputChannel.appendLine('File Name: ' +  fileName);
							outputChannel.appendLine('File Path: ' + filePath);
							outputChannel.appendLine('Mode: ' + mode);
							outputChannel.appendLine('Linear/Log: ' +  linearLog);
							outputChannel.appendLine('All?: ' + all);
						if (filePath == 'Not provided' || fileName != 'perc_at_n_results'){
							outputChannel.appendLine('Please provide a perc_at_n_results file to proceed');
							outputChannel.appendLine("--------------------------------------------------------------------------------------------------------------------");
						}
						else {
							inputPercent_at_n_file(VENV_PATH, env, filePath, fileName, metrics, flitsrs, mode, linearLog, all, outputChannel);
							}
					} catch (error) {
						outputChannel.appendLine('Error reading file: ' + error.message);
					}
					outputChannel.show(); // Show the output channel
					break;
			}
		});
		
    });

    context.subscriptions.push(disposable4);

}

// This method is called when your extension is deactivated
function deactivate() {
	console.log("Deactivated Extension.");
}

module.exports = {
	activate,
	deactivate
}
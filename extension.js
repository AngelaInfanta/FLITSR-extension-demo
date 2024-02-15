// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { execSync, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

//Function for input folder containing coverage files
//example: /home/java_bug_projects/TCM/Jester1.37b_tests/8-fault


//Functions for input command :

//example: flitsr <input file> dstar
async function runProjectWithInputFile(inputFilePath, fileName,  dir) {
    const FLITSR_HOME= '/home/angela/Desktop/FLITSR/flitsr';
	const userInput = await vscode.window.showInputBox(
		{
			prompt : "Enter flitsr input as per requirement : ",
			placeholder : "Enter here ..."
		}
	)
	const command = `python3 ${FLITSR_HOME}/flitsr "$@" '${fileName}' ${userInput}`;
	//const command= `python3 ${FLITSR_HOME}/flitsr "$@"`;
	console.log("Input File : ",inputFilePath);
	console.log("Working dir : ",dir);
	console.log("Command ran : ", command);
    exec(command, { cwd: dir }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`Std Error: ${stderr}`);
        }
		vscode.window.showInformationMessage(`Output for "${userInput}" : ${stdout}`);
    });
}


//example: run_all tcm
function runProjectWithInputFolder(inputFolderPath) {
    const FLITSR_HOME= '/home/angela/Desktop/FLITSR/flitsr';
	//const command1= `${FLITSR_HOME}/bin/flitsr`;	
	const command1 = `${FLITSR_HOME}/bin/run_all tcm`;
	console.log("Input Folder : ",inputFolderPath);
	console.log("Command ran : ", command1);

	const env = Object.create(process.env);
	env.PATH = `${FLITSR_HOME}${path.delimiter}${env.PATH}`;
	console.log("PATH: ", env.PATH);
    exec(command1, { cwd: inputFolderPath, env: env.PATH}, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }
        console.log(`Output: ${stdout}`);
        if (stderr) {
            console.error(`Std Error: ${stderr}`);
        }
    });
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "flitsr-extension-demo" is now active!');


	let disposable = vscode.commands.registerCommand('flitsr-extension-demo.uploadCoverageFile', async () => {
		const fileUri = await vscode.window.showOpenDialog({
			canSelectFolders: false,
			canSelectFiles: true,
			openLabel: "Select Coverage File",
		});
		
		if (fileUri && fileUri[0]){
			const selectedFilePath = fileUri[0].fsPath;
			const selectedFile =  path.basename(selectedFilePath)
			const selectedDir=  path.dirname(selectedFilePath )
			//Execute the script required:
			runProjectWithInputFile(selectedFilePath, selectedFile, selectedDir);
		}
	});

	context.subscriptions.push(disposable);


	let disposable2 = vscode.commands.registerCommand('flitsr-extension-demo.uploadCoverageFolder', async () => {
		const folderUri = await vscode.window.showOpenDialog({
			canSelectFolders: true,
			canSelectFiles: false,
			openLabel: "Select Coverage Folder",
		});
	
		if (folderUri && folderUri[0]){
			const selectedFolder = folderUri[0].fsPath;
			//Execute the script required:
			runProjectWithInputFolder(selectedFolder);
		}
	});

	context.subscriptions.push(disposable2);

}

// This method is called when your extension is deactivated
function deactivate() {
	console.log("Deactivated Extension.");
}

module.exports = {
	activate,
	deactivate
}

const { exec } = require('child_process');
const path = require('path');
const vscode = require('vscode');

//Function for input folder containing coverage files
//example: /home/java_bug_projects/TCM/Jester1.37b_tests/8-fault
//example: run_all tcm

function runProjectWithInputFolder(inputFolderPath, outputChannel) {
    const FLITSR_HOME= '/home/angela/Desktop/FLITSR/flitsr';
	const PATH= `${FLITSR_HOME}/bin`;
	//const command1= `${FLITSR_HOME}/bin/flitsr`;	
	const command1 = `${PATH}/run_all tcm`;

	vscode.window.showInformationMessage("Command ran : ", command1);

	const env = Object.create(process.env);
	env.PATH = `${FLITSR_HOME}${path.delimiter}${PATH}${path.delimiter}${env.PATH}`;
	const childProcess = exec(command1, { cwd: inputFolderPath, env: env.PATH});

    childProcess.stdout.on('data', (data) => {
		outputChannel.appendLine(`stdout: ${data}`);
	});
	childProcess.stderr.on('data', (data) => {
		outputChannel.appendLine(`stderr: ${data}`);
	});
	childProcess.on('close', (code) => {
		outputChannel.appendLine(`Results generating..`);
		if (code == 0){
			outputChannel.appendLine(`Done. Check the corresponding folder for generated result.`);
			outputChannel.appendLine("-------------------------------------------------------------------------");
		}
	});

}

module.exports = {
    runProjectWithInputFolder
}
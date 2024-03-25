const { exec } = require('child_process');
const path = require('path');
const vscode = require('vscode');

//Function for input folder containing coverage files
//example: /home/java_bug_projects/TCM/Jester1.37b_tests/8-fault

function runProjectWithInputFolder(inputFolderPath, type, outputChannel) {
    const FLITSR_HOME= '/home/angela/Desktop/FLITSR/flitsr';
	const PATH= `${FLITSR_HOME}/bin`;

	const env = Object.create(process.env);
	env.PATH = `${FLITSR_HOME}${path.delimiter}${PATH}${path.delimiter}${env.PATH}`;
	
	var command1, command2, childProcess1,childProcess2;

	// if type is tcm-java then:
	if(type == 'true'){

		// `run_all tcm`
		command1 = `${PATH}/run_all tcm`;
		vscode.window.showInformationMessage("Command ran : ", command1);

		childProcess1 = exec(command1, { cwd: inputFolderPath, env: env.PATH});
		childProcess1.stdout.on('data', (data) => {
			outputChannel.appendLine(`stdout: ${data}`);
		});
		childProcess1.stderr.on('data', (data) => {
			outputChannel.appendLine(`stderr: ${data}`);
		});
		childProcess1.on('close', (code) => {
			outputChannel.appendLine(`Results generating..`);
			if (code == 0){
				outputChannel.appendLine(`Check the corresponding folder for generated results in the format __.results.`);
				outputChannel.appendLine(`Done generating results & perc_n_results.`);
				outputChannel.appendLine("-------------------------------------------------------------------------");
			}
		});
	}	
	//type is gzoltar-java then:
	else{
		const pattern = '/sfl/txt';
		const slicedPath = inputFolderPath.substring(0, inputFolderPath.lastIndexOf(pattern) + 1);
		outputChannel.appendLine("Current directory: " + slicedPath);
		//`flitsr sfl/txt/ all`;
		command1 = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr "$@" txt/ all`;
		vscode.window.showInformationMessage("Command ran : ", command1);
		outputChannel.appendLine(`TYPE: GZOLTAR (JAVA)---------------------------->`);

		childProcess1 = exec(command1, { cwd: slicedPath, env: env.PATH});
		childProcess1.stdout.on('data', (data) => {
			outputChannel.appendLine(`stdout: ${data}`);
		});
		childProcess1.stderr.on('data', (data) => {
			outputChannel.appendLine(`stderr: ${data}`);
		});
		childProcess1.on('close', (code) => {
			outputChannel.appendLine(`Results generating..`);
			if (code == 0){
				outputChannel.appendLine(`Done generating .txt files for all the metrics.`);
			}
		});

		//run_all
		command2 = `${PATH}/run_all`;

		outputChannel.appendLine("--------------------------Doing a 'rull_all'------------------------------------");
		vscode.window.showInformationMessage("Command ran : ", command2);

		childProcess2 = exec(command2, { cwd: slicedPath, env: env.PATH});
		childProcess2.stdout.on('data', (data) => {
			outputChannel.appendLine(`stdout: ${data}`);
		});
		childProcess2.stderr.on('data', (data) => {
			outputChannel.appendLine(`stderr: ${data}`);
		});
		childProcess2.on('close', (code) => {
			outputChannel.appendLine(`Results generating for run_all..`);
			if (code == 0){
				outputChannel.appendLine(`Check the corresponding folder for generated results in the format __.results.`);
				outputChannel.appendLine(`Done generating results & perc_n_results.`);
				outputChannel.appendLine("-------------------------------------------------------------------------");
			}
		});
	}
}

module.exports = {
    runProjectWithInputFolder
}
const { exec } = require('child_process');
const vscode = require('vscode');

//Function for input folder containing coverage files
//example: /home/java_bug_projects/TCM/Jester1.37b_tests/8-fault

function runProjectWithInputFolder(FLITSR_HOME, VENV_PATH, env, inputFolderPath, type, outputChannel) {
	const PATH= `${FLITSR_HOME}/bin`;
	
	var command1, command2, childProcess1;

	// if type is tcm-java then:
	if(type == 'true'){

		// `run_all tcm`
		command1 = `${PATH}/run_all tcm`;
		vscode.window.showInformationMessage("Command ran : ", command1);

		childProcess1 = exec(command1, { cwd: inputFolderPath, env: env});
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
		command1 = `${VENV_PATH} -m flitsr "$@" sfl/txt/ all`;
		command2 = `${PATH}/run_all`;
		vscode.window.showInformationMessage("Command ran : ", command1);
		outputChannel.appendLine(`TYPE: GZOLTAR (JAVA)-: Doing cmd1: --------------------------->`);

		exec(command1, { cwd: slicedPath, env:env }, (error1, stdout1, stderr1) => {
			if (error1) {
				outputChannel.appendLine(`Error executing command1: ${error1}`);
				return;
			}
			if (stderr1) {
				outputChannel.appendLine(`Std Error cmd1: ${stderr1}`);
			}
			if (stdout1) {
				outputChannel.appendLine(`Std Out cmd1: ${stdout1}`);
			}
			outputChannel.appendLine(`Done generating .txt files for all the metrics.`);
		
			exec(command2, { cwd: slicedPath, env:env }, (error2, stdout2, stderr2) => {
				if (error2) {
					outputChannel.appendLine(`Error executing run_all script: ${error2}`);
		
				}
				if (stderr2) {
					outputChannel.appendLine(`Std Error (run_all): ${stderr2}`);
					return;
				}
				if (stdout2) {
					outputChannel.appendLine(`Std Out (run_all): ${stdout2}`);
				}
				
			});
		});
	}
	outputChannel.appendLine("----------------------------------------------- Check your folder for corresponding results & perc_n_results.---------------------------------------------");
}

module.exports = {
    runProjectWithInputFolder
}
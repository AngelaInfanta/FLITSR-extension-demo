//example: flitsr <input file> dstar
const { exec } = require('child_process');
const vscode = require('vscode');

async function runProjectWithInputFile(fileName, dir, userInput, outputChannel) {

	const command = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr "$@" '${fileName}' ${userInput}`;
	//const command= `python3 ${FLITSR_HOME}/flitsr "$@"`;
	vscode.window.showInformationMessage("Command ran : ", command);
    exec(command, { cwd: dir }, (error, stdout, stderr) => {
        if (error) {
            outputChannel.appendLine(`Error executing command: ${error}`);
            return;
        }
        if (stderr) {
            outputChannel.appendLine(`Std Error: ${stderr}`);
        }
		if (userInput == 'all') {
			outputChannel.appendLine(`Done. Check the corresponding folder for output files.`)
		}
		else {
			outputChannel.appendLine(`Output for "${userInput}" : ${stdout}`);
			outputChannel.appendLine("Done");
		}
    });
	//console.log("Done");	
}

module.exports = {
    runProjectWithInputFile
}
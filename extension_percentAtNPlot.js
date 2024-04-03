
//example: percent_at_n plot perc_at_n_results metrics=['DStar','Gp13','Harmonic'] flitsrs=['Harmonic']
const { exec } = require('child_process');
const vscode = require('vscode');

function inputPercent_at_n_file(VENV_PATH, env, dir, fileName, metrics, flitsrs, mode, linearLog, all, outputChannel){
var percentAtNCommand;

if (all == 'all'){
    percentAtNCommand = `${VENV_PATH} -m flitsr.percent_at_n plot "$@" ${fileName} ${linearLog} ${all}`;
    vscode.window.showInformationMessage(`Command ran : percent_at_n plot ${fileName} ${linearLog} ${all}`);
}
else if (mode == 'mode'){
    percentAtNCommand = `${VENV_PATH} -m flitsr.percent_at_n plot "$@" ${fileName} ${mode} metrics=[${metrics}] ${linearLog}`;
    vscode.window.showInformationMessage(`Command ran : percent_at_n plot ${fileName} ${mode} metrics=[${metrics}] ${linearLog}`);
}
else {
    percentAtNCommand = `${VENV_PATH} -m flitsr.percent_at_n plot "$@" ${fileName} metrics=[${metrics}] flitsrs=[${flitsrs}] ${linearLog}`;
    vscode.window.showInformationMessage(`Command ran : percent_at_n plot ${fileName} metrics=[${metrics}] flitsrs=[${flitsrs}] ${linearLog}`);
}
exec(percentAtNCommand, { cwd: dir, env:env }, (error1, stdout1, stderr1) => {
    if (error1) {
        outputChannel.appendLine(`Error executing percent_at_n script: ${error1}`);
        return;
    }
    if (stderr1) {
        outputChannel.appendLine(`Std Error (percent_at_n): ${stderr1}`);
    }
    if (stdout1) {
        outputChannel.appendLine(`Std Out (percent_at_n): ${stdout1}`);
    }
});
}

module.exports = {
    inputPercent_at_n_file
}
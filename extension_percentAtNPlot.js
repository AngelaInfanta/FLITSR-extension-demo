
//example: percent_at_n plot perc_at_n_results metrics=['DStar','Gp13','Harmonic'] flitsrs=['Harmonic']
const { exec } = require('child_process');
const vscode = require('vscode');

function inputPercent_at_n_file(dir, fileName, metrics, flitsrs, mode, linearLog, all, outputChannel){
var percentAtNCommand, plotCommand;

if (all == 'all'){
    percentAtNCommand = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr/percent_at_n.py  "$@" plot ${fileName} ${mode} ${linearLog} ${all}`;
    plotCommand = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr/plot.py "$@" ${fileName} ${mode} ${linearLog} ${all}`;    
    vscode.window.showInformationMessage(`Command ran : percent_at_n plot perc_at_n_results ${mode} ${linearLog} ${all}`);
}
else {
    percentAtNCommand = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr/percent_at_n.py  "$@" plot  ${fileName} metrics=[${metrics}] flitsrs=[${flitsrs}] ${mode} ${linearLog}`;
    plotCommand = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr/plot.py "$@" ${fileName} metrics=[${metrics}] flitsrs=[${flitsrs}] ${mode} ${linearLog}`;
    vscode.window.showInformationMessage(`Command ran : percent_at_n plot perc_at_n_results metrics=[${metrics}] flitsrs=[${flitsrs}] ${mode} ${linearLog}`);
}
exec(percentAtNCommand, { cwd: dir }, (error1, stdout1, stderr1) => {
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

    exec(plotCommand, { cwd: dir }, (error2, stdout2, stderr2) => {
        if (error2) {
            outputChannel.appendLine(`Error executing plot script: ${error2}`);

        }
        if (stderr2) {
            outputChannel.appendLine(`Std Error (plot): ${stderr2}`);
            return;
        }
        if (stdout2) {
            outputChannel.appendLine(`Std Out (plot): ${stdout2}`);
        }
        outputChannel.appendLine("----------------------------------------------- Done ---------------------------------------------");
    });
});
}

module.exports = {
    inputPercent_at_n_file
}
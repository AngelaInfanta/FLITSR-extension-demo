
//example: percent_at_n plot perc_at_n_results metrics=['DStar','Gp13','Harmonic'] flitsrs=['Harmonic']
const { exec } = require('child_process');
const vscode = require('vscode');

function inputPercent_at_n_file(dir, fileName, metrics, flitsrs, outputChannel){
console.log("Percent_at_n file as input");

const percentAtNCommand = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr/percent_at_n.py  "$@" plot  ${fileName} metrics=[${metrics}] flitsrs=[${flitsrs}]`;
const plotCommand = `python3 /home/angela/Desktop/FLITSR/flitsr/flitsr/plot.py "$@" ${fileName} metrics=[${metrics}] flitsrs=[${flitsrs}]`;

vscode.window.showInformationMessage(`Command ran : percent_at_n plot perc_at_n_results metrics=[${metrics}] flitsrs=[${flitsrs}]`);

exec(percentAtNCommand, { cwd: dir }, (error1, stdout1, stderr1) => {
    if (error1) {
        outputChannel.appendLine(`Error executing percent_at_n script: ${error1}`);
        return;
    }
    if (stderr1) {
        outputChannel.appendLine(`Std Error (percent_at_n): ${stderr1}`);
    }

    exec(plotCommand, { cwd: dir }, (error2, stdout2, stderr2) => {
        if (error2) {
            outputChannel.appendLine(`Error executing plot script: ${error2}`);

        }
        if (stderr2) {
            outputChannel.appendLine(`Std Error (plot): ${stderr2}`);
            return;
        }

        outputChannel.appendLine("----------------------------------------------- Done ---------------------------------------------");
    });
});
}

module.exports = {
    inputPercent_at_n_file
}
# FLITSR for Visual Studio Code

The FLITSR Extension for Visual Studio Code enhances the fault localization process by providing a user-friendly interface for generating results of fault localization and identification techniques for software faults and failures and visualizing these results. This extension aims to improve the efficiency and effectiveness of fault localization techniques in software development.
![Input Panel for Fault localisation](https://media.githubusercontent.com/media/AngelaInfanta/FLITSR-extension-demo/main/extension_images/Show_IP_panel_TCM.gif)

## Features

- **User-friendly Interface**: Avoid the hassle of too many commands to run. Generate the relts and easily select metrics and FLITSRs using checkboxes.
- **Customizable Selection**: Choose from a variety of metrics and FLITSRs to tailor the fault localization process.
- **Automated Processing**: Automates the process of fetching metrics and FLITSRs, saving time and effort.
- **Visualization**: Visualize the results for better understanding and analysis.

![Visualisation of the plots](https://media.githubusercontent.com/media/AngelaInfanta/FLITSR-extension-demo/main/extension_images/Show_plot_IP_panel.gif)

## Requirements

1. Make sure you have the flitsr-modified repository cloned in your system. You can access it from the link: https://github.com/AngelaInfanta/FLITSR-modified.git
2. Make sure to have $FLITSR_HOME env variable set to this repository in your system.

> Tip: This variable need not be set up explicitly since it is a part of the set up as mentioned in the repository.

3. The input data should be strictly in either of the formats: TCM(Java) or Gzoltar.

## Usage

1. Install the FLITSR Extension from the Visual Studio Code Marketplace.
2. Open the FLITSR Extension and use the input panel to select metrics and FLITSRs.
3. Generate results and perc_at_n_results using the input panel.
4. Use the plotting panel to visualize the results for better analysis.

## Release Notes

### 0.0.1

Initial release

---

**Enjoy!**

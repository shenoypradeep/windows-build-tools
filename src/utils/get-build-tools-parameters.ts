import { BUILD_TOOLS } from '../constants';

const debug = require('debug')('windows-build-tools');

export function getBuildToolsExtraParameters() {
  let extraArgs = '';

  if (process.env.npm_config_vcc_build_tools_parameters) {
    try {
      const parsedArgs = JSON.parse(process.env.npm_config_vcc_build_tools_parameters);

      if (parsedArgs && parsedArgs.length > 0) {
        extraArgs = parsedArgs.join('%_; ');
      }
    } catch (e) {
      debug(`Installer: Parsing additional arguments for VCC build tools failed: ${e.message}`);
      debug(`Input received: ${process.env.npm_config_vcc_build_tools_parameters}`);
    }
  }

  if (!!process.env.npm_config_include_arm64_tools && BUILD_TOOLS.version === 2017) {
    extraArgs += ' --add Microsoft.VisualStudio.Component.VC.Tools.ARM64 --add Microsoft.VisualStudio.Component.VC.ATL.ARM64';
  }

  return extraArgs;
}

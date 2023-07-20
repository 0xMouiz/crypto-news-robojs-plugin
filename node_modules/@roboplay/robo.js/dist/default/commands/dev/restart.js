import { devRestartCommandConfig, devRestartCommand } from '@roboplay/robo.js/dist/core/debug.js';

const config = devRestartCommandConfig;
var restart_default = devRestartCommand;

export { config, restart_default as default };

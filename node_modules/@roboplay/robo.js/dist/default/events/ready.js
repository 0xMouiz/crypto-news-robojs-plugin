import { logger, color, getConfig, getState, setState } from '@roboplay/robo.js';
import { STATE_KEYS, DEFAULT_CONFIG } from '@roboplay/robo.js/dist/core/constants.js';
import { ChannelType } from 'discord.js';

var ready_default = async (client) => {
  logger.ready(`On standby as ${color.bold(client.user.tag)} (${( new Date()).toLocaleString()})`);
  const config = getConfig();
  const restartData = getState(STATE_KEYS.restart);
  if (restartData) {
    const { channelId, startTime } = restartData;
    const channel = client.channels.cache.get(channelId);
    if (!channel || channel.type !== ChannelType.GuildText) {
      return;
    }
    channel.send(`\`\`\`
Successfully restarted in ${Date.now() - startTime}ms
\`\`\``);
    setState(STATE_KEYS.restart, void 0);
  }
  if (config.heartbeat?.url) {
    process.removeAllListeners("warning");
    setInterval(() => {
      if (!client?.isReady() || client?.uptime <= 0) {
        if (config.heartbeat.debug) {
          logger.warn("Robo is not ready, skipping heartbeat.");
        }
        return;
      }
      if (config.heartbeat.debug) {
        logger.debug("Sending heartbeat...", (/* @__PURE__ */ new Date()).toISOString());
      }
      fetch(config.heartbeat.url).catch((error) => {
        logger.debug("Heartbeat failed!", error);
      });
    }, config.heartbeat?.interval || DEFAULT_CONFIG.heartbeat.interval);
  }
};

export { ready_default as default };

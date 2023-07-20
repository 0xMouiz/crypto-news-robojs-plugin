import { CommandConfig } from "@roboplay/robo.js";
import { CommandInteraction, TextChannel } from "discord.js";

export const config: CommandConfig = {
  description: "What crypto should I look for its price?",
  options: [
    {
      description: "What is the crypto name?",
      name: "news",
      required: false,
    },
    {
      description: "Where should I send the message to?",
      name: "channel",
      type: "channel",
      required: true,
    },
  ],
};

interface NewsItem {
  title: string;
  imageUrl: string;
  url: string;
  source: string;
}

const getNews = async (channel: TextChannel) => {
  let monitoredArray: NewsItem[] = [];

  try {
    const response = await fetch(`https://crypto-news-api.vercel.app/api/news`);
    const data = await response.json();

    if (Array.isArray(data)) {
      monitoredArray = data;
    }
  } catch (err) {
    console.log("Error fetching data from the API:", err);
  }

  setInterval(async () => {
    try {
      const response = await fetch(
        `https://crypto-news-api.vercel.app/api/news`
      );
      const newData = await response.json();

      if (newData.length > 0) {
        const latestItem = newData.find(
          (item: NewsItem) =>
            !monitoredArray.some((oldItem) => oldItem.url === item.url)
        );

        if (latestItem) {
          const doubled = monitoredArray.find(
            (element) => element.url === latestItem.url
          );

          if (doubled) return;

          monitoredArray.push(latestItem);
          channel.send(latestItem.url);
        }
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  }, 36000);
};

export default async (interaction: CommandInteraction) => {
  const channel =
    interaction.options.get("channel")?.channel ?? interaction.channel;

  await getNews(channel as TextChannel);
  return "Here will be your crypto news";
};

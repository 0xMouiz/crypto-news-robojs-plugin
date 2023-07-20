export const config = {
    description: "What crypto should I look for its price?",
    options: [
        {
            description: "What is the crypto name?",
            name: "news",
            required: false
        },
        {
            description: "Where should I send the message to?",
            name: "channel",
            type: "channel",
            required: true
        }
    ]
};
const getNews = async (channel)=>{
    let monitoredArray = [];
    try {
        const response = await fetch(`https://crypto-news-api.vercel.app/api/news`);
        const data = await response.json();
        if (Array.isArray(data)) {
            monitoredArray = data;
        }
    } catch (err) {
        console.log("Error fetching data from the API:", err);
    }
    setInterval(async ()=>{
        try {
            const response = await fetch(`https://crypto-news-api.vercel.app/api/news`);
            const newData = await response.json();
            if (newData.length > 0) {
                const latestItem = newData.find((item)=>!monitoredArray.some((oldItem)=>oldItem.url === item.url));
                if (latestItem) {
                    const doubled = monitoredArray.find((element)=>element.url === latestItem.url);
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
export default (async (interaction)=>{
    const channel = interaction.options.get("channel")?.channel ?? interaction.channel;
    await getNews(channel);
    return "Here will be your crypto news";
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkU6XFxQcm9ncmFtbWluZ1xcUHJvamVjdHNcXFJvYm9QbGF5IFBsdWdpbnNcXGNyeXB0by1uZXdzLXBsdWdpblxcY3J5cHRvLW5ld3NcXHNyY1xcY29tbWFuZHNcXGNyeXB0by1uZXdzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmRDb25maWcgfSBmcm9tIFwiQHJvYm9wbGF5L3JvYm8uanNcIjtcclxuaW1wb3J0IHsgQ29tbWFuZEludGVyYWN0aW9uLCBUZXh0Q2hhbm5lbCB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnOiBDb21tYW5kQ29uZmlnID0ge1xyXG4gIGRlc2NyaXB0aW9uOiBcIldoYXQgY3J5cHRvIHNob3VsZCBJIGxvb2sgZm9yIGl0cyBwcmljZT9cIixcclxuICBvcHRpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIldoYXQgaXMgdGhlIGNyeXB0byBuYW1lP1wiLFxyXG4gICAgICBuYW1lOiBcIm5ld3NcIixcclxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZGVzY3JpcHRpb246IFwiV2hlcmUgc2hvdWxkIEkgc2VuZCB0aGUgbWVzc2FnZSB0bz9cIixcclxuICAgICAgbmFtZTogXCJjaGFubmVsXCIsXHJcbiAgICAgIHR5cGU6IFwiY2hhbm5lbFwiLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmludGVyZmFjZSBOZXdzSXRlbSB7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBpbWFnZVVybDogc3RyaW5nO1xyXG4gIHVybDogc3RyaW5nO1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBnZXROZXdzID0gYXN5bmMgKGNoYW5uZWw6IFRleHRDaGFubmVsKSA9PiB7XHJcbiAgbGV0IG1vbml0b3JlZEFycmF5OiBOZXdzSXRlbVtdID0gW107XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2NyeXB0by1uZXdzLWFwaS52ZXJjZWwuYXBwL2FwaS9uZXdzYCk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgIG1vbml0b3JlZEFycmF5ID0gZGF0YTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBBUEk6XCIsIGVycik7XHJcbiAgfVxyXG5cclxuICBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAgIGBodHRwczovL2NyeXB0by1uZXdzLWFwaS52ZXJjZWwuYXBwL2FwaS9uZXdzYFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBuZXdEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgaWYgKG5ld0RhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGxhdGVzdEl0ZW0gPSBuZXdEYXRhLmZpbmQoXHJcbiAgICAgICAgICAoaXRlbTogTmV3c0l0ZW0pID0+XHJcbiAgICAgICAgICAgICFtb25pdG9yZWRBcnJheS5zb21lKChvbGRJdGVtKSA9PiBvbGRJdGVtLnVybCA9PT0gaXRlbS51cmwpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKGxhdGVzdEl0ZW0pIHtcclxuICAgICAgICAgIGNvbnN0IGRvdWJsZWQgPSBtb25pdG9yZWRBcnJheS5maW5kKFxyXG4gICAgICAgICAgICAoZWxlbWVudCkgPT4gZWxlbWVudC51cmwgPT09IGxhdGVzdEl0ZW0udXJsXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIGlmIChkb3VibGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgbW9uaXRvcmVkQXJyYXkucHVzaChsYXRlc3RJdGVtKTtcclxuICAgICAgICAgIGNoYW5uZWwuc2VuZChsYXRlc3RJdGVtLnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBBUEk6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9LCAzNjAwMCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoaW50ZXJhY3Rpb246IENvbW1hbmRJbnRlcmFjdGlvbikgPT4ge1xyXG4gIGNvbnN0IGNoYW5uZWwgPVxyXG4gICAgaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXQoXCJjaGFubmVsXCIpPy5jaGFubmVsID8/IGludGVyYWN0aW9uLmNoYW5uZWw7XHJcblxyXG4gIGF3YWl0IGdldE5ld3MoY2hhbm5lbCBhcyBUZXh0Q2hhbm5lbCk7XHJcbiAgcmV0dXJuIFwiSGVyZSB3aWxsIGJlIHlvdXIgY3J5cHRvIG5ld3NcIjtcclxufTtcclxuIl0sIm5hbWVzIjpbImNvbmZpZyIsImRlc2NyaXB0aW9uIiwib3B0aW9ucyIsIm5hbWUiLCJyZXF1aXJlZCIsInR5cGUiLCJnZXROZXdzIiwiY2hhbm5lbCIsIm1vbml0b3JlZEFycmF5IiwicmVzcG9uc2UiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwiQXJyYXkiLCJpc0FycmF5IiwiZXJyIiwiY29uc29sZSIsImxvZyIsInNldEludGVydmFsIiwibmV3RGF0YSIsImxlbmd0aCIsImxhdGVzdEl0ZW0iLCJmaW5kIiwiaXRlbSIsInNvbWUiLCJvbGRJdGVtIiwidXJsIiwiZG91YmxlZCIsImVsZW1lbnQiLCJwdXNoIiwic2VuZCIsImVycm9yIiwiaW50ZXJhY3Rpb24iLCJnZXQiXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sTUFBTUEsU0FBd0I7SUFDbkNDLGFBQWE7SUFDYkMsU0FBUztRQUNQO1lBQ0VELGFBQWE7WUFDYkUsTUFBTTtZQUNOQyxVQUFVO1FBQ1o7UUFDQTtZQUNFSCxhQUFhO1lBQ2JFLE1BQU07WUFDTkUsTUFBTTtZQUNORCxVQUFVO1FBQ1o7S0FDRDtBQUNILEVBQUU7QUFTRixNQUFNRSxVQUFVLE9BQU9DO0lBQ3JCLElBQUlDLGlCQUE2QixFQUFFO0lBRW5DLElBQUk7UUFDRixNQUFNQyxXQUFXLE1BQU1DLE1BQU0sQ0FBQywyQ0FBMkMsQ0FBQztRQUMxRSxNQUFNQyxPQUFPLE1BQU1GLFNBQVNHLElBQUk7UUFFaEMsSUFBSUMsTUFBTUMsT0FBTyxDQUFDSCxPQUFPO1lBQ3ZCSCxpQkFBaUJHO1FBQ25CO0lBQ0YsRUFBRSxPQUFPSSxLQUFLO1FBQ1pDLFFBQVFDLEdBQUcsQ0FBQyxxQ0FBcUNGO0lBQ25EO0lBRUFHLFlBQVk7UUFDVixJQUFJO1lBQ0YsTUFBTVQsV0FBVyxNQUFNQyxNQUNyQixDQUFDLDJDQUEyQyxDQUFDO1lBRS9DLE1BQU1TLFVBQVUsTUFBTVYsU0FBU0csSUFBSTtZQUVuQyxJQUFJTyxRQUFRQyxNQUFNLEdBQUcsR0FBRztnQkFDdEIsTUFBTUMsYUFBYUYsUUFBUUcsSUFBSSxDQUM3QixDQUFDQyxPQUNDLENBQUNmLGVBQWVnQixJQUFJLENBQUMsQ0FBQ0MsVUFBWUEsUUFBUUMsR0FBRyxLQUFLSCxLQUFLRyxHQUFHO2dCQUc5RCxJQUFJTCxZQUFZO29CQUNkLE1BQU1NLFVBQVVuQixlQUFlYyxJQUFJLENBQ2pDLENBQUNNLFVBQVlBLFFBQVFGLEdBQUcsS0FBS0wsV0FBV0ssR0FBRztvQkFHN0MsSUFBSUMsU0FBUztvQkFFYm5CLGVBQWVxQixJQUFJLENBQUNSO29CQUNwQmQsUUFBUXVCLElBQUksQ0FBQ1QsV0FBV0ssR0FBRztnQkFDN0I7WUFDRjtRQUNGLEVBQUUsT0FBT0ssT0FBTztZQUNkZixRQUFRZSxLQUFLLENBQUMscUNBQXFDQTtRQUNyRDtJQUNGLEdBQUc7QUFDTDtBQUVBLGVBQWUsQ0FBQSxPQUFPQztJQUNwQixNQUFNekIsVUFDSnlCLFlBQVk5QixPQUFPLENBQUMrQixHQUFHLENBQUMsWUFBWTFCLFdBQVd5QixZQUFZekIsT0FBTztJQUVwRSxNQUFNRCxRQUFRQztJQUNkLE9BQU87QUFDVCxDQUFBLEVBQUUifQ==
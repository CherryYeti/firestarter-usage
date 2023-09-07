---
title: Processing Server Output
description: A reference page in my new Starlight docs site.
---

```python
async def process_server_output(data, interaction, selected, server_name):
    if "For help, type " in data:
        await interaction.send("Server is now up!")
        server_running[selected] = True
    elif any(keyword in data for keyword in ["players online:", "joined the game", "left the game", "<"]):
        await interaction.send(data[data.index(":", 30) + 2:] + "\n")
    elif "EULA" in data:
        await interaction.send(f"You must accept the EULA for \"{server_name}\" before you can start it")
        server_running[selected] = False
```

There are a few different conditions that can be fufilled here.

### "For help, type "

When a minecraft server has finished starting, the server will throw the message. We use this indicator to respond to the original user message to let them know that the server is ready.

### "EULA"

When starting a minecraft server for the first time, the server will require that you modify the EULA file inside of the server directory. If not satisfied, the server will throw an error that this function picks up.

### The other one

This code block handles when the /list command is invoked, when a players joins or leaves the game, and when a player talks in chat.

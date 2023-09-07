---
title: Creating and Configuring the Bot
description: A reference page in my new Starlight docs site.
---

## Creating the bot

Check out this amazing guide by the people over at Nextcord: [Creating a Bot Account](https://docs.nextcord.dev/en/stable/discord.html)

## Configuration

The yaml file is structured like this

```yaml
java:
  8: "path/to/java/8/executable"
  17: "path/to/java/17/executable"
servers:
  "server_1":
    "path": "/path/to/server/1.jar"
    "java_version": 17
    "minimum_ram": 2048
    "maximum_ram": 4096
  "server_2":
    "path": "/path/to/server/2.jar"
    "java_version": 17
    "minimum_ram": 2048
    "maximum_ram": 4096
discord:
  token: "token"
```

The ram option is in megabytes

**The token from the discord bot creation should be put in the "token" option under discord**

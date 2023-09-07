---
title: Populating Variables
description: A reference page in my new Starlight docs site.
---

```python
with open("config.yaml", "r") as yaml_file:
    config_yaml_contents = yaml.safe_load(yaml_file)
```

This code will simply read the config.yaml file, and save it at a variable named `config_yaml_contents`

```python
server_running = [False] * len(config_yaml_contents["java"])
```

Here, we create a new array named `server_running`, which is an array of False, with the length of the amount of servers that are read from the yaml file. Server running is used to determine whether or not a server is running by the bot.

```python
server_processes = [None] * len(config_yaml_contents["java"])

```

Here, we create a new array named `server_processes`, which is an array of None, with the length of the amount of servers that are read from the yaml file. This variable is used to contain the subprocesses, so that the python code can keep track of the server to manage it.

```python
num_servers = len(config_yaml_contents["servers"])
```

This is just the number of servers.

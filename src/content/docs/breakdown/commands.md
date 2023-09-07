---
title: Slash Commands
description: A reference page in my new Starlight docs site.
---

### Context

```python
await interaction.send()
```

`Interaction.send()` is how the bot sends information to the user/channel. Instead of printing a new message, it simple replies to the user, to keep things neater.

### List Command

```python
@bot.slash_command(description="List Servers")
async def servers(interaction: nextcord.Interaction):
    await interaction.send(embed=generate_servers_embed())
```

This command will generate, then reply with the server embed previously mentioned.

### Help Command

````python
@bot.slash_command(description="Help me!")
async def help(interaction: nextcord.Interaction):
    await interaction.send(embed=generate_help_embed())```
````

This command will generate, then reply with the help embed previously mentioned.

### Start command

```python
@bot.slash_command(description="Start server")
async def start(interaction: nextcord.Interaction, server: int):
    if 0 <= server < num_servers:
        if server_running[server]:
            await interaction.send("That server is already running")
        else:
            selected_server = list(config_yaml_contents["servers"].keys())[server]
            server_info = config_yaml_contents["servers"][selected_server]
            path, java_version, minimum_ram, maximum_ram = server_info["path"], server_info["java_version"], server_info["minimum_ram"], server_info["maximum_ram"]
            folder = '/'.join(path.split('/')[:-1]) if '/' in path else '\\'.join(path.split('\\')[:-1])
            java_version_name = config_yaml_contents["java"][java_version]
            command = f'cd {folder} && {java_version_name} -Xms{minimum_ram}M -Xmx{maximum_ram}M -jar {path} nogui'
            await interaction.send(f'Starting server: {selected_server}...')
            process = await asyncio.create_subprocess_shell(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
            server_processes[server] = process
            server_running[server] = True
            while True:
                stdout_line = await process.stdout.readline()
                if not stdout_line:
                    break
                data = stdout_line.decode("utf-8")
                await process_server_output(data, interaction, server, selected_server)
    else:
        await interaction.send('No server exists with that index')
```

#### Let's break this down

```python
async def start(interaction: nextcord.Interaction, server: int):

```

We have modified the interaction to handle an int input from the user.

```python
if 0 <= server < num_servers:
    if server_running[server]:
        await interaction.send("That server is already running")
```

This code checks if the int that the user entered is actually a server, and if it is, if the server has already been started.

```python
else:
    selected_server = list(config_yaml_contents["servers"].keys())[server]
```

Next, we grab the associated server name from the yml file and load it into the `selected_server` variable.

```python
server_info = config_yaml_contents["servers"][selected_server]

```

Then, we grab the associated server information from the yml file and load it into the `server_info` variable.

```python
path, java_version, minimum_ram, maximum_ram = server_info["path"], server_info["java_version"], server_info["minimum_ram"], server_info["maximum_ram"]

```

We then extract the path, java_version, minimum_ram, and maximum_ram from the yml file data and load them into variables.

```python
folder = '/'.join(path.split('/')[:-1]) if '/' in path else '\\'.join(path.split('\\')[:-1])
```

This code finds the folder that the jar file is located in. There is probably a built-in way to do this, but I like this.

```python
java_version_name = config_yaml_contents["java"][java_version]
```

Get the java version from the yml data for the assocaited version.

```python
command = f'cd {folder} && {java_version_name} -Xms{minimum_ram}M -Xmx{maximum_ram}M -jar {path} nogui'
```

We then generate the command that will be run by the subprocess. The nogui is added to remove the default server ui that pops up when a server is run.

```python
await interaction.send(f'Starting server: {selected_server}...')
```

We then let the user who launched the command know that the server is about to be started.

```python
process = await asyncio.create_subprocess_shell(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
```

We finally get to run the command. We use pipes to get the input, output and error messages from the subprocess. We use PIPE so that we can interact with the process at any point in out code through the server_processes variable.

```python
server_processes[server] = process
server_running[server] = True

```

We then assign the process to the server_process variable, as well as set the server_running to True in order to tell the program that the server is running correctly.

```python
while True:
    stdout_line = await process.stdout.readline()
    if not stdout_line:
        break
    data = stdout_line.decode("utf-8")
    await process_server_output(data, interaction, server, selected_server)
```

We then read every line that is outputted from the process. We decode the information to UTF-8, then pass it to the `process_server_output` function, along with the interaction(original user message), server (server index), and selected_server

### Cmd Command

```python
@bot.slash_command(description="Execute command on server")
async def cmd(interaction: nextcord.Interaction, server: int, command: str):
    if 0 <= server < num_servers:
        if not server_running[server]:
            await interaction.send("That server is not running")
        else:
            process = server_processes[server]
            command_with_newline = command + "\n"
            process.stdin.write(command_with_newline.encode())
            await interaction.send(f'Sent command to server {server}: {command}')
    else:
        await interaction.send('No server exists with that index')
```

```python
async def cmd(interaction: nextcord.Interaction, server: int, command: str):

```

Here, we take in an int (the server index) and a command (the actual command that will be executed on the minecraft server (i.e. /kill, /kick, /whitelist))

We'll start after the else statement here

```python
process = server_processes[server]
command_with_newline = command + "\n"
process.stdin.write(command_with_newline.encode())
await interaction.send(f'Sent command to server {server}: {command}')
```

The first thing we do is set the process variable to the corresponding variable in the server_processes variable. We then add a newline to the command to emulate the user pressing enter when typing in the command manually. We then write the command to the PIPE that we mentioned earlier. Finally, we lset the user know that we executed the command on the server.

```python
@bot.slash_command(description="Stop the server")
async def stop(interaction: nextcord.Interaction, server: int):
    if 0 <= server < num_servers:
        if not server_running[server]:
            await interaction.send("That server is not running")
        else:
            server_running[server] = False
            process = server_processes[server]
            command ="stop\n"
            process.stdin.write(command.encode())
            await interaction.send(f'Server {server} has been stopped')
    else:
        await interaction.send('No server exists with that index')
```

This is very similar to the command command, except we send the /stop command to the server instead of a custom command.

```python
@bot.slash_command(description="List players on the server")
async def who(interaction: nextcord.Interaction, server: int):
    if 0 <= server < num_servers:
        if not server_running[server]:
            await interaction.send("That server is not running")
        else:
            server_running[server] = False
            process = server_processes[server]
            command ="list\n"
            process.stdin.write(command.encode())
    else:
        await interaction.send('No server exists with that index')
```

This is very similar to the command command, except we send the /list command to the server instead of a custom command. The output from the list command is handled by the process output command.

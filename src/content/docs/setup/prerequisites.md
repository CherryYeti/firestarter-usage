---
title: Installing Prerequisutes
description: A reference page in my new Starlight docs site.
---

## Python

In order to run this program, you must have [Python 3](https://www.python.org/downloads/windows/) installed.

**If you are on Windows, make sure to check the box that says "Add Python X.X to PATH" during installation!**

## Java

I would highly recommend using OpenJDK, reminder that Java 8 is required to run Minecraft versions 1.17 and below. Java 17 is required to run Minecraft version 1.18 and up.

Finding the paths for the java executables can be a bit dificult at times, so here are some pre-provided paths that may or may not work for you.

### Windows:

Since windows doesn't have a widespread package manager, you should download Java 8 and 17 from adoptium.
**You want the x64 msi!**
<br>

[Java 8](https://adoptium.net/temurin/releases/?os=windows&package=jre&version=8)
<br>

[Java 17](https://adoptium.net/temurin/releases/?os=windows&package=jre&version=17)

The java executables are located in `C:\Program Files\Eclipse Adoptium\[version]\bin\java.exe`

### Linux:

Java 8 path:

```sh
/usr/lib/jvm/java-8-openjdk/jre/bin/java
```

Java 17 path:

```sh
/usr/lib/jvm/java-17-openjdk/jre/bin/java
```

### MacOS:

I would highly recommend using [brew](https://brew.sh/) to install openjdk

Java 8 path:

```sh
/usr/local/opt/openjdk@8/bin/java
```

Java 17 path:

```sh
/usr/local/opt/openjdk@17/bin/java

```

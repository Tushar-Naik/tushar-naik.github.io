---
{
  "id": 1,
  "title": "The Terminal",
  "date": "2024-10-21",
  "lastUpdated": "2024-10-21",
  "author": "Tushar Naik",
  "excerpt": "Setting up your perfect Terminimal to boost your productivity",
  "readingTime": 12,
  "tags": ["Shell", "Bash",  "Scripting", "Productivity"],
  "slug": "terminal-blog"
}
---

![The Terminal](/images/the-terminal.jpg)

<br>
<br>

A good chunk of my days at work start and end on the terminal. Perhaps you relate to this, or you are one of the "Modern
Developers". But as gen-z as you may be, after your questionnaire session with your LLM friend, you will have the
occasional:

- "clone this project"
- "sift through this file"
- "ssh into this machine and count how many requests have failed"

Jotted below is a list of useful tools, scripts and productivity hacks I've collected over the years for a better
terminal experience (I call it **Terminimal**). And the irony here being, they all try to reduce the amount of time I spend on the terminal.

I also know that you would have accumulated a nice set of shiny buckles for your tool-belt. I would like to hear about
the best ones that you live by (write to me @tushar.knaik@gmail.com)

<br>

##### Terminimal - What I consider a "Zenful" terminal experience:

1. No distracting flab
2. Quick to open up a clean slate
3. Allows me to focus only on what is important during complex operations
4. Ability to pick up from where I left off
5. Search through history without wasting time
6. Help me with commands that I know I will forget
7. Be fairly configurable


<br>
<br>

##### What can you expect while reading this blog:
I start with the [Setup](#the-setup). And then move to the individual [Tools](#the-tools), settings and scripts over them.

In each, I don't describe the tool, its installation guide, how cool it is, yada yada. 
I'm pretty sure their individual sites / git pages do a better job. I'll restrict it to why I found it good,
or if I've done something extra to make it more useful. You could just go over something
like [Awesome-shell](https://github.com/alebcay/awesome-shell),
but that is like the dictionary. Here, I focus on the ones that had most impact to my productivity.

While I list the systems and apps I use to achieve the experience I desire, you must know that they are just the means
of achieving it, nothing more. 


<br>
<br>

# The SETUP

Starting with the artillery at my disposal

- Some form of Macbook - the fortunate / unfortunate situation of only getting to work on a Mac (Currently Apple M1 Pro)
- Some MacOS - (Currently - macOS Sonoma 14.6.1)
- iterm2 terminal app

<br>
<br>

## The Terminal App

**[iterm2](https://iterm2.com/)** is my choice here. Adding to my point from the previous section, I am definitely not asking you to switch.
I am also not planning on listing out the cool features it has. But here are few aspects I like:

- Full control on appearance, I like it minimal and slightly translucent.
- I am a heavy user of the Split pane. <br>
  _Some of you may point out that this goes against my earlier premise, of single-focus-do-one-thing-at-a-time. I follow
  a tab split several times for some branched out work related to the current task at hand, which gets closed after._
- Search highlights, paste history

Between the built-in Mac Terminal, Tabby, Alacritty, Hyper, Warp .. you choose yours

<br>

### ZSH and ohMyZsh

I don't favor using **[fish](https://fishshell.com/)** since my day generally involves working on production ubuntu servers. And a non POSIX compliant
shell is not what I'd want to invest in. If you don't operate in such a predicament, or you are good at remembering different
commands for local and remote environments, I've heard that fish is an excellent alternative shell

For me, Zsh ticks most of the boxes of being highly customizable, while being generally POSIX compliant. And there are
several plugins that give me the fish-like feel I need.<br>
[https://ohmyz.sh/](https://ohmyz.sh/) is the best at managing the zsh configurations.

<br>

### zinit

Why would you want to keep waiting on the one thing you do 100s of times every day. I'm talking about the time it takes to load an empty window on pressing cmd+T or new tab.<br>
[Zinit](https://github.com/zdharma-continuum/zinit) is a zshell plugin manager helps setup and install different plugins, while ensuring that your terminal remains fast.

Attached below are snippets from my `~/.zshrc` to set it up correctly, along with plugins we will go over next

```bash
# where to store zinit and the plugins
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
# first time look for / install it
if [ ! -d "$ZINIT_HOME" ]; then
   mkdir -p "$(dirname $ZINIT_HOME)"
   git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi

# source zinit
source "${ZINIT_HOME}/zinit.zsh"

# Add in Powerlevel10k
zinit ice depth=1; zinit light romkatv/powerlevel10k

# Add in zsh plugins
zinit light zsh-users/zsh-syntax-highlighting
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-autosuggestions
zinit light Aloxaf/fzf-tab

# Add in snippets (shotcuts and alias)
zinit snippet OMZL::git.zsh
zinit snippet OMZP::git
zinit snippet OMZP::sudo
zinit snippet OMZP::archlinux
zinit snippet OMZP::aws
zinit snippet OMZP::kubectl
zinit snippet OMZP::kubectx
zinit snippet OMZP::command-not-found

# Load completions
autoload -Uz compinit && compinit
```
<br>
<br>

### powerlevel10k

What I like about [powerlevel10k](https://github.com/romkatv/powerlevel10k) is how simple it makes setting up the right appearance. 
Opening a new tab takes you to the configuration wizard, and it walks you through a step-by-step guide to set your preferences. 

If you wish to reconfigure your settings, change it at  `vi ~/.p10k.zsh` or hit

```bash
p10k configure
```

Unfortunately, it is worth noting that this particular project is no more active.<br>
[https://ohmyposh.dev/](https://ohmyposh.dev/) is the next alternative that allows you to do the same thing. <br>
[https://starship.rs/](https://ohmyposh.dev/) - but i found this to be very distracting

<br>
<br>

By the end, my setup looks like this

- a single line to represent the current working dir (rather that the same information repeating after every command)
- a green > indicating status of the previous command (turns red if it was an error)
- a time parameter on the side indicating how long the previous command took
- nothing else

![Terminal](/images/terminimal.jpg)

<br>
<br>
<hr>
<br>

# The TOOLS
<br>

### Basic zsh plugins

These were already configured using zinit, you might still want to check out additional settings/capabilities for each

1. [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) - a **fish** like syntax highlighter for zsh 
2. [zsh-completions](https://github.com/zsh-users/zsh-completions) - for completions
3. [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) - **fish** like autosuggestions  

<br>

### zoxide

This one is gold. It remembers which directories you visit most frequently, so you can quickly get to them in just a few
keystrokes.
Use-case:
1. You have your projects structured within some high level folders (`company/` , `personal/` , `opensource/`) 
2. You typically start the terminal session in one home folder
3. You remember the name of the project you want to go navigate to, but you need to type in the full path each time, or setup some alias for the same
4. `zoxide` can reduce this burden

```bash
cd ~/Documents/Company/projects/krabby-patty/server

# next time
cd krabby-patty server
~/Documents/Company/projects/krabby-patty/server develop ⇡1 *4 !1 
```

If you observe, it is working over the regular `cd` command, not the default `z` command. You can do this by using
`--cmd` during the setup in your `~/.zshrc`

```bash
eval "$(zoxide init --cmd cd zsh)"
```

<br>

### ad

[Advanced new file](https://github.com/tanrax/terminal-AdvancedNewFile) gives you the ability to quickly create files and folders, a nice alternative to `mkdir -p` , `vim` and `touch`

```bash
ad folder1/ folder2/subfolder/file.txt
```

<br>

### tree

To quickly view the folder structure of a directory

```bash
❯ tree
.
├── folder1
└── folder2
    └── subfolder
        └── file.txt

4 directories, 1 file
```
<br>

### ripgrep

Alternatives exist like [The Silver Searcher](https://github.com/ggreer/the_silver_searcher), which is a clone of `ack`
for raw performance, but [ripgrep](https://github.com/BurntSushi/ripgrep) is faster.

This is a massively popular project, and an extremely powerful search tool.
It recursively searches for regex pattern in the current directory.

```bash
cd my-cool-project
rg "ANYTHING_UNDER_THE_SUN" # that you are trying to find in this folder
```

[This blog](https://blog.burntsushi.net/ripgrep/#anatomy-of-a-grep) is a peach of a read, on the nerdy details of grep, 
and will single-handedly convince you to switch from `grep` to `rg`

There are 2 types of search tools, ones that have an underlying regex engine that uses backtracking. Others that generally supports fewer features and is based on finite automata.

- A typical `grep` that supports back-references does not do a finite automaton.
- `git grep` uses a custom finite-automata based regex engine
- [Rust's regex lib](https://github.com/rust-lang-nursery/regex), uses finite automata, which does not support back
  references. `ripgrep` or `rg` uses this by default

<br>

### fzf

Now we get to the most interesting one of them all.

Here's a quick tutorial of its power, combined with the previous `rg` command.<br>
Below is a simple alias command to **explore** the contents of all files in the folder, with preview, while fuzzy searching
for some text within these files. Trust me, this will blow your mind.

```bash
explore(){
  rg --no-heading --line-number --color=always "" . | fzf --ansi --delimiter ':' --bind 'enter:execute(vim {1} +{2})' --preview 'bat --style=numbers --color=always {1} --highlight-line {2}'
}
```
![Explore](/images/demo-explore.webp)
`fzf` can be combined with every other list based output. The next few sections use this extensively.<br>
This command probably deserves a blog of its own, maybe another day. I'll link it here when that is ready. 

<br>

### eza

Modern `ls`.<br> Combined with `fzf`, you can do some really cool stuff, like this `els` command below.<br>
Typically, my `ls` use-cases are:
- files edited most recently in the folder (`ls -ltr`)
- size of files and folders at a glance (`du -sh`)
- quick `less` of the file I'm interested in, and when don't know which file, a series of `less` commands

Introducing `els` (put this in your `~/.zshrc`)

```bash
els() {
	local selected_file
  selected_file=$(
    eza -la --color=always --group-directories-first --icons \
      --time-style=long-iso \
      --git \
      -s time \
      --reverse \
      --color-scale \
      --total-size \
    | sed -E "s/([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})/\x1b[94m\1\x1b[0m/g" \
    | fzf --ansi \
        --reverse \
        --preview 'if [ -d {-1} ]; then
                     eza -la --color=always --group-directories-first --icons --total-size {-1}
                   elif [ -f {-1} ]; then
                     bat --style=numbers --color=always --line-range :500 {-1}
                   else
                     echo "Not a file or directory"
                   fi' \
        --preview-window=right:60%:wrap \
        --header 'Enter to select, CTRL-C to exit, CTRL-S to toggle sort, CTRL-R to resize preview' \
        --bind 'ctrl-s:toggle-sort' \
        --bind 'ctrl-r:change-preview-window(right,70%|right,80%|bottom,60%)'
  )
```

![ELS](/images/demo-els.webp)

<br>

### Bat

`cat` but with wings

- its a drop in replacement for `cat` stuff (`alias cat='bat --paging=never'`)
- does syntax highlighting for several languages, markups, has git integrations

![Bat](/images/demo-bat.jpg)

<br>

### NeoVim

A fork of vim that is a drop-in for vim, but with a host of plugins.
[nvchad](https://nvchad.com/ ) is a starter to make it a full-blown IDE.
I never felt the need to replace my IDE, I just prefer the basic `nvim` over `vim`

<br>

### JQ

JQ/YQ or any other bash processor in your skill-set will definitely help you save a lot of time.<br>
Specifically, I use `jq` a lot during my work hours. It is written in C, and is very fast and powerful.
If you wanna quickly debug some production API, or some dataset, chop and group by, filter and map-transform, this is my
goto tool.

Here's a quick script to get the top 100 stories of hackernews, and print the top 5 sorted on score

```bash
for id in $(curl -s "https://hacker-news.firebaseio.com/v0/topstories.json" | jq ".[0:100]" | jq ".[]"); do curl -s "https://hacker-news.firebaseio.com/v0/item/$id.json" | \                                                                   ─╯
  jq '{
    title: .title,
    url: .url,
    score: .score,
    author: .by,
    comments: .descendants
  }'
done | \
jq -s 'sort_by(-.score)' | \
jq '.[0:5]' | \
jq '.[] | "Title: \(.title)\nURL: \(.url)\nScore: \(.score)\nAuthor: \(.author)\nComments: \(.comments)\n"'
```

<br>

<hr>

## References
1. [Awesome-bash](https://github.com/awesome-lists/awesome-bash) and [Awesome-shell](https://github.com/alebcay/awesome-shell)
2. [DreamsofAutonomy](https://www.youtube.com/@dreamsofautonomy) and his Video on [zsh config](https://www.youtube.com/watch?v=ud7YxC33Z3w&ab_channel=DreamsofAutonomy). I encourage you to watch his other videos.

[//]: # (3. [fzf]&#40;https://github.com/junegunn/fzf&#41; honestly, this inspired me to )
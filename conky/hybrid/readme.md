## Hybrid is a Conky theme that combines modern and classic style.

| Dark | Light |
| ----------- | ----------- |
| ![Conky Image](/screenshots/screenshot.png) | ![Conky Image](/screenshots/screenshot-light.png) |


## Change Log

- v1.5.7
    - adjusted clock ring
    - hide time second text

- v1.5.6
    - changed font to Ubuntu
    - set accent bg_alpha to 1.0 to increase readability
    - changed rings bg_alpha from [0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9] to [0.2,0.3,0.4,0.5,0.3,0.5,0.5,0.3]
    - changed text_indicator alpha value
    - fixed text_indicator coordinate
    - updated deployment script
    - renamed .config extension to .conf
    - turned off line sketches by default

- v1.5.5
    - fixed script backward compatibility on older version lua library (tested on liblua5.1-0 binded with conky use by Linux Mint 20)
    - added kali linux logo

- v1.5.4
    - minor updates. missed out something yesterday

- v1.5.3
    - added 12 distro logos
    - added text indicator
    - added line sketches background (with on/off toggle)
    - rearranged texts
    - code refactoring

- v1.5.2
    - splitted text settings from rings settings
    - adjusted cpu thread rings

- v1.5.1
    - changed time to 24 hours format
    - fixed level watch, should check with percentage instead of value
    - added clock rings

- v1.5
    - added battery
    - added swap (I've omitted swap from my system, that's why it's 0 in screenshot)
    - added ring for time second tick, just for eye candy
    - changed cpu, gpu and ram ring angle
    - moved disk and ram info to right panel
    - code refactoring

- v1.4 
    - Fix not synchronize data between ring usage animation vs percentage text render from conky
    - Simplify and standardize usage level watch
    - Render text display on rings via lua script instead of conky

- v1.3
    - Render distro logo

- v1.2
    - Set smaller ring radius and adjust position

- v1.1
    - Removed un-needed methods from the script

- v1.0
    - Integrate rings into my existing conkyrc


## Dependencies
- **Arch based distro package**
    - conky-lua-nv (with nvidia object) **OR** conky-lua
 
- **Debian based distro package**
    - conky-all
 
- **Fonts**
    - Ubuntu (default)
    - Play (optional - this theme plays well with Play font. Need to change font name in .conf and .lua file)
    - OpenLogos (optional - only in case you want to use logo from OpenLogos)


## Installation
- Fonts
    - Install fonts like normal.

- Download the project and extract it.
    - Inside the project search for deploy.sh file
    - Set file deploy.sh to be executable
    - Execute the script in Konsole / Terminal

            $ ./deploy.sh


## To use
- Open Konsole / Terminal and run
    - Dark mode

            $ conky -c ~/.config/conky/hybrid/hybrid.conf &

    - Light mode

            $ conky -c ~/.config/conky/hybrid/hybrid-light.conf &

- Alternatively
    - Create symlink from your selected config
    - Paste it to home folder
    - Rename symlink to .conkyrc
    - In terminal run conky

            $ conky &


## Auto Start
- Inside startup folder search for hybrid-startup.sh file
- Set hybrid-startup.sh to be executable
- Change the home path to your home path, seems like I can't use ~ at startup script
- Add hybrid-startup.sh to auto start program
- You can adjust sleep time in the script accordingly


## Customizations
- **Line sketches toggle**
    - Line sketches background can be turn on or off from conky config file:

            -- to turn on
            lua_draw_hook_pre = 'conky_main true'

            -- to turn off
            lua_draw_hook_pre = 'conky_main false'

 
- **Distro Logo**
    - In hybrid.config or hybrid-light.config, you can use distro logo from OpenLogos or alternatively you can use png image file.
        - OpenLogos example:

                ${goto 250}${color2}${font Play:bold:size=16}${alignc}${execi 300 lsb_release -d | cut -c14-} ${color}${font OpenLogos:size=24}t

        - Png image example:

                ${voffset -930}${image ~/.config/conky/hybrid/images/distro-1a.png -p 475,16 -s 25x25}
                ${goto 250}${color2}${font Play:bold:size=16}${alignc}${execi 300 lsb_release -d | cut -c14-} ${color}

        - **Update 09 June 2020** 
            - Distro logo is now render from Lua script instead of Conky. To change open hybrid-rings.lua or hybrid-light-rings.lua file and search for draw_logo() function, don't forget to change home_dir value. Edit the line below:

                    local imagefile = home_dir .. "/.config/conky/hybrid/images/distro-1a.png"

        - **Update 11 Sep 2020**
            
            - Added 12 distro logos
                1. Manjaro
                2. Linux Mint
                3. Arch Linux
                4. Ubuntu
                5. MX Linux
                6. Debian
                7. Elementary OS
                8. Pop! OS
                9. Solus
                10. Fedora
                11. Zorin
                12. PCLinuxOS
 

- **Network interface** 
    - In hybrid.config or hybrid-light.config, you need to change network card interface. Replace enp7s0f1 and wlp0s20f3 with yours. If you only have a single interface you  can commented out the second network interface.

            #${if_existing /proc/net/route wlp0s20f3}\
            #${goto 250}${font Play:style=Bold:size=8}Internal IP - wlp0s20f3 ${font Play:size=8}$# {alignr}${addr wlp0s20f3}
            #${goto 250}    ${font Play:style=Bold:size=8}Download
            #${goto 250}        ${color2}${font Play:size=8}Speed ${alignr} ${downspeed # wlp0s20f3}
            #${goto 250}        ${color}Total ${alignr} ${totaldown wlp0s20f3}
            #${goto 250}    ${font Play:style=Bold:size=8}Upload
            #${goto 250}        ${color2}${font Play:size=8}Speed ${alignr} ${upspeed # wlp0s20f3}
            #${goto 250}        ${color}Total ${alignr} ${totalup wlp0s20f3}
            #${endif}\

    - To check you network interface use command:

            $ ip link show


- **NVidia GPU**
    - This theme support NVidia GPU temperature by default. If your machine doesn't have one, you can comment the code below:

            -- {
            --     name='nvidia',
            --     arg='temp',
            --     max=110,
            --     bg_colour=0xa8a8a8,
            --     bg_alpha=0.9,
            --     fg_colour=0x4285F4,
            --     fg_alpha=0.8,
            --     x=140, y=370,
            --     radius=106,
            --     thickness=4,
            --     start_angle=0,
            --     end_angle=270,
            --     text_id=9
            -- },


- **CPUs**
    - Number of CPUs thread and Core: In hybrid-rings.lua or hybrid-light-rings.lua, you can reduce number of CPUs and core according to you system. Search for settings_table and modified accordingly.
    It should be simple enough to understand. The outer ring on CPU represents CPU Core temperature.
    - To check you system CPUs and Cores, use command below:

            $ lscpu | egrep 'Model name|Socket|Thread|NUMA|CPU\(s\)'


- **Disk**
    - In hybrid-rings.lua or hybrid-light-rings.lua, you can adjust number of partition according to your system. Search for settings_table and modified accordingly. The outer ring on storage represents ram, swap and battery usage.
 

## Known Issues
~~Sometimes cpu core temperature draw on rings and display text on conky are not in sync.~~


## Disclaimer
I am not the original creator of the conkyrc file (has been tweaked for my usage).
It was downloaded way back in 2009 and I've no information of the original creator. Credit should go to him/her.

hybrid-rings.lua / hybrid-light-rings.lua script is a modified and refactored version of mine. Script originally copied from conky-grapes theme's rings-v2_tpl which was created by londonali1010 (2009), updated by La-Manoue (2016) and popi (2017).

I do not own any of the distro logos bundled with this script. Please inform me if in case any of the logo are not allowed to be share.
I will remove it as soon as possible.


## External Links
[Arch Manual Pages](https://jlk.fjfi.cvut.cz/arch/manpages/man/conky.1)

[Conky Objects](http://conky.sourceforge.net/variables.html)

[Lua 5.4 Reference Manual](https://www.lua.org/manual/5.4/)

[Cairo Samples](https://cairographics.org/samples/)
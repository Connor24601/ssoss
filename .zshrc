# PATH and PS1 and environment variables

export Path="/usr/local/opt/ruby/bin:$PATH"

export PATH=$PATH:~/DevTools/flutter/bin
export PATH=$PATH:/Users/blake/Library/Android/sdk/cmdline-tools/latest/bin
export PATH=$PATH:"/usr/local/opt/openjdk@17/bin"
export PATH=$PATH:/Users/blake/Library/Android/sdk/emulator
export PATH=$PATH:~/DevTools/bin

teamsId="57f580b9-8db3-4b2b-8b13-c8e31001bff2"

export LDFLAGS="-L/usr/local/opt/ruby/lib"
export CPPFLAGS="-I/usr/local/opt/ruby/include"

export ANDROID_HOME="/Users/blake/Library/Android/sdk"
export JAVA_HOME="/usr/local/opt/openjdk@17"
export PUB_HOSTED_URL="$PUB_HOSTED_URL:chttps://artifactory.dev.osii.com/artifactory/api/pub/pub-dev"

export PS1='%3~%F{cyan}»%f'

# Helpful simple commands
#	config
alias settings='nvim ~/.zshrc'
alias refresh='source ~/.zshrc'
alias vimrc='nvim ~/.vimrc'
alias gitconfig="nvim ~/.gitconfig"

alias npr="npm run"

alias iosBackup='sudo tar cf - ~/../temp/Library/Application\ Support/MobileSync/Backup | zip backup -'

#	QoL changes
alias compass='cd ~/GitHub/Compass-Flutter/srcDart/compass'
alias cls=clear
alias l='ls -AG'
alias h='cd ~'
alias lsh='ls -AGoh'
alias cat="/Users/blake/DevTools/bash-cat-with-cat/cat.sh"
alias edit="subl"
alias please="sudo !!"
alias py="python3"

alias droid="emulator -avd Pixel &> /dev/null &"
alias tabDroid="emulator -avd Pixel14 &> /dev/null &"

# Functions
#	Git
function git-delete-every-branch () {
	read "?type 'delete all branches' to confirm: " accept
	if [ "$accept" != "delete all branches" ]
	then
		return

	fi
	echo "lmao u crazy"
	for branch in $(git branch -r --list 'origin*' --sort=committerdate  --format='%(refname:lstrip=-1)')
	do
		git push --delete origin $branch
	done

}

git-prune () {
	unset toDelete
	toDelete = ""
	git oldest
	read -s -k 1 "? Delete [Y/n]: " accept
	while [[ $accept =~ [yY[:space:]] ]]
	do
		delete="$(git oldest-plain)"
		remote="$(git for-each-ref 'refs/heads/'$delete'' --format='%(push:remotename)')"
		if [ "$remote" = "origin" ]
		then
			toDelete="$toDelete $delete"
		fi
		git branch -D "$(git oldest-plain)"
	 	git oldest
		read -s -k 1 "? Delete [Y/n]: " accept
    done
    if [[ $toDelete =~ [[:space:]] ]]
    then
    	echo 'no branches to push'
    	return
    else
    	git push --delete origin $(echo $toDelete)
    fi
	
	echo 'exiting...'
	


}




#	Flutter
function validate () {
	make
	flutter test
	flutter analyze
}

#	Utility

function space() {
	du --si 2>/dev/null -d 1 -t 10M $@
}



export PATH="/usr/local/opt/ruby/bin:$PATH"

# Created by `pipx` on 2024-07-17 01:24:42
export PATH="$PATH:/Users/blake/.local/bin"

# tabtab source for electron-forge package
# uninstall by removing these lines or running `tabtab uninstall electron-forge`
[[ -f /Users/blake/GitHub/ssoss/dev/node_modules/tabtab/.completions/electron-forge.zsh ]] && . /Users/blake/GitHub/ssoss/dev/node_modules/tabtab/.completions/electron-forge.zsh

<div align="center">
	<h1>Power-My-VScode 🚀</h1>
	<p>
		<b>Make VS Code great again! </b>
	</p>
	<br>
</div>
<img src="https://img.shields.io/npm/v/power-my-vscode.svg"/>


This package allows you to synchronize your VS Code extensions across your computers (Home's laptop, at work, fresh installations, ...).</br>
If you change your computer or run a fresh installation, one command line will give back powers to your VSCode.

## Usage :
Tool's command line offers multiple workflow possibilities :

- ```npx power-my-vscode```</br>
The package will install the default extensions defined [here](./.vs-extensions.json)
- ```npx power-my-vscode -a```</br>
This will lookup the current git username on your computer, try to lookup for the fork under its github profile then it will install extensions listed on : https://raw.githubusercontent.com/username/power-my-vscode/master/.vs-extensions.json
- ```npx power-my-vscode -g <github_username>```</br>
This is helpful if you want target someone's collection. It will do the same as the previous one but on https://raw.githubusercontent.com/github_username/power-my-vscode/master/.vs-extensions.json 
- ```npx power-my-vscode -f <pah/to/json.file>```</br>
Extensions list will be retrieved from that file
- ```npx power-my-vscode -u <url_to_json_file>```</br>
Will perfom installation from the list retrieved from that url (you might have some file with the list in you DotFiles repo for example)
- Check out help command for more info : ```npx power-my-vscode -h```

## Tip : Export your current extensions
Your current extensions can be retrieved from VSCode CLI :
````
code --list-extensions 
````
Save the result of the command on your fork's file *.vs-extensions.json* or another file on your computer or over the internet depending on the workflow that suits you.

## License

MIT © [Mohamed EL BARCHANY](https://melbarch.com)

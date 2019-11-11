##React app, using [Github Rest API](https://developer.github.com/v3/)

Requirements: 
1. Show a list of top repositories (name, number of stars) sorted by number of stars.
2. When clicking on a repository item show additional repository information. (e.g. with list of the last 10 pull requests with author, title, number and status.)
3. Optional: Ability to bookmark repository information pages in the browser.

The app connects to [octokit](https://github.com/octokit) GitHub repository and show the top 10 repos based stars. 
For each repo you can do the following:
 - get the pull request by clicking on the repo box 
 - go the the repository homepage in GitHub by clicking the 3 dotted menu
 - bookmark the repository as favorite (the functionality will save the repo id in Local Storage )
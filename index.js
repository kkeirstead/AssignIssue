const main = async () => {
  
    const jsExec = util.promisify(require("child_process").exec);

    console.log("Installing npm dependencies");
    const { stdout, stderr } = await jsExec("npm install @actions/core");
    const { stdout, stderr } = await jsExec("npm install @actions/github");
    console.log("npm-install stderr:\n\n" + stderr);
    console.log("npm-install stdout:\n\n" + stdout);
    console.log("Finished installing npm dependencies");

    const core = require('@actions/core');
    const github = require('@actions/github');

  
  try {
    const issueNumber = core.getInput('issueNumber', { required: true });
    const assignees = core.getInput('assignee', { required: true });

    const token = core.getInput('githubToken', { required: true })
    const octokit = github.getOctokit(token)
    
    const { context } = github

    await octokit.rest.issues.addAssignees({
      ...context.repo,
      assignees,
      issue_number: issueNumber,
    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();

const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
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

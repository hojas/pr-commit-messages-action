import core from '@actions/core'
import github from '@actions/github'

try {
  const { commits } = github.context.payload
  console.log('commits:', commits)

  if (!commits) {
    core.setOutput('commits', 'No commit')
  }
  else {
    const commitsStr = commits
      .map(c => c.message)
      .filter(m => !m.startsWith('Merge pull request'))
      .map(m => m.replace(/\n+(.*)/g, '\n> $1'))
      .map(m => `> ${m}`)
      .join('\n')

    core.setOutput('commits', commitsStr)
  }
}
catch (error) {
  core.error(error.message)
}

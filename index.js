import core from '@actions/core'
import github from '@actions/github'

try {
  const { payload } = github.context
  const { commits } = payload
  console.log('payload', payload)
  console.log('commits', commits)

  if (!commits) {
    core.setOutput('commits', 'No commit')
  }
  else {
    const commits = payload.commits
      .map(c => c.message)
      .filter(m => !m.startsWith('Merge pull request'))
      .map(m => m.replace(/\n+(.*)/g, '\n> $1'))
      .map(m => `> ${m}`)
      .join('\n')

    core.setOutput('commits', commits)
  }
}
catch (error) {
  core.error(error.message)
}

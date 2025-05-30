pipeline {
  agent any

  tools {
    nodejs 'NodeLTS'
  }

  stages {
    stage('Clone Repo') {
      steps {
        echo "Code cloned from GitHub automatically"
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Archive artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*'
            }
        }

    stage('Check dist folder') {
    steps {
        sh 'ls -la dist'
    }
}
  }
}

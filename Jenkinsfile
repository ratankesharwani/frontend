pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { sh 'npm install' }
        }
        stage('Build') {
            steps { sh 'npm run build' }
        }
        stage('Debug dist') {
            steps {
                sh 'ls -l dist'
            }
        }
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*'
            }
        }
    }
}

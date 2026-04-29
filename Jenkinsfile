pipeline {
    agent any

    environment {
        IMAGE = "nikhil123/supermarket:latest"
        RENDER_HOOK = "https://api.render.com/deploy/srv-xxxxx?key=xxxx"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                bat 'docker build -t %IMAGE% backend'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat '''
                    echo %PASS% | docker login -u %USER% --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker push %IMAGE%'
            }
        }

        stage('Trigger Render Deploy') {
            steps {
                bat '''
                curl -X POST %RENDER_HOOK%
                '''
            }
        }
    }

    post {
        success {
            echo '🚀 FULL AUTO DEPLOY SUCCESS'
        }
        failure {
            echo '❌ FAILED'
        }
    }
}
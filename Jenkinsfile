pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nikhil123/supermarket:latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% backend'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker push %DOCKER_IMAGE%'
            }
        }

        stage('Docker Pull (Verification)') {
            steps {
                bat 'docker pull %DOCKER_IMAGE%'
            }
        }

        stage('Deploy (Local Docker Run)') {
            steps {
                bat '''
                docker stop supermarket-container || exit 0
                docker rm supermarket-container || exit 0
                docker run -d -p 5000:5000 --name supermarket-container %DOCKER_IMAGE%
                '''
            }
        }

        stage('Deploy to Render (Manual Trigger)') {
            steps {
                echo '👉 Now deploy in Render using this Docker image'
                echo 'Image: nikhil123/supermarket:latest'
            }
        }
    }

    post {
        success {
            echo '✅ PIPELINE SUCCESS'
        }
        failure {
            echo '❌ PIPELINE FAILED'
        }
    }
}
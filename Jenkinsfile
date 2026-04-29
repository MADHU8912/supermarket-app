pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nikhil123/supermarket:latest"
        CONTAINER_NAME = "supermarket-container"
    }

    stages {

        stage('Checkout Code') {
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

        stage('Stop Old Container') {
            steps {
                bat '''
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0
                '''
            }
        }

        stage('Deploy (Local Docker Run)') {
            steps {
                bat '''
                docker run -d -p 5000:5000 --name %CONTAINER_NAME% %DOCKER_IMAGE%
                '''
            }
        }

        stage('Deploy to Render (Manual Step)') {
            steps {
                echo "Go to Render and deploy using image:"
                echo "nikhil123/supermarket:latest"
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
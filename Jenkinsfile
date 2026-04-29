pipeline {
    agent any

    environment {
        IMAGE = "nikhil123/supermarket"
        TAG = "latest"
        CONTAINER = "supermarket-container"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Files') {
            steps {
                bat "dir"
                bat "dir backend"
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${IMAGE}:${TAG} backend"
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat '''
                    echo %PASS% | docker login -u %USER% --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                bat "docker push ${IMAGE}:${TAG}"
            }
        }

        stage('Deploy (Local Docker Run)') {
            steps {
                // Stop old container if exists
                bat "docker stop ${CONTAINER} || exit 0"
                bat "docker rm ${CONTAINER} || exit 0"

                // Pull latest image
                bat "docker pull ${IMAGE}:${TAG}"

                // Run new container
                bat "docker run -d -p 5000:5000 --name ${CONTAINER} ${IMAGE}:${TAG}"
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD SUCCESSFUL 🚀"
        }
        failure {
            echo "❌ PIPELINE FAILED"
        }
    }
}
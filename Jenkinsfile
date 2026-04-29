pipeline {
    agent any

    environment {
        IMAGE = "nikhil123/supermarket"
        TAG = "latest"
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
                    bat "docker login -u %USER% -p %PASS%"
                }
            }
        }

        stage('Push Image') {
            steps {
                bat "docker push ${IMAGE}:${TAG}"
            }
        }
    }
}

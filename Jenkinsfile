pipeline {
    agent any

    stages {
        stage('Build Image') {
            steps {
                sh 'docker build -t your-dockerhub-username/app-name .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push your-dockerhub-username/app-name'
            }
        }
    }
}

//project CI/CD pipeline config
def dockerImageTag = ""

pipeline {
    agent any
    environment {
        BASE_IMAGE = "registry.local:5000/training/user-management"
        CONTAINER = "user-management-container" 
    }        
    stages {
        stage('Prepare') {
          steps {
            script {
              dockerImageTag = sh (script: 'git log -1 --pretty=format:%h', returnStdout: true).trim()
            }
          }
        }        
        stage('Lint') {
            steps {
                script {
                    sh "docker run -e HADOLINT_FAILURE_THRESHOLD=error --rm -i hadolint/hadolint < Dockerfile"
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh "docker build -t ${env.BASE_IMAGE} --target builder ."
                }
            }
        }
        // stage('Test') {
        //     steps {
        //         script {
        //             sh "docker run --rm ${env.BASE_IMAGE} test"
        //         }
        //     }
        // }
        stage('Runtime') {
            steps {
                script {
                    sh "docker build -t ${env.BASE_IMAGE} --target runtime ."
                }
            }
        }
        stage('Publish') {
            steps {
                script {
                    sh "docker tag ${env.BASE_IMAGE} ${env.BASE_IMAGE}"
                    sh "docker push ${env.BASE_IMAGE}"
                }
            }
        }
        stage('Deploy') {
            steps {
                withKubeConfig([credentialsId: 'minikube', serverUrl: 'https://192.168.49.2:8443']){
                    sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'  
                    sh 'chmod u+x ./kubectl'
                    sh 'curl -LO "https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-amd64"'
                    sh 'mv ./kubectl-argo-rollouts-linux-amd64 ./kubectl-argo-rollouts && chmod u+x ./kubectl-argo-rollouts'                    
                    sh "./kubectl create -f app-config.yaml"
                    sh "./kubectl apply -f app-secrets.yaml -n default"
                    sh "./kubectl apply -f app-service.yaml -n default"
                    sh "./kubectl apply -f app-scaler.yaml -n default"
                    sh "./kubectl apply -f app-rollout.yaml -n default"
                    sh "./kubectl argo rollouts set image todo-api-rollout ${env.CONTAINER}=${env.BASE_IMAGE}:${dockerImageTag} -n default"
                }
            }
        }        
    }
} 
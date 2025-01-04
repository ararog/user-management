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
                    sh "docker build -t ${env.BASE_IMAGE}:${dockerImageTag} --target builder ."
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
                    sh "docker build -t ${env.BASE_IMAGE}:${dockerImageTag} --target runtime ."
                }
            }
        }
        stage('Publish') {
            steps {
                script {
                    sh "docker tag ${env.BASE_IMAGE}:${dockerImageTag} ${env.BASE_IMAGE}:${dockerImageTag}"
                    sh "docker push ${env.BASE_IMAGE}:${dockerImageTag}"
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
                    sh "./kubectl apply -f deploy/k8s"
                    sh "./kubectl argo rollouts set image todo-api-rollout ${env.CONTAINER}=${env.BASE_IMAGE}:${dockerImageTag} -n default"
                }
            }
        }        
    }
} 
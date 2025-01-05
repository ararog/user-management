//project CI/CD pipeline config
def dockerImageTag = ""

pipeline {
    agent {
      docker {
        image 'training/kube-deploy:latest' 
        registryUrl 'http://registry.local:5000'
        args '--network=minikube'
      }      
    }
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
                withKubeConfig([credentialsId: 'minikube', serverUrl: 'https://minikube:8443']){
                    sh "kubectl apply -f deploy/k8s"
                    sh "kubectl argo rollouts set image user-management-rollout ${env.CONTAINER}=${env.BASE_IMAGE}:${dockerImageTag} -n default"
                }
            }
        }        
    }
} 
projekt
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml`

frontend-build:
`docker build -t app-react:production -f .\Dockerfile .`

api:
`docker build -t api:production -f .\Dockerfile .`

k8s:
`kubectl apply -f .`
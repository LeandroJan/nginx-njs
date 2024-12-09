# nginx-njs
This Container image is to address the lack of supportability of the njs module by the offical nginx image provided by Red hat.

## How it works
When trying to install the RPM package of the njs module, it complains about the lack of the corresponding nginx package and does not complete the installation. Nginx is installed, but through the base image and not via RPM. To satisfy the dependency requirement and allow the installation of the other packages, we built a dummy (no files installed) nginx RPM package.

## Build Command Example
At the project-root directory run: `podman build . -t <image name>`

## Run Command Example
`podman run -d -p 8080:8080 <image name>`

## Test the nginx response after container is running (test.js)
`curl http://localhost:8080/hello`

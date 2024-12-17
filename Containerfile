FROM registry.redhat.io/rhel9/nginx-124@sha256:eeefdb63dd9c476d8290457d9a6da1efd8b22d42ba88ca04fcbb1f94547b70db

# root
USER 0

# Copy the dummy spec file into the container, the nginx-module-njs RPM, the test.js and the 
# nginx.conf.patch into the container
COPY src/. .

# Build the dummy RPM and apply the patch to /etc/nginx/nginx.conf then
# install the dummy nginx RPM and the nginx-module-njs RPM
RUN yum install -y --nogpgcheck rpm-build && \
    mkdir -p ~/rpmbuild/{SPECS,BUILD,RPMS,SOURCES,SRPMS} /etc/nginx/app && \ 
    mv ./dummy-nginx.spec ~/rpmbuild/SPECS/dummy-nginx.spec && \
    rpmbuild -bb ~/rpmbuild/SPECS/dummy-nginx.spec && \
    mv ~/rpmbuild/RPMS/x86_64/nginx-r1.24.0-1.24.0-1.x86_64.rpm . && \
    mv ./*.js /etc/nginx/app/ && \
    mv ./nginx.conf /etc/nginx/nginx.conf && \
    yum install -y --nogpgcheck ./nginx-r1.24.0-1.24.0-1.x86_64.rpm \
    ./nginx-module-njs-1.24.0+0.8.3-1.el9.ngx.x86_64.rpm && \
    yum clean all && \
    rm -rf /var/cache/yum ~/rpmbuild ~/*.rpm

# Disable subscription-manager
# RUN sed -i 's/^enabled=1/enabled=0/' /etc/yum/pluginconf.d/subscription-manager.conf

# Switch to non-root user
USER 1001

# Execute nginx with the njs module already installed
CMD ["nginx", "-g", "daemon off;"]
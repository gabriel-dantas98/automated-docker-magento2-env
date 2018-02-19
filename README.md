Pré-requisitos para ter nosso ambiente de desenvolvimento **Magento 2**!

### Antes de qualquer coisa certifique-se que tem o node em sua máquina e use o `npm install`;
        
- Node - (https://nodejs.org/en/download/)
- Package Manager - (https://nodejs.org/en/download/package-manager/)

- **Windows**
    - (https://nodejs.org/en/download/) 
- **MacOs**
    - Bash - `curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"`
         
    - Homebrew - `brew install node`
     
- **Linux**    
    `curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - && sudo apt-get install -y nodejs` - Ubuntu

    - `curl --silent --location https://rpm.nodesource.com/setup_9.x | sudo bash - &&            sudo yum -y install nodejs` - CentOS

- **Docker** (É a base que precisamos para conseguir rodar os containers)
     - **MacOs**
          - (https://docs.docker.com/docker-for-mac/install/#what-to-know-before-you-install)  
          - (https://download.docker.com/mac/stable/Docker.dmg)
          - (https://download.docker.com/mac/stable/DockerToolbox.pkg)
          - (https://docs.docker.com/toolbox/toolbox_install_mac)
     - **Linux**
        - (https://docs.docker.com/v17.09/engine/installation/linux/docker-ce/ubuntu/#set-up-the-repository)
          - `sudo apt-get install docker-ce` - Ubuntu
          - `sudo yum install docker-ce` - CentOS
     - **Windows**
          - (https://docs.docker.com/toolbox/toolbox_install_windows/) - Windows Pro
          - (https://download.docker.com/win/stable/DockerToolbox.exe) - Windows Home

- `docker-compose.yml` (Ele que será usado para subir todos containers e administra-los)
     - github (https://github.com/gabriel-dantas98/up-magento2-docker)

- Um diretorio que será usado como espelho(volume) para o container

- Um cliente para acesso ao mysqlDB, como o **mySQL Workbench**
 - **MacOS**:
     - (https://dev.mysql.com/downloads/file/?id=474219) 
 - **Linux**:
     - (https://dev.mysql.com/downloads/file/?id=474211) - Ubuntu 17.04
     - (https://dev.mysql.com/downloads/file/?id=474212) - Ubuntu 16.04
     - (https://dev.mysql.com/downloads/file/?id=474215) - Fedora 27
     - (https://dev.mysql.com/downloads/file/?id=474217) - Fedora 26
 - **Windows**:
     - (https://dev.mysql.com/downloads/file/?id=474210)


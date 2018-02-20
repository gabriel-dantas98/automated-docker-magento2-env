let figlet = require('figlet');
//Letra do inicio
let chalk = require('chalk');
//Cores no output :D
let os = require('os');
let shell = require('shelljs');
let openUrl = require('openurl');
//Abrir o browser do usuario
let readline = require('readline');
//Criando interação com o terminal capturando dados
let replace = require("replace");
//Mudar arquivos de configuração
let inquirer = require("inquirer");

console.log(figletB4A());

let OS = os.platform();
let pwd = process.cwd();
let incrementSecondscount;
let incrementSecondsMsg;
let ipContainer;

if (OS == 'linux') {
     console.log(chalk.blue.bold("\n" + 'Esta usando linux! Saiba que já tem nosso respeito xD!') + "\n");

} else if (OS == 'win32') {
     console.log(chalk.blue.bold('Ta usando Windows.. Ok, não vamos te julgar :P'));

} else if (OS == 'darwin') {

     console.log(chalk.blue.bold('Ui! Estamos em um MacOs xD'));
} 

if(process.argv[2] == 'magento2'){
    if (process.argv[3] == 'install'){
        install(OS);
    }else if (process.argv[3] == 'setFolder' || process.argv[3] == 'setfolder'){
        inputPath();
    }else if (process.argv[3] == 'start'){
        start();
    }else if (process.argv[3] == 'info'){
        magentoInfo();
    }else if (process.argv[3] == 'ls'){
        shell.exec("docker-compose ps");
        console.log("\n");  
    }else if (process.argv[3] == 'help') {
        helpMe();
    }else{
        helpMe();
    }
}else{
    helpMe();
}

function figletB4A() {
    let hexArrayColor = ['#FF6347', '#7B68EE', '#00BFFF', '#DC143C', '#FFFF00', '#3CB371', '#7CFC00', '#E0FFFF', '#90EE90', '#FF1493', '#00008B', '#4682B4', '#FF5C97'];
    let randomInt = Math.floor(Math.random() * (12 - 0 + 1) + 0);
    
    let b4aPrint = chalk.hex(hexArrayColor[randomInt]).bold(figlet.textSync("B4ATECH"));
    //console.log(hexArrayColor[randomInt]);
    
    return b4aPrint;
}

function install(system) {
     console.log("São poucas as coisas que você vai precisar ;)" + "\n");
     console.log("| docker | docker-compose | mysql client | projeto do Magento 2 |" + "\n");

     console.group();
     console.log(chalk.hex("#FFD700").bold("Depois de ter certeza que já tem tudo acima instalado") + "\n");
     console.groupEnd();

     if (system == 'linux' || system == 'darwin') {
     
          let aliasCommand = 'alias b4atech="'+ 'node ' + pwd + '/b4agroup.js"';
          //monta a string do comando alias que seria inserido no .bashrc

          let bashrcPath = os.homedir() + '/.bashrc';

          if (shell.exec("cat " + bashrcPath + " | grep b4atech", { silent: true }).code == 1){
          //se NÃO existir a linha do b4atech no .bashrc insere a linha 

               shell.exec("echo " + "'" + aliasCommand + "'" + " >> " + bashrcPath);
               //insere no final do arquivo do bashrc o alias para executar o .js

               console.group();
               console.log("Ferramenta " + chalk.hex("#FF1493").bold("b4atech")  + " Habilitada");
               console.log("Reinicia o seu terminal para que a ferramenta passe a funcionar 0/" + "\n");
               console.groupEnd();

          }else{
               console.group();
               console.log(chalk.white.bold("Você já possui a ferramenta b4atech \n"));
               console.groupEnd();   
          }

     } else if (system == 'win32') {
          console.log("windows install em desenvolvimento");
     }

     console.log("Use o comando " + chalk.cyan.bold("b4atech magento2 setFolder") + " para configurarmos seu diretório de desenvolvimento" + "\n");

}

function start() {

     console.group();
     console.log(chalk.hex("#FF4500").bold("MAGENTO 2 START" + "\n"));
     console.log(chalk.hex("#00BFFF").bold("Verificando docker e docker-compose" + "\n"));
     
     if (shell.which("docker")) {
     //verifica se o docker existe no host

          console.log(chalk.blueBright("docker- ") + chalk.green.bold(" OK"));
     } else {
          console.log(chalk.blueBright("docker- ") + chalk.red.bold(" FAILED - docker service não esta funcionando corretamente."));
          process.exit();
     }

     if (shell.which("docker-compose")) {
     //verifica se o docker-compose existe no host
          console.log(chalk.blueBright("docker-compose- ") + chalk.green.bold(" OK"));
     } else { 
         console.log(chalk.blueBright("docker-compose- ") + chalk.red.bold(" FAILED - docker-compose não esta funcionando corretamente"));
          process.exit();
     }
     console.log("\n");

     //Seta o diretório de trabalho
     console.groupEnd();

     console.log(chalk.yellowBright.bold("| Tudo certo vamos subir os containers |" + "\n"));
    
     dockerComposeUp();
}

function inputPath() {
 
    let questions = [
      {
        type: 'input',
        name: 'choice',
        message: "Digite qual será o seu diretório de desenvolvimento Magento :D "
      }
    ];

    inquirer.prompt(questions).then(answers => {
        let path = (JSON.stringify(answers, null, '  '));
        let parsePath = (JSON.parse(path));
        let magentoPath = parsePath.choice;
        //console.log(magentoPath);
        setMagentoFolder(magentoPath);
    });
}

function setMagentoFolder(PATH){
    
    replace({
                regex: "MAGENTO_FOLDER",
                replacement: PATH,
                paths: [ __dirname + '/docker-compose/docker-compose.yml'],
                recursive: true,
                silent: true,
            });
            if (shell.cd(PATH, {silent: true}).code == 0){

                shell.exec("sudo chmod 777 bin/magento");
                shell.exec("sudo chown -R root * && sudo chgrp -R apache *");
                console.log("\n" + "Permissões, mudanças de Owner e Group do diretório: " + chalk.green.bold("OK") + "\n")

            }else{
                console.log(chalk.red.bold("Não conseguimos acessar o diretório informado."));
                inputPath();
            }

            console.log(chalk.white.bold("Seu diretório de trabalho que será espelhado para o container é: " + chalk.magentaBright.bold(PATH)));

            console.log("\n" + "Use o comando " + chalk.cyan.bold("b4atech magento2 start") + " para começarmos a ação!" + "\n");
}

function dockerComposeUp() {

     shell.cd("docker-compose");
     //Entra no diretório docker-compose, pois é de la que os comandos compose tem que ser executados
     
    console.log(chalk.blue.bold("docker-compose -") + chalk.green.bold("START") + '\n');

     if (shell.exec("docker-compose up -d").code == 0){
     //Abre starta o docker-compose em modo background 
          console.log("\n" + chalk.blue.bold("docker-compose -") + chalk.green.bold("SUCESSO") + '\n' + "\n");
     }; 

    console.log(chalk.cyan.bold("|-----------------------|CONTAINERS ONLINE|-------------------------|"));
    shell.exec("docker-compose ps");
     //Lista os containers gerados pelo composer

     let ipMagento = getIpByContainerName('/magento2');
     let ipMySql = getIpByContainerName('/mysql-magento2');

     console.log("\n" + chalk.white.bold("Magento - ") + chalk.hex("#FFA500").bold(ipMagento));
     console.log(chalk.white.bold("MySQL - ") + chalk.hex("#4693d8").bold(ipMySql) + "\n");

     magentoConfig(ipMagento, ipMySql);
     //IMPORTANT!! 

     openInBrowser(ipMagento);
 
}

function getIpByContainerName(containerName) {
     ipContainer = shell.exec("docker ps -q | xargs -n 1 docker inspect --format '{{ .NetworkSettings.IPAddress }} {{ .Name }}' | grep " + containerName + " | cut -d' ' -f 1", { silent: true }).stdout;

     return ipContainer = ipContainer.replace(/(\r\n|\n|\r)/gm, "");
}

function magentoConfig(ipMagento, ipMySql) {

     let setupInstall = 'bin/magento setup:install --base-url=http://' + ipMagento + " --db-host="+ ipMySql +" --db-name=magento --db-user=magento --db-password=magento --admin-firstname=magento --admin-lastname=admin --admin-email=yoda@b4agroup.com --admin-user=magento --admin-password=magento1289 --language=pt_BR --currency=BRL --timezone=America/Sao_Paulo --use-rewrites=1";
     let setupDbSchemaUpgrade = "bin/magento setup:db-schema:upgrade";
     let setupUpgrade = "bin/magento setup:upgrade";
     let dockerExec = "docker exec -i magento2 "; 


     console.group();
     if (shell.exec(dockerExec + setupInstall, {silent: true}).code == 0){
          //Toda a configuração do magento setup via cli
          console.log("MAGENTO | setup:install -" + chalk.bold("DONE"));

     };
     
     if (shell.exec(dockerExec + setupDbSchemaUpgrade, { silent: true }).code == 0){
          //Comando que atualiza o schema do banco
          console.log("MAGENTO | setup:db-schema:upgrade -" + chalk.bold("DONE"));
     
     };
     
     if (shell.exec(dockerExec + setupUpgrade, { silent: true }).code == 0){
          //Comando que verifica e da um upgrade em todas as dependecias que o magento necessita
          console.log("MAGENTO | setup:upgrade -" + chalk.bold("DONE"));

     };

     //shell.exec("sudo chmod -R 777 ../magento2/generated/*");
  
}

function magentoInfo(){

    if(shell.exec("docker exec -i magento2 bin/magento list", {silent: true}).code == 0){
        let adminUrl = shell.exec("docker exec -i magento2 bin/magento info:adminuri | cut -d' ' -f 3", { silent: true }).stdout;
        adminUrl = adminUrl.replace("/", "");
        let siteUrl = shell.exec("docker exec -i magento2 bin/magento config:show  | grep base_url | cut -d' ' -f 3", { silent: true }).stdout;
        adminUrl = (siteUrl + adminUrl).replace(/(\r\n|\n|\r)/gm, "");
        
        console.group();
        console.log(chalk.bold("Seu Magento está funcionando :D") + "\n");
        console.log("URL Loja - " + chalk.hex("#f46f25").bold(siteUrl));
        console.log("URL Admin - " + chalk.hex("#f46f25").bold(adminUrl) + "\n");
    }else{
        console.log(chalk.red.bold("Não foi possível enviar comandos para o container. Verifique se esta realmente funcionando. " + "\n"));
    }
}

function helpMe() {

     console.log("\n" + chalk.yellowBright.bold("Houve algo errado com o comando utilizado! D:") + "\n");
     console.group();
     console.log("Modo de uso:" + chalk.white.bold(" b4atech magento2 [comando]")+ "\n");
     console.group();
     console.log("install      Faz todo o processo de instalação dos ambiente");
     console.log("start        Sobe todos os containers, mesmo que (docker-compose up -d)");
     console.log("setFolder    Comando para poder configurar o diretorio de desenvolvimento (configura o volume docker)");
     console.log("info         Mostra uma lista de informações do magento (comando executado no container do magento)");
     console.log("ls           Lista os containers-compose onlines, mesmo que (docker-compose ps)");
     
}

function incrementSeconds() {
    incrementSecondscount -= 1;
    console.log("Faltam " + chalk.hex("#FFA500").bold(incrementSecondscount) + " " + incrementSecondsMsg);
    if (incrementSecondscount == 1) {
        console.log("\n");
        openUrl.open("http://" + ipContainer, function (err) {
            err = " ";
        })
        process.exit();
    }
}

function openInBrowser(ip) {
    ipContainer = ip;
    incrementSecondscount = 4;
    incrementSecondsMsg = "Para abrirmos o Magento em seu navegador! 0/"

    let countDown = setInterval(incrementSeconds, 1000);

}

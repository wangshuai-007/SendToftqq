import * as tl from "azure-pipelines-task-lib/task";
const axios = require('axios').default;

async function run() {
    try {
        //const inputString: string | undefined = tl.getInput('samplestring', true);
        //if (inputString == 'bad') {
        //    tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
        //    return;
        //}
        //process.env[`INPUT_ftqqConnection`] = "ftqqConnection";
        //process.env[`INPUT_text`] = "retag";
        //process.env[`INPUT_desp`] = "runtim";
        //process.env[`ENDPOINT_AUTH_PARAMETER_ftqqConnection_SERVICEPRINCIPALID`] = "";
        //process.env[`ENDPOINT_AUTH_PARAMETER_ftqqConnection_TENANTID`] = "https://sc.ftqq.com/";
        //process.env[`ENDPOINT_AUTH_PARAMETER_ftqqConnection_SERVICEPRINCIPALKEY`] = "";

        console.log('begin run');
        //const got = require('got');

        const ftqqConnection: string | undefined = tl.getInput('ftqqConnection', true);
        //var ftqqConnection = "ftqqConnection";
        if (ftqqConnection != null) {
            console.log(ftqqConnection);

            let webServiceEndpointPassword = tl.getEndpointAuthorizationParameter(ftqqConnection, "password", true);
      

            if (webServiceEndpointPassword == null) {
                console.log('require password,please add SCKey in the Generic connectedService(https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml#create-new),the SCKEY is in http://sc.ftqq.com/?c=code');
            }
            let webServiceEndpointUrl = tl.getEndpointUrl(ftqqConnection, false);
            //let webServiceEndpointUrl =
            //    'https://sc.ftqq.com/';
            if (webServiceEndpointUrl == null)
                webServiceEndpointUrl =
                    'https://sc.ftqq.com/';

            let text: string | undefined = tl.getInput('text', true);
            let desp: string | undefined = tl.getInput('desp', true);
            if (text == null)
                text = ' Send by Azure DevOps pipline';

            let otherUrl = webServiceEndpointUrl + webServiceEndpointPassword as string + '.send?text=' + text;
            if (desp != null)
                otherUrl += '&desp=' + desp;
            //axios.baseURL = webServiceEndpointUrl;
            console.log('BaseUrl:' + webServiceEndpointUrl);
            axios.get(otherUrl)
                .then((response: any) => {
                    // handle success
                    console.log('sucess send to ftqq');
                    console.log(response);
                })
                .catch((error: any) => {
                    // handle error
                    console.log(error);
                });

            //(async () => {
            //    try {
            //        const searchParams = new URLSearchParams(([['text', text], ['desp', desp]]) as any);

            //        if (desp == null)
            //            searchParams.delete('desp');

            //        const response = await got(webServiceEndpointPassword + '.send',
            //            { prefixUrl: webServiceEndpointUrl, searchParams });
            //        console.log(response.body);
            //        //=> '<!doctype html> ...'
            //    } catch (error) {
            //        console.log(error.response.body);
            //        //=> 'Internal server error ...'
            //    }
            //})();

        }

        console.log('end run');


        //console.log('Hello', inputString);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
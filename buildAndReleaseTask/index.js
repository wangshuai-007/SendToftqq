"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tl = __importStar(require("azure-pipelines-task-lib/task"));
var axios = require('axios').default;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var ftqqConnection, webServiceEndpointPassword, webServiceEndpointUrl, text, desp, otherUrl;
        return __generator(this, function (_a) {
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
                ftqqConnection = tl.getInput('ftqqConnection', true);
                //var ftqqConnection = "ftqqConnection";
                if (ftqqConnection != null) {
                    console.log(ftqqConnection);
                    webServiceEndpointPassword = tl.getEndpointAuthorizationParameter(ftqqConnection, "password", true);
                    if (webServiceEndpointPassword == null) {
                        console.log('require password,please add SCKey in the Generic connectedService(https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml#create-new),the SCKEY is in http://sc.ftqq.com/?c=code');
                    }
                    webServiceEndpointUrl = tl.getEndpointUrl(ftqqConnection, false);
                    //let webServiceEndpointUrl =
                    //    'https://sc.ftqq.com/';
                    if (webServiceEndpointUrl == null)
                        webServiceEndpointUrl =
                            'https://sc.ftqq.com/';
                    text = tl.getInput('text', true);
                    desp = tl.getInput('desp', true);
                    if (text == null)
                        text = ' Send by Azure DevOps pipline';
                    otherUrl = webServiceEndpointUrl + webServiceEndpointPassword + '.send?text=' + text;
                    if (desp != null)
                        otherUrl += '&desp=' + desp;
                    //axios.baseURL = webServiceEndpointUrl;
                    console.log('BaseUrl:' + webServiceEndpointUrl);
                    axios.get(otherUrl)
                        .then(function (response) {
                        // handle success
                        console.log('sucess send to ftqq');
                        console.log(response);
                    })
                        .catch(function (error) {
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
            return [2 /*return*/];
        });
    });
}
run();

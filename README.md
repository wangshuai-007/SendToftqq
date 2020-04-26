---

---


A tool to send messages to wechat in Azure DevOps pipline.

-----

First you must  create a SCKEY from [ftqq](http://sc.ftqq.com/?c=code)

![ftqq_SCKEY](https://github.com/wangshuai-007/SendToftqq/blob/master/images/ftqq_SCKEY.png)

Then you must create a connection in [Azure DevOps project setting](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml#create-new).

![azureDevops_AddConnection](https://github.com/wangshuai-007/SendToftqq/blob/master/images/azureDevops_AddConnection.png)

Or,You can use this task in `azure-pipelines.yml`

```yml
- task: wangshuai.Message.send-message-task.SendToftqq@0
  displayName: 'Send message to ftqq'
  inputs:
    ftqqConnection: ftqqConnection
    text: 'send by Azure DevOps pipline'
```

firs,you must add a  [Generic connection](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml#create-new) named by `ftqqConnection`
const express = require('express');
const router = express.Router();
const axios = require('axios');
const async = require('async')

//axios.default.get.headers['Content-Type'] = "application/json"

/* GET api listing. */
router.get('/', (req, res) => {
  res.json({'message':'api works'});
});



/* NewOrders */

var buildNewOrders=(data)=>{
    let newOrders = []
    let procesesInstance = data['process-instance']
    
    for(i=0; i<procesesInstance.length; i++){
        p=procesesInstance[i]
        newOrders.push(
            {
                'id': p['process-instance-id'],
                'initiator': p['initiator'],
                'status': p['process-instance-state'],
                'startDate': new Date(p['start-date'])
                
            }
        )
    }
    return newOrders;
}
var buildNewOrderDetails=(id,data)=>{
    let variables = data['variable-instance'];
    var details = {}
    variables.forEach(e => details[e.name]= e.value );
    return {
        'id': id,
        'address': details['address'],
        'approved': details['approved'],
        'hoaMeetingDate': details['hoaMeetingDate'],
        'condominum': details['condo'],
        'govApproved': details['govPermitsApproved'],
        'hoaApproved': details['hoaApproved']
    };
}


router.get('/newOrders', (req, res) => {
    
    var status=req.query['status']

    //console.log(req.query)
    //${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/processes/${PROCESS_DEFINITION}/instances?status=$1
    const kieServerHost = req.headers['kieserverhost']
    const authorization = req.headers['authorization']//'Basic cmljYXJkbzpicG1z'//
    //const url=`http://192.168.56.101:8080/kie-server/services/rest/server/queries/processes/new-order-permitting-kjar.NewOrderProcess/instances?status=${status}`
    const url=`${kieServerHost}/kie-server/services/rest/server/queries/processes/new-order-permitting-kjar.NewOrderProcess/instances?status=${status}`
    

    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    let config = {
        headers: headers,
     }

    axios.get(url, config).then((response) => {
        var newOrders = buildNewOrders(response.data)        
        res.json(newOrders);
    }).catch((error) => {
        //console.error(error.request);
        console.error(error);
        res.status(error.response.status).json(error.response.body);
    });
});

router.get('/newOrders/:id', (req, res) => {
    const id=req.params['id']
    
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    //const url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/processes/instances/${id}`
    const url = `${kieServerHost}/kie-server/services/rest/server/queries/processes/instances/${id}/variables/instances`

    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };
    axios.get(url, {headers: headers}).then((response) => {
        var newOrder = buildNewOrderDetails(id,response.data)
        res.json(newOrder);
    }).catch((error)=>{ 
        res.status(error.response.status).json(error.response.body);
    });
});

router.delete('/newOrders/:id', (req, res) => {
    const id=req.params['id']
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    const url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/processes/instances/${id}`
        
    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };
    axios.delete(url, {headers: headers}).then((response) => {
        var newOrder = buildNewOrder(response.data)
        res.json();
    }).catch((error)=>{ 
        console.error(error);
        res.status(error.response.status).json(error.response.body);
    });
});

router.post('/newOrders', (req, res) => {
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    let url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/processes/new-order-permitting-kjar.NewOrderProcess/instances`
    
    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    console.log(req.body)
    let params = {
        'address': req.body['address'],
        'condo': `${req.body['condominium']}`,
        'hoaMeetingDate': req.body['hoaMeetingDate']
    }

    axios.post(url,params, {headers: headers}).then((response) => {        
        res.json(respose);
    }).catch((error)=>{ 
        res.status(error.response.status).json(error.response.data);
    });
});



/*HOA Meetings */

var buildHoaMeetings = (data) => {
    //console.log(data)
   
    let hoaMeetings = []
    let tasks = data['task-summary']
    
    tasks.forEach((item) =>{
        hoaMeetings.push({
            'id': item['task-id'],
            'owner': item['task-actual-owner'],
            'status': item['task-status']
        })
    })
   
    return hoaMeetings;
}

var buildHoaMeeting = (data) => {
    return {};
}

router.get('/hoaMeetings', (req, res) => {
    const kieServerHost = req.headers['kieserverhost']
    const authorization = req.headers['authorization']
    
    const url=`${kieServerHost}/kie-server/services/rest/server/queries/tasks/instances/owners`
    
    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };
    axios.get(url, {headers: headers}).then((response) => {        
        var hoaMeetings = buildHoaMeetings(response.data)
        res.json([]);
    }).catch((error)=>{ 
        console.log(error)
        res.status(error.response.status).json(error.response.body);
    });
});

router.get('/hoaMeetings/potential', (req, res) => {
    const groups="sales"//req.query['groups']
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    const url=`${kieServerHost}/kie-server/services/rest/server/queries/tasks/instances/pot-owners?groups=${groups}`    
    console.log(url)

    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    axios.get(url, {headers: headers}).then((response) => {
        var hoaMeetings = buildHoaMeetings(response.data)
        res.json(hoaMeetings);
    }).catch((error)=>{ 
        res.status(error.response.status).json(error.response.body);
    });
});

router.get('/hoaMeetings/:id', (req, res) => {
    const id=req.params['id']
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']

    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    let url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/tasks/${id}`
    let urlVars=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/tasks/${id}/contents/input`    

    let getDetails=(callback)=>{
        axios.get(url, {headers: headers}).then((response) => {
           callback(null, response)
        }).catch((error)=>{ 
            callback(error,null)
        });
    }

    let getVars=(callback)=>{
        axios.get(urlVars, {headers: headers}).then((response) => {
            callback(null, response)
        }).catch((error)=>{ 
           callback(error,null)
        });
    }

    async.parallel([getDetails,getVars], (err, results)=>{
        if(err){
            console.log(err)
            res.status(error.response.status).json(error.response.body);
            return;
        }

        var data = results[0].data;
        var vars = results[1].data;

        var details = {
            'id': data['task-id'],
            'owner': data['task-actual-owner'],
            'status': data['task-status'],
            'address': vars['address'],
            'date': vars['date'],            
            'noStartedReassign':  vars['NotStartedReassign'],
            'skippable':  vars['Skippable']
        };

        res.json(details);
    });    
});

router.put('/hoaMeetings/:id/claimed', (req, res) => {
    const taskId = req.params['id']
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    let urlClaim=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/tasks/${taskId}/states/claimed`
    let urlStart=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/tasks/${taskId}/states/started
    `

    var claim = (callback)=>{
        axios.put(urlClaim,{}, {headers: headers}).then((response) => {        
            callback(null, response);
        }).catch((error)=>{ 
            callback(error,null)
        });
    };

    var start = (callback)=>{
        axios.put(urlStart,{}, {headers: headers}).then((response) => {        
            callback(null, response);
        }).catch((error)=>{ 
            callback(error,null)
        });
    };

    async.series([claim, start],(err,results) => {
        if(err){
            res.status(error.response.status).json(error.response.body);
            return;
        }
        res.json({});
    })
   
});

router.put('/hoaMeetings/:id/completed', (req, res) => {
    const taskId = req.params['id']
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    let url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/tasks/${taskId}/states/completed`
   
    var data = {'approved':`${req.body.approved}`}    

    axios.put(url, data, {headers: headers}).then((response) => {
        req.json({});
    }).catch((error)=>{
        res.status(error.response.status).json(error.response.body);
    })
});


module.exports = router;
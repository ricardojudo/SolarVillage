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
    console.log(procesesInstance)
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
    console.log(newOrders)
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
        res.status(422).json([]);
    });
    //console.log(req.headers)
    
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
        console.error(error.response.status);
        res.status(422).json([]);
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
        'condo': 'false',//req.params['condo'],
        'hoaMeetingDate': req.params['hoaMeetingDate']
    }

    axios.post(url,params, {headers: headers}).then((response) => {        
        res.json(respose);
    }).catch((error)=>{ 
        res.status(error.response.status).json(error.response.data);
    });
});



/*HOA Meetings */

var buildHoaMeetings = (data) => {
    return [];
}

var buildHoaMeeting = (data) => {
    return {};
}

router.get('/hoaMeetings', (req, res) => {
    const kieServerHost = req.headers['kieserverhost']
    const authorization = req.headers['authorization']
    
    const url=`URL=${kieServerHost}/kie-server/services/rest/server/queries/tasks/instances/owners`
    console.log("<<<<"+ url)

    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    axios.get(url, {headers: headers}).then((response) => {
        var hoaMeetings = buildHoaMeetings(response.data)
        res.json(hoaMeetings);
    }).catch((error)=>{ 
        console.error(error);
        res.status(422).json([]);
    });
});

router.get('/hoaMeetings/potential', (req, res) => {
    const groups=req.query['groups']
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    const url=`${kieServerHost}/kie-server/services/rest/server/queries/tasks/instances/pot-owners?groups=${groups}`    

    console.log("<<<<"+ url)

    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    axios.get(url, {headers: headers}).then((response) => {
        var hoaMeetings = buildHoaMeetings(response.data)
        res.json(hoaMeetings);
    }).catch((error)=>{ 
        console.error(error);
        res.status(422).json([]);
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
        axios.get(url, {headers: headers}).then((response) => {
            callback(null, response)
        }).catch((error)=>{ 
           callback(error,null)
        });
    }

    async.parallel([getDetails,getVars], (err, results)=>{
        if(err){
            console.log(err)
            res.status(422).json({})
            return;
        }

        console.log(results)
        res.json({});
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
            res.status(422).json({});
            return;
        }

        res.json({});
    })
   
});

router.put('/hoaMeetings/:id/closed', (req, res) => {
    const taskId = req.params['id']
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    let headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    };

    let url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/tasks/${taskId}/states/claimed`
   
    var data = {'approved':req.params.approved}    

    axios.put(url, data, {headers: headers}).then((response) => {
        req.json({});
    }).catch((error)=>{
        req.status(422).json({})
    })
});


module.exports = router;
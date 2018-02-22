const express = require('express');
const router = express.Router();
const axios = require('axios');
const async = require('async')

/* GET api listing. */
router.get('/', (req, res) => {
  res.json('api works');
});



/* NewOrders */

var buildNewOrders=(data)=>{
    let newOrders = []
    for(i=0; i<data.lenght; i++){
        newOrders.push(buildNewOrder(data[i]))
    }
    return newOrders;
}
var buildNewOrder=(data)=>{
    return {};
}


router.get('/newOrders', (req, res) => {
    var status=req.query['status']

    //console.log(req.query)
    //${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/processes/${PROCESS_DEFINITION}/instances?status=$1
    const kieServerHost = req.headers['kieserverhost']
    const authorization = req.headers['authorization']
    const url=`${kieServerHost}/kie-server/services/rest/server/queries/processes/new-order-permitting-kjar.NewOrderProcess/instances?status=${status}`

    //console.log("<<<<"+ url)

    let headers = {
        'Authorization': authorization};
    axios.get(url, {headers: headers}).then((response) => {
        var newOrders = buildNewOrders(response.data)
        res.json(newOrders);
    }).catch((error) => {
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
    const url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/processes/instances/${id}`
    
    console.log("<<<<"+ url)

    let headers = {
        'Authorization': authorization};
    axios.get(url, {headers: headers}).then((response) => {
        var newOrder = buildNewOrder(response.data)
        res.json(newOrder);
    }).catch((error)=>{ 
        console.error(error);
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
        'Authorization': authorization};
    axios.delete(url, {headers: headers}).then((response) => {
        var newOrder = buildNewOrder(response.data)
        res.json();
    }).catch((error)=>{ 
        console.error(error);
        res.status(422).json([]);
    });
});

router.post('/newOrders', (req, res) => {
    const kieServerHost = req.headers['kieserverhost']
    const kieContainerName = req.headers['kiecontainername']
    const authorization = req.headers['authorization']
    let url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/processes/new-order-permitting-kjar.NewOrderProcess/instances`
    
    let params = {
        'address':req.params['address'],
        'condo': req.params['condo'],
        'hoaMeetingDate': req.params['hoaMeetingDate']
    }


    axios.post(url,params, {headers: headers}).then((response) => {        
        res.json(respose);
    }).catch((error)=>{ 
        console.error(error);
        res.status(422).json([]);
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
        'Authorization': authorization};
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
        'Authorization': authorization};
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
        'Authorization': authorization};

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
        'Authorization': authorization};

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
        'Authorization': authorization};

    let url=`${kieServerHost}/kie-server/services/rest/server/containers/${kieContainerName}/tasks/${taskId}/states/claimed`
   
    var data = {'approved':req.params.approved}    

    axios.put(url, data, {headers: headers}).then((response) => {
        req.json({});
    }).catch((error)=>{
        req.status(422).json({})
    })
});


module.exports = router;
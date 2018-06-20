var MbedCloudSDK = require("mbed-cloud-sdk");
var fs = require("fs");
var path = require("path");
var sleep = require('sleep');
//var connect = new MbedCloudSDK.ConnectApi(config);
//const observer = connect.subscribe.deviceState();

//console.log("OBSERVER:"+" "+observer);
var connect = new MbedCloudSDK.ConnectApi({
    apiKey: "ak_1MDE1ZDUwYTFmYmM2MDI0MjBhMDExMTA5MDAwMDAwMDA015e967fe74802420a01390300000000aJOhYRqzTXINzN9Aw2OkV5WrG0YwgmKS"
});
var devicename = [];
var commonname = [];
var devicepath = [];
var Result;
connect.listConnectedDevices(function(error,result) {
    //console.log('Called');
    if(result) {
    //console.log(result);
        result.data.forEach(function(device, index, array) {

            devicename[index] = device.id;
            devicealias = device.alias;
            var splitdevicename = devicealias.split("-"); //As the alias path has two - and after second - there is the common name of the device
            commonname[index] = splitdevicename[2]; 
            if(commonname[index]){
            	console.log(device.id + " alias name "+ device.alias + " common name " + commonname[index]);
            	connect.listResources("01633eaf39a0125548a53ade00300000").then(function(result){
            	//console.log(result);
                if(result) {    
                    console.log("\n Length of the resources of " + commonname[index] + " \n " + result.length);
                	var i=0;
        	        	for(;i<result.length;i++){
        	        		//console.log("------------getResource----------------");
        	        		var path = result[i].path;
        	        		path=path.trim();
        	        		path = path.split("/");
        	        		if(path.length > 3){
        	        			//console.log(path);
                                console.log("\n" + device.id + "\n" + result[i].path + "\n");
                                //sleep.sleep(6);
        	        			connect.getResourceValue(device.id,result[i].path).then(function(answer,error){                                
                                    if(answer) {
        		        			   console.log("Path"+ path +" Value"+answer);
                                        //sleep.sleep(3);
                                    }
        		        		},function(err){
        		        			console.log(err.Error);
                                    
        		        		})
        	        		}	
        	        	}
                    }
                })
            }
            
            //console.log("Values for")

            /*connect.listDeviceSubscriptions(device.id).then(function(result){
            	console.log(result);
            
            });*/

        })
    }
    console.log("DeviceName ",commonname," ");
    console.log("Deviceid", devicename, " ");
})



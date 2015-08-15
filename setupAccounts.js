var bloc = require('blockapps-js');
var argv = require('yargs')
	.usage('Usage: $0 <command> (options)')
	.demand(1)
	.command('upload [contract]', 'upload contract to blockchain')
	.command('genkey', 'generate a new private key and fill it at the faucet')
	.command('register', 'register your app with BlockApps')
	.argv;
var prompt = require('prompt');
var conf = require('./package.json').bloc;


var cmdArr = argv._;

/** from bloc repo **/
var key = require('bloc/lib/keygen');
var register = require('bloc/lib/register');
var upload = require('bloc/lib/upload.js');

switch(cmdArr[0]) {

	case 'upload':
		console.log('uploading');

		var contractName = cmdArr[1];
        if (contractName === undefined) {
            console.log("contract name required");
            break;
        }
		var store = key.readKeystore();
		var address = store.addresses[0];

		prompt.start();

    	prompt.get({
    		properties: {
				password: {
					message: "Enter password to decrypt key file",
					hidden: true,
					required: true
				}
			}
    	}, function(err,result) {
            upload.upload(
                contractName, config.apiURL, config.appName, metaDest, scaffold,
                store.exportPrivateKey(address, result.password)
            );
        });
		break;

	case 'genkey':
		console.log('generating key');
		prompt.start();
		prompt.get({
			properties: {
		      password: {
		        message: "Enter a high entropy password",
		        hidden: true,
		        required: true
		      }
		    }
		}, function (err,result) {
	    	key.generateKey(result.password, conf.apiURL+'/eth/v1.0/faucet');
	    });
		break;

	case 'register':
		console.log('registering');
		register.registerApp(conf, function (res) {
			console.log(res + ": registered, confirm via email");
		});
		break;

	default:
         console.log("unrecognized command");

}

//https://github.com/coreybutler/node-windows
module.exports = function(dirname, path){
    var Service = require('node-windows').Service;

    var debug = typeof v8debug === 'object';
    console.log("debuggin? " + debug);

    if(!debug){
        // Create a new service object
        var svc = new Service({
            name:'woddiggity',
            description: 'The nodejs.org example web server.',
            script: path.join(dirname, 'server.js')
        });


    //    // Listen for the "uninstall" event so we know when it's done.
    //    svc.on('uninstall',function(){
    //        console.log('Uninstall complete.');
    //        console.log('The service exists: ',svc.exists);
    //    });

        // Uninstall the service.
       // svc.uninstall();

        // Listen for the "install" event, which indicates the
        // process is available as a service.
        svc.on('install',function(){
            svc.start();
        });

        svc.install();
    }
}

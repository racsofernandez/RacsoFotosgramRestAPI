import express from 'express';

export default class Server {

    public app: express.Application;
    public port: number=3000;

    constructor () {
        this.app = express();
    }

    start() {
        
        // this.app.listen( this.port, callback  );

        var server = this.app.listen(3000, function (){
            console.log("Calling app.listen's callback function.");
            var host = "localhost";
            var port = "3000";
            console.log('Example app listening at http://%s:%s', host, port);
          });    
          

        
    }



}
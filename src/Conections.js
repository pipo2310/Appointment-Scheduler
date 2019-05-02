var mysql=require('mysql');
function conection() {
    this.poll=null;
    this.iniciar=function() {
        this.poll=mysql.createPool({
           host:'consultasdb-instance.cqyg0zdcdpb3.us-east-1.rds.amazonaws.com',
           user:'user-consultas',
           password='Inge1Proyecto',
           port=' 3306',
           database='consultasdb-instance'
        })
        
    }
    this.obtener=function(callback) {
        this.poll.getConection(function(error,connection){

            callback(error,conection);
        })
    }

    
}
module.exports=new conection();
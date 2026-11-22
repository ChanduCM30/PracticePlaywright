/*

3. What is a Promise?

Definition:

A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

A Promise has three states:

State	Meaning
Pending	Operation is still running
Fulfilled	Operation completed successfully
Rejected	Operation failed
Example
*/

const mypromise=new Promise((resolve,reject)=>{
    let success=true;
    if(success){
        resolve("Operation completed successfully");
    }else{
        reject("Operation failed");
    }
})

mypromise.then((result)=>{
    console.log(result);
})
.catch((error)=>{
    console.log(error);
})
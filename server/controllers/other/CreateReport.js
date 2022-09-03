const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
module.exports=async (array)=>{
	console.log("array",array)
	const name=  Math.random().toString(36).substring(2, 15) + Math.random().toString(23).substring(2, 5);

	const csvWriter = createCsvWriter({
		  path: `${__dirname}/../../media/rapports/rapport${name}.csv`,

		  header: [{id:"row",title:"Row Number"},{id:"error",title:"Error "}],append:true
	});
	await csvWriter.writeRecords([{row:"Row Number",error:"Error "}])       // returns a promise
	await csvWriter.writeRecords(array)       // returns a promise
	return `/media/rapports/rapport${name}.csv`; 

}


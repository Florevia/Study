const fs = require("fs");
function find() {
  fs.readdir(process.cwd(), (err, files) => {
    
    if (err) {
      console.log(err)
    } else {
      console.log("目录内容", files)
    }
  })
};
find();
// console.log(process.cwd())
module.exports = {
      // Paths
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      host: 'localhost',
      port: 4001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined,
      oracleDbStr : "BDC", //"oracle",
      oracleDbUser: "RMS",
      oracleDbPwd: "0",
      basicUser : "",
      basicUserPwd: "",
      dev : 'development',
      prod : 'production',
      env :  'development',
      whiteListOrigins :['localhost:4001'],
      mailHost:'smtp.gmail.com',
      mailPort:'587',
      mailUser:'',
      mailPassword:''
};

const auth = {login: 'yourlogin', password: 'yourpassword'} // change this
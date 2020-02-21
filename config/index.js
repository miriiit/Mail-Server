module.exports = {
      // Paths
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      host: 'localhost',
      port: 4001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined,
      oracleDbStr : "BDC", //"oracle",
      oracleDbUser: "RMS",
      oracleDbPwd: "0",
      basicUser : "ktrade",
      basicUserPwd: "#ktr@d3#",
      dev : 'development',
      prod : 'production',
      env :  'development',
      whiteListOrigins :['localhost:4001','http://www.kasb.com'],
      mailHost:'smtp.gmail.com',
      mailPort:'587',
      mailUser:'     -- mail -- here -- ',
      mailPassword:' -- mail -- password --'
};

const auth = {login: 'yourlogin', password: 'yourpassword'} // change this
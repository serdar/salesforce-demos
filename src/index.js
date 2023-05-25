require("dotenv").config();
const nforce = require("nforce");

const sf2 = async () => {
  const options = {
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET,
    redirectUri: "http://localhost",
  };

  var username = process.env.SF_USERNAME,
    password = process.env.SF_PASSWORD,
    securityToken = process.env.SF_TOKEN,
    oauth;

  var org;
  org = nforce.createConnection(options);

  const resp = await org.authenticate({
    username: username,
    password: password,
    securityToken: securityToken,
  });

  oauth = resp;

  var acc = nforce.createSObject("Account");
  acc.set("Name", "Spiffy Cleaners2");
  acc.set("Phone", "800-555-2345");
  acc.set("SLA__c", "Gold");

  org.insert({ sobject: acc, oauth: oauth }, function (err, resp) {
    if (!err) console.log("It worked!");
    if (err) console.log(err);
  });
};
sf2();

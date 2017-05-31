var admin = require("firebase-admin");

var serviceAccount = require("./gserviceaccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://magnesia-b64b9.firebaseio.com"
});

var users = [
"YMRnQtm4W1bswTBZQPAETAAsZ6o1",
"dL9GkpBUpZNG8L3LewGXCjjP7hi1",
"eCizvjD6Y3dJ6FEq1AZNoYgUfWj2",
"dWvdRYF99zSOu3qvNi1rPo0ewuR2",
"f3aV4Iid1ibAnlsMwwIwIVGIYKD3",
"jH3071j0LkdxeiJ7N8Fxq0dOZ1y2",
"jdN1CGccYtYnxiweJEBUK0Zgyzt2",
"kiauPu3b3pPChvY7488K5RNjXEV2",
"li24yoAdANfQt69LolxlBBcbrg03",
"mvCKO0iQp8Oi4yOKmzuqTHrXKEo2",
"oenj9w1MlmeQm1IJn1ei9c1Tk5P2",
"p0ujnFuMQPQ4jHncUXroPlefVSr2",
"qR7lHaJjLeYya2KP9DP99rIY1Lv1",
"rUm8P9fbGvX5xFQ0j9P1LTpf9D93",
"RhPZzKPAxDNONvSxOccmL5fq2L22",
"s2F25xq1PZdi1N11D4WGDf3YJNC3",
"sJEyRUMcPPXxXUHDKUbkkOJsnjk1",
"sWubZ1AMT6Q5eO5DurSrG7ikul03",
"uk5J410Rx8hWQburosD6T3Logr82",
"uxiGfiYj0LaGVvy726alKBUvYu92",
"v02YFuoABNgqkwM5NO9L7AsUUyX2",
"vQudtHn8QhRnTPeAVLOOyeKWEYB2",
"vxoXlZ7VHraOx7uRC7McqqALJBA2",
"wvbzN15rDecYOnNKDloKq32pQ6P2",
"yJvEaKazqrPWoi0CjRjPcArnHfA3",
"yjJbrPMsrvfl5QVLLqx64fE8OXc2",
"zVKyuVOqW5SyZM2bOPpyliDTbWF2"
]
for (var i = 0; i < users.length; i++) {
	var uid = users[i];
	admin.auth().deleteUser(uid)
	  .then(function() {
	    console.log("Successfully deleted user");
	  })
	  .catch(function(error) {
	    console.log("Error deleting user:", error);
	  });
};

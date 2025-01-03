var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", this.onOffline, false);
        document.addEventListener("online", this.onOnline, false);
        document.addEventListener("resume", this.onResume, false);
        document.addEventListener("pause", this.onPause, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        cordova.plugins.firebase.messaging.requestPermission({forceShow: true}).then(function() {
        });
        cordova.plugins.firebase.messaging.getToken().then(function(token) {
            localStorage.setItem('push_noti_token',token)
        });
        cordova.plugins.firebase.messaging.onTokenRefresh(function() {
        });
        cordova.plugins.firebase.messaging.onMessage(function(payload) {
            localStorage.setItem('push_noti_msg',payload);
        });
        cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
            localStorage.setItem('push_noti_msg',payload);
            localStorage.setItem('push_noti_redirect','1');
        });
        // app.addRZPEventListener();

    },
    onResume: function() {
        // app.addRZPEventListener();
    },
    onPause: function() {
        // app.addRZPEventListener();
  localStorage.setItem("callUserInfoAPI","1")
    },
    onOffline: function() {
      // Handle the offline event
      // alert('no internet');
    },
    onOnline: function() {
      // Handle the online event
      var networkState = navigator.connection.type;

      if (networkState !== Connection.NONE) {
      }

    },

    // addRZPEventListener: function() {
    //     // document.getElementById('rzp-button').addEventListener('click', function(event) {
    //     //     RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);
    //     //     event.preventDefault();
    //     // })
    // }
};

app.initialize();

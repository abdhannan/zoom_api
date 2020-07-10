import { ZoomMtg } from "@zoomus/websdk";
const testTool = window.testTool;
// get meeting args from url
const tmpArgs = testTool.parseQuery();
const meetingConfig = {
  apiKey: "av_XAzOcS7yvwoEvfp47wA",
  meetingNumber: tmpArgs.mn,
  userName: (function () {
    if (tmpArgs.name) {
      try {
        return testTool.b64DecodeUnicode(tmpArgs.name);
      } catch (e) {
        return tmpArgs.name;
      }
    }
    return (
      "CDN#" +
      tmpArgs.version +
      "#" +
      testTool.detectOS() +
      "#" +
      testTool.getBrowserInfo()
    );
  })(),
  passWord: tmpArgs.pwd,
  leaveUrl: "/index.html",
  role: parseInt(tmpArgs.role, 10),
  userEmail: (function () {
    try {
      return testTool.b64DecodeUnicode(tmpArgs.email);
    } catch (e) {
      return tmpArgs.email;
    }
  })(),
  lang: tmpArgs.lang,
  signature: tmpArgs.signature || "",
  china: tmpArgs.china === "1"
};

// it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
function beginJoin(signature) {
  ZoomMtg.init({
    leaveUrl: meetingConfig.leaveUrl,
    webEndpoint: meetingConfig.webEndpoint,
    success: function () {
      console.log(meetingConfig);
      console.log("signature", signature);
      $.i18n.reload(meetingConfig.lang);
      ZoomMtg.join({
        meetingNumber: meetingConfig.meetingNumber,
        userName: meetingConfig.userName,
        signature: signature,
        apiKey: meetingConfig.apiKey,
        userEmail: meetingConfig.userEmail,
        passWord: meetingConfig.passWord,
        success: function (res) {
          console.log("join meeting success");
          console.log("get attendeelist");
          ZoomMtg.getAttendeeslist({});
          ZoomMtg.getCurrentUser({
            success: function (res) {
              console.log("success getCurrentUser", res.result.currentUser);
            },
          });
        },
        error: function (res) {
          console.log(res);
        },
      });
    },
    error: function (res) {
      console.log(res);
    },
  });
}

beginJoin(meetingConfig.signature);

document.getElementById("setting_button").addEventListener("click", (e) => {
  e.preventDefault();
});

$(document).ready(function() {
  $("#mute_button").on("click", (e) => {
    e.preventDefault();
    $("#wc-footer-left > div:nth-child(1) > button").click();
    // $("#securityOptionMenu").toggle();
    // $('#myModal').modal('show');

    // ZoomMtg.getAttendeeslist({
    //   success: function(response) {
    //     var list = response.result.attendeesList;
    //     list.forEach(element => {
    //       if(element.isHost == false) 
    //       {
    //         if(element.muted == true)
    //         {
    //           var template = 
    //           `<li class="list-group-item" style="display: flex; flex-direction: row; justify-content: space-between;">
    //             <span style="align-self: center">[` + element.userId + '] ' + element.userName + `</span>` + 
    //             `<button class="btn btn-default right mute_action" userId="` + element.userId + `" muted="` + element.muted + `">unmute</button>` +
    //           `</li>`;
    //           $(".modal-body.participant ul").append(template);
    //         }
    //         else
    //         {
    //           var template = 
    //           `<li class="list-group-item" style="display: flex; flex-direction: row; justify-content: space-between;">
    //             <span style="align-self: center">[` + element.userId + '] ' + element.userName + `</span>` + 
    //             `<button class="btn btn-default right mute_action" userId="` + element.userId + `" muted="` + element.muted + `">mute</button>` +
    //           `</li>`;
    //           $(".modal-body.participant ul").append(template);
    //         }
    //       }
    //     });
    //   },
    //   error: function(err) {
    //     console.log("err" + err);
    //   }
    // });

    // $('#myModal').on('hidden.bs.modal', function (e) {
    //   $(".modal-body.participant").html("");
    // });

    // $(".mute_action").on('click', function(e) {
    //   var button = $(e.target);
    //   var muted = button.attr("muted"); 
    //   var userId = button.attr("userId"); 
    //   ZoomMtg.mute({
    //     userId: parseInt(userId),
    //     mute: !muted,
    //     success: function(res) {
    //       console.log(res);
    //     }
    //   });
    
    // });

  });
});

$(document).ready(function() {
  $("#setting_button").on("click", (e) => {
    e.preventDefault();
    $("#dialog-join > div:nth-child(4) > div > div > div:nth-child(1) > button[title='Join Audio by Computer']").click();
  });

  $("#video_button").on("click", (e) => {
    e.preventDefault();
    $("#wc-footer-left > div:nth-child(2) > button").click();
  });

  $("#mute_button").on("click", (e) => {
    e.preventDefault();
    $("#wc-footer-left > div:nth-child(1) > button").click();
  });
  $("#chat_button").on("click", (e) => {
    e.preventDefault();
    $("#wc-footer > div:nth-child(2) > button:nth-child(3)").click();
  });
});
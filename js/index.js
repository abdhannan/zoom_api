import { ZoomMtg } from "@zoomus/websdk";


console.log("checkSystemRequirements");
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
// if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.9/lib', '/av'); // CDN version default
// else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.9/lib', '/av'); // china cdn option
// ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const API_KEY = "av_XAzOcS7yvwoEvfp47wA";

/**
 * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
 * The below generateSignature should be done server side as not to expose your api secret in public
 * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/tutorial/generate-signature
 */
const API_SECRET = "e1Y9QHS0lZ6fYx0BuaEc7s4fVcinDHwAfLma";


document.getElementById("join_meeting").addEventListener("click", (e) => {
  e.preventDefault();
  const meetingConfig = testTool.getMeetingConfig(88030418723, "362992");
  
  // testTool.setCookie("meeting_number", meetingConfig.mn);
  // testTool.setCookie("meeting_pwd", meetingConfig.pwd);

  const signature = ZoomMtg.generateSignature({
    meetingNumber: meetingConfig.mn,
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    role: meetingConfig.role,
    success: function (res) {
      meetingConfig.signature = res.result;
      meetingConfig.apiKey = API_KEY;
      const joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
      window.open(joinUrl, "_blank");
    },
  });

  // const signature = ZoomMtg.generateSignature({
  //   meetingNumber: meetingConfig.mn,
  //   apiKey: API_KEY,
  //   apiSecret: API_SECRET,
  //   role: meetingConfig.role,
  //   success: function (res) {
  //     console.log(res.result);
  //     meetingConfig.signature = res.result;
  //     meetingConfig.apiKey = API_KEY;
  //     const joinUrl =
  //       testTool.getCurrentDomain() +
  //       "/meeting.html?" +
  //       testTool.serialize(meetingConfig);
  //     testTool.createZoomNode("websdk-iframe", joinUrl);
  //   },
  // });
});


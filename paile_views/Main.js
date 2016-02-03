var React = require('react-native');
var Account = require('./views/Account');
var CemeraScan = require('./views/CameraScan');
var Detail = require('./views/Detail');
var Router = require('react-native-router');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  DeviceEventEmitter,
  NavigatorIOS
} = React;
//var Geolocation = require('Geolocation');
var Button = require('react-native-button');
var Camera = require('react-native-camera');
var {
    // Accelerometer,
    Gyroscope,
    // Magnetometer,
    RNLocation: Location
} = require('NativeModules');
//var DeviceMotion = require('./DeviceMotion.ios.js');
// var GyroscopeManager = require('./components/GyroscopeManager');
// var AccelerometerManager = require('./components/AccelerometerManager');
// var MagnetometerManager = require('./components/Magnetometer');

// var routes = {
//   gyroscope: {
//     title: 'Gyroscope',
//     component: GyroscopeManager
//   },
//   accelerometer: {
//     title: 'Accelerometer',
//     component: AccelerometerManager
//   },
//   magnetometer: {
//     title: 'Magnetometer',
//     component: MagnetometerManager
//   }
// };


var Main = React.createClass({
  //var geoWatchID: (null ?number),
  getInitialState() {
    return {
      cameraType: Camera.constants.Type.back,
      // magnetometerData: null,
      gyroZTheta: 0,
      // accelerometerData: null,
      //motionData: null,
       geoData: {
        "longitude": 0,
        "latitude": 0
       },
       headingData: 0
    }
  },

  componentDidMount() {

    //Accelerometer.setAccelerometerUpdateInterval(1); // in seconds
    //DeviceEventEmitter.addListener('AccelerationData', this.callbackAccelerometerData.bind(this));
    //Accelerometer.startAccelerometerUpdates(); // you'll start getting AccelerationData events above

    Gyroscope.setGyroUpdateInterval(1); // in seconds
    DeviceEventEmitter.addListener('GyroData', this.callbackGyroData.bind(this));
    Gyroscope.startGyroUpdates(); // you'll start getting AccelerationData events above
    
    // Magnetometer.setMagnetometerUpdateInterval(1); // in seconds
    // DeviceEventEmitter.addListener('MagnetometerData', this.callbackMagnetometerData.bind(this));
    // Magnetometer.startMagnetometerUpdates(); // you'll start getting AccelerationData events above
 
    // DeviceMotion.startDeviceMotionUpdates(1, (data) => {
      
    //     data.attitude.roll
    //     data.attitude.pitch
    //     data.attitude.yaw
      
    //   var state = this.state;
    //   state.motionData = data;
    //   this.setState(state);
    // });
  
    // this.setLocationUpdateInterval();

    //react-native-location
    Location.requestAlwaysAuthorization();
    Location.startUpdatingLocation();
    Location.setDistanceFilter(5.0);
    Location.startUpdatingHeading();

    DeviceEventEmitter.addListener('locationUpdated', (position) => {
      var state = this.state;
      state.geoData = position.coords;
      this.setState(state);
    });

    DeviceEventEmitter.addListener('headingUpdated', (data) => {
      var state = this.state;
      state.headingData = data.heading;
      this.setState(state);
    });
  },

  // callbackAccelerometerData(data) {
  //   /*
  //     * data.acceleration.x
  //     * data.acceleration.y
  //     * data.acceleration.z
  //     */
  //     var state = this.state;
  //     state.accelerometerData = data.acceleration;
  //     this.setState(state);
  // },

  callbackGyroData(data) {
      /*
      * data.rotationRate.x
      * data.rotationRate.y
      * data.rotationRate.z
      */
      //caculate the angle
      var gravityX = data.rotationRate.x;
      var gravityY = data.rotationRate.y;
      var gravityZ = data.rotationRate.z;
      //alert(Math.atan2(gravityZ,Math.sqrt(gravityX*gravityX+gravityY*gravityY)));
      var zTheta = Math.atan2(gravityZ,Math.sqrt(gravityX*gravityX+gravityY*gravityY))/Math.PI*180.0;
      var state = this.state;
      state.gycroZTheta = zTheta;
      this.setState(state);
  },

  // callbackMagnetometerData(data) {
  //   /*
  //     * data.magneticField.x
  //     * data.magneticField.y
  //     * data.magneticField.z
  //     */
  //     var state = this.state;
  //     state.magnetometerData = data.magneticField;
  //     this.setState(state);
  // },
  // setLocationUpdateInterval() {
  //     var state = this.state;
  //     var geo_options = {
  //       enableHighAccuracy: false,
  //       maximumAge: 500,
  //       timeout: 100
  //     };
  //     this.geoWatchID = navigator.geolocation.watchPosition( (position) => {
  //         //alert(JSON.stringify(position));
  //         //var locObject = JSON.parse(data);
  //         var geo = position.coords;
  //         //var state = this.state;
  //         state.geoData = geo;
  //         this.setState(state);
  //       },(error) => {
  //         alert("Fail to get location.")
  //     }, geo_options);
  // },

  render() {
    //var motionData = this.state.motionData;
    return (
        <Camera 
          ref="cam"
          style={styles.container}
          type={this.state.cameraType}
        >
        	<Text style={styles.btn} ref='account' onPress={this._loadAccount}>Account</Text>
            <Text>
              <Text> 经纬度: </Text>
                {this.state.geoData.longitude},
                {this.state.geoData.latitude}
            </Text>

            <Text>
              <Text>朝向: </Text>
              {this.state.headingData}
            </Text>
            <Text>
              <Text>水平角度: </Text>
              {this.state.gycroZTheta? 
              this.state.gycroZTheta : null}
            </Text>

          <Text style={styles.btn} onPress={this._switchCamera}>Switch Camera</Text>
          <Text style={styles.btn} onPress={this._takePicture}>Take Photo</Text>
        </Camera>
      );
  },
  // _onBarCodeRead: function() {
  //   console.log(e);
  // },
  _switchCamera: function() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
      this.setState(state);
  },
  _takePicture: function() {
    this.refs.cam.capture( function(err, data) {
      console.log(err, data);
    });
  },
  _loadAccount: function() {
  	this.props.toRoute({
  		name: "用户信息",
  		component: Account
  	});
  }, 
  componentWillUnmount() {
    // Accelerometer.stopAccelerometerUpdates();
    Gyroscope.stopGyroUpdates();
    // Magnetometer.stopMagnetometerUpdates();
    //DeviceMotion.stopDeviceMotionUpdates();
    //navigator.geolocation.clearWatch(this.geoWatchID);
    Location.stopUpdatingLocation();
    Location.stopUpdatingHeading();
  }
});

// class paile_1 extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
// <Text style={styles.welcome}>
//   Welcome to React Native!
// </Text>
// <Text style={styles.instructions}>
//   To get started, edit index.ios.js
// </Text>
// <Text style={styles.instructions}>
//   Press Cmd+R to reload,{'\n'}
//   Cmd+D or shake for dev menu
// </Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  btn: {
    marginTop:50,
    marginLeft:10,
    marginRight:10,
    height:24,
    backgroundColor:'#3BC1FF',
    color:'#fff',
    lineHeight:24,
    fontWeight:'bold',
    textAlign:'center'
  },
});

module.exports = Main;

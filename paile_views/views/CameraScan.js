var React = require('react-native');
var {
	View,
	Text,
	StyleSheet
} = React;

var CameraScan = React.createClass({
	render() {
		return(
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
});

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

module.exports = CameraScan;

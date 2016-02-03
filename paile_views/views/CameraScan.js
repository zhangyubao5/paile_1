var React = require('react-native');
var {
	View,
	Text,
	StyleSheet
} = React;

var CameraScan = React.createClass({
	render() {
		return(
			<View style={styles.welcome}>
        <Text style={styles.instructions}>
          建设中。。。
        </Text>
      </View>
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

/**
 * @class Home
 */

import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";

import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Hideo} from "react-native-textinput-effects";

import CommonStyle from "../styles/common.css";
import Database from "../firebase/database";
import DismissKeyboard from "dismissKeyboard";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: "",
            mobile: "",
            mobileForm: ""
        };

        this.logout = this.logout.bind(this);
        this.saveMobile = this.saveMobile.bind(this);

    }

    async logout() {

        try {

            await firebase.auth().signOut();

            this.props.navigator.push({
                name: "Login"
            })

        } catch (error) {
            console.log(error);
        }

    }

    async componentDidMount() {

        try {

            // Get User Credentials
            let user = await firebase.auth().currentUser;

            // Listen for Mobile Changes
            Database.listenUserMobile(user.uid, (mobileNumber) => {
                this.setState({
                    mobile: mobileNumber,
                    mobileForm: mobileNumber
                });
            });

            this.setState({
                uid: user.uid
            });

        } catch (error) {
            console.log(error);
        }

    }

    saveMobile() {

        // Set Mobile
        if (this.state.uid && this.state.mobileForm) {
            Database.setUserMobile(this.state.uid, this.state.mobileForm);
            DismissKeyboard();
        }

    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <View style={CommonStyle.container}>
                    <Text style={styles.heading}>Hello UserId: {this.state.uid}</Text>
                    <Text style={styles.heading}>Mobile Number (From Database): {this.state.mobile}</Text>
                    <View style={styles.form}>
                        <Hideo
                            iconClass={FontAwesomeIcon}
                            iconName={"mobile"}
                            iconColor={"white"}
                            iconBackgroundColor={"#f2a59d"}
                            inputStyle={{ color: "#464949"}}
                            value={this.state.mobileForm}
                            onChangeText={(mobileForm) => this.setState({mobileForm})}
                        />
                        <Button onPress={this.saveMobile} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>
                            Save
                        </Button>
                    </View>
                    <View style={styles.logout}>
                        <Button onPress={this.logout} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>
                            Logout
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({

    heading: {
        textAlign: "center"
    },

    logout: {
        padding: 50
    },

    form: {
        paddingTop: 50
    }

});

module.exports = Home;

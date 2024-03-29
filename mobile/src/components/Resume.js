import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Pages } from "react-native-pages";
import CanaryMessage from "./CanaryMessage";

import { getCanariesByUser } from "../services/canaries.service";

import {
  getHumidity,
  getTemperature,
  getCO,
  getCO2,
  getNH3
} from "../messages";

const iconProps = {
  name: "smile-o",
  size: 150,
  color: "#649ae8"
};

const iconProps2 = {
  name: "frown-o",
  size: 150,
  color: "red"
};

const iconProps3 = {
  name: "meh-o",
  size: 150,
  color: "#ff982b"
};

export default class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {
        temperature: null,
        humidity: null,
        co: null,
        co2: null,
        nh3: null
      }
    };
  }

  onLoadingSuccess = () => {
    if (this.state.mounted) {
      this.setState({ loaded: true });
      this.setState({ status: this.state.data[0].value.status });
    }
  };

  onLoadingFail = () => {
    alert("Erro ao carregar");
    /*
        if (this.state.mounted) {
            this.setState({
                text: "Falha ao Carregar",
                loadingStyle: styles.failLoading
            });
        }*/
  };

  setData = data => {
    this.setState({
      status: {
        temperature: data[0].temperature,
        humidity: data[0].humidity,
        co: data[0].co,
        co2: data[0].co2,
        nh3: data[0].nh3
      }
    });
  };

  componentWillMount() {
    getCanariesByUser()
      .then(res => res.data)
      .then(data => {
        this.setData(data);
      })
      .catch(() => {
        this.onLoadingFail();
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Pages containerStyle={{ paddingBottom: 25 }}>
          <CanaryMessage
            status={
              this.state.status.temperature != null &&
              getTemperature(this.state.status.temperature)
            }
            title="Temperatura"
          />
          <CanaryMessage
            status={
              this.state.status.humidity != null &&
              getHumidity(this.state.status.humidity)
            }
            title="Umidade"
          />
          <CanaryMessage
            status={this.state.status.co != null && getCO(this.state.status.co)}
            title="CO"
          />
          <CanaryMessage
            status={
              this.state.status.co2 != null && getCO2(this.state.status.co2)
            }
            title="CO2"
          />
          <CanaryMessage
            status={
              this.state.status.nh3 != null && getNH3(this.state.status.nh3)
            }
            title="NH3"
          />
        </Pages>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  resume: {
    marginHorizontal: 20,
    backgroundColor: "white",
    marginVertical: 12,
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center"
  },
  textContainer: {
    flex: 6,
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  face: {
    flex: 3,
    marginVertical: 20,
    alignSelf: "center"
  }
});

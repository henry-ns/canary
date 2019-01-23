import React from "react";

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    AsyncStorage
} from "react-native";

import axios from "axios";

import { colors, navigateAction } from "../common";
import DrawerItem from "../components/DrawerItem";
import CanaryOptions from "../components/CanaryOptions.js";

const CustomDrawerComponent = props => {
    const logout = () => {
        delete axios.defaults.headers.common["Authorization"];

        AsyncStorage.removeItem("userData");

        navigateAction("Autentication", props.navigation);
    };

    return (
        <View
            style={styles.container}
            forceInset={{ top: "always", horizontal: "never" }}
        >
            <View style={styles.innerContainer}>
                <ScrollView styles={{}}>
                    <Image
                        source={require("../../assets/imgs/logo.png")}
                        style={styles.logo}
                    />
                    <Text style={[styles.border, styles.margin]} />

                    <DrawerItem
                        name="Home"
                        iconFamily="SimpleIcon"
                        iconName="home"
                        onPress={() => props.navigation.navigate("Home")}
                    />

                    <CanaryOptions
                        ver={() => props.navigation.navigate("SeeCanaries")}
                        adicionar={() =>
                            props.navigation.navigate("CanaryRegister2")
                        }
                        remover={() => alert("remover")}
                    />

                    <DrawerItem
                        name="Mapa"
                        iconFamily="MaterialCommunityIcons"
                        iconName="map-marker-outline"
                    />

                    <DrawerItem
                        name="Perfil"
                        iconFamily="AntDesign"
                        iconName="user"
                        onPress={() => props.navigation.navigate("Profile")}
                    />
                </ScrollView>

                <View styles={{ marginBottom: 5 }}>
                    <Text style={styles.sistema}>Sistema</Text>

                    <DrawerItem
                        name="Sobre"
                        iconFamily="SimpleIcon"
                        iconName="exclamation"
                        iconStyle={{ marginLeft: 27 }}
                    />

                    <DrawerItem
                        name="Excluir Conta"
                        iconFamily="FontAwesome"
                        iconName="trash-o"
                        iconColor={"#f1c484"}
                        iconSize={23}
                        iconStyle={{ marginLeft: 28 }}
                        textStyle={[styles.item, styles.delete]}
                    />

                    <Text style={styles.border} />

                    <DrawerItem
                        name="Sair"
                        iconFamily="SimpleIcon"
                        iconName="logout"
                        iconStyle={{ marginLeft: 25 }}
                        onPress={logout}
                    />
                </View>
            </View>
        </View>
    );
};

export default CustomDrawerComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.primaryColor,
        color: "#fff"
    },
    innerContainer: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 5
    },
    logo: {
        width: 150,
        height: 80,
        marginTop: 15,
        marginHorizontal: 65,
        borderBottomWidth: 50,
        borderColor: "#fff"
    },
    item: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 16
    },
    border: {
        borderBottomWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.5)",
        paddingVertical: 0,
        marginVertical: -5
    },
    margin: {
        marginHorizontal: 15
    },
    sistema: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 7
    },
    delete: {
        color: "#f1c484"
    }
});

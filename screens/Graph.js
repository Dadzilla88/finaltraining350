import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import {BarChart,ProgressChart} from "react-native-chart-kit";
import axios from 'axios';
import {useEffect, useState} from "react";
import stringifySafe from "react-native/Libraries/Utilities/stringifySafe";

export const Graph = () =>{

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        decimalPlaces: 0,
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const [data,setData] = useState(null);
    const showGraph = () =>{
        console.log("In showGraph ");
        const res = axios.get('http://10.0.2.2:4000/feedback').then(function(result){
            let rep = result.data;
            let labels = [];
            let dataA = [];
            Object.keys(rep).forEach(key=>{
                labels.push(rep[key].feedbackName);
                dataA.push(rep[key].feedbackValue);
            })
            setData({
                labels: labels,
                datasets: [{data: dataA}]
            });
        })

    }
    if (data){
        console.log("This is data "+JSON.stringify(data));
        return(
            <View><Text>Graph goes here</Text>
                <BarChart
                  /*  style={graphStyle}*/
                    data={data}
                    width={Dimensions.get("window").width}
                    height={300}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </View>
        )
    }
    else {
        return (
            <View>
                <Text>This is the Graph page</Text>


                <Button
                    title="Show Graph"
                    onPress = {()=>{showGraph()}}
                    />
            </View>
        )
    }
}

import ReactEcharts from 'echarts-for-react';
import React from 'react';
class EchartsRing extends React.Component {
    chart = null;
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(this.chart) {
            let dat = this.props.data.series[0].data;
            let _t = 0;
            let echarts_instance = this.chart.getEchartsInstance();
            setInterval(() => {
                // 取消之前高亮的图形
                echarts_instance.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: _t % dat.length
                });
                echarts_instance.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 1,
                    dataIndex: _t % dat.length
                });
            
                _t++;
            
                // 高亮当前图形
                echarts_instance.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: _t % dat.length
                });
                echarts_instance.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 1,
                    dataIndex: _t % dat.length
                });
            
            
            }, 1000)
        }
    }
    render(){
    let { title= '',data= [] } = this.props;
    const fullScreen = true;
    const fs = document.body.clientWidth;
    const testStyle = fullScreen ? `${fs*0.009}` : 12;
    let option = {
        color: ['#DA6416', '#F5C667', '#FDC553', '#AE413A', '#4C835B', '#406E52', '#355A48', '#2F5144', '#233F43'],
        title: {
            text: title,
            left: '0',
            top: '10',
            textStyle: {
                color: '#0D9B6B',
                fontWeight: 'normal',
                fontSize: testStyle
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/>{d}%',
            position : 'right'
        },
        dataset: {
            source: data.series ? data.series[0].data : []
        },
        series: [
            {
                type: 'pie',
                top: 10,
                radius: ['35%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '10',
                        fontWeight: 'bold',
                        formatter: '{b}\n {d}%'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data.series && data.series[0].data
            }
        ]
    };
    return (
        <ReactEcharts  ref={e=>{
            this.chart=e;
        }} option={option} style={{ width: '100%', height: '100%' }} />
    )
    }
}
export default EchartsRing;
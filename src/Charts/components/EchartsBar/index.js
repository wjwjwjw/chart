import React from 'react';
import ReactEcharts from 'echarts-for-react';
function EchartsBar({title='',data=[]}) {
    const fullScreen = true;
    const fs = document.body.clientWidth;
    const testStyle = fullScreen ? `${fs*0.009}` : 12;
    const option1 = {
        title: {
            text: '行业分布',
            left: '0',
            top: '10',
            textStyle: {
                color: '#0D9B6B',
                fontWeight: 'normal',
                fontSize: testStyle
            }
        },
        color: ['#DA6416'],
        grid: {
            top: 70,
            bottom: 30
        },
        tooltip: {
            formatter: function (params) {
                return params.name + '<br/>数量：' + (params.value / 10000).toFixed(2) + '万' 
            }
        },
        legend: {
            data: ['数量'],
            right: 10,
            top: 15,
            itemWidth: 10,
            textStyle: {
                color: '#8E9398'
            }
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#4C5963'
                }
            },
            data: data.series && data.series[0].data.map(item=>item.name),
        },
        yAxis: {
            name: '万',
            nameLocation: 'center',
            nameGap: 40,
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#4C5963'
                }
            },
            splitLine: {
                show: false    //去掉网格线
            },
            axisLabel: {
                formatter: function (value) {
                    return value / 10000
                }
            }
        },
        series: [{
            data: data.series && data.series[0].data.map(item=>item.value),
            type: 'bar',
            barWidth: '50%',
            name: '数量',
            label: {
                show: true,
                position: 'top',
                formatter: function(params) {
                    return (params.value / 10000).toFixed(2) + '万'
                }
            },
            itemStyle: {
                barBorderRadius: [4, 4, 0, 0]
            },
        }]
    };
    const option2 = {
        title: {
            text: 'APP排名',
            left: '0',
            top: '10',
            textStyle: {
                color: '#0D9B6B',
                fontWeight: 'normal',
                fontSize: testStyle
            }
        },
        color: ['#DA6416'],
        grid: {
            top: 70,
            bottom: 30,
            left: 120
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                },
                lineStyle: {
                    type: 'dashed'
                }
            },
            formatter: '{b}<br/>数量: {c}'
        },
        legend: {
            data: ['数量'],
            right: 10,
            top: 15,
            itemWidth: 10,
            textStyle: {
                color: '#8E9398'
            }
        },
        xAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#4C5963'
                }
            },
            splitLine: {
                show: false    //去掉网格线
            }
        },
        yAxis: {
            type: 'category',
            data: data.series && data.series[0].data.map(item=>item.name).reverse(),
            axisLine: {
                lineStyle: {
                    color: '#4C5963'
                }
            }
        },
        series: [{
            data: data.series && data.series[0].data.map(item=>item.value).reverse(),
            type: 'bar',
            barWidth: '50%',
            name: '数量',
            itemStyle: {
                barBorderRadius: [0, 4, 4, 0]
            },
        }]
    };
    const option = title === '行业分布' ? option1 : option2;
    return (
        <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />
    )
}
export default EchartsBar;
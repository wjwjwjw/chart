import React from 'react';
import ReactEcharts from 'echarts-for-react';
function EchartsLine({title='', data=[]}) {
    const fullScreen = true;
    const fs = document.body.clientWidth;
    const testStyle = fullScreen ? `${fs*0.009}` : 12;
    const option1 = {
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
        color: ['#DA6416', '#E3940A'],
        grid: {
            top: 70,
            bottom: 30
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                    formatter: function(params) {
                        if(params.axisDimension === 'y') {
                            return (params.value / 1000000).toFixed(2)
                        } else {
                            return params.value
                        }
                    }
                },
                lineStyle: {
                    type: 'dashed'
                }
            },
            formatter: function(params) {
                return `${params[0].name} <br/>
                 ${params[0].seriesName}: ${(params[0].value / 1000000).toFixed(2)}百万 <br/>
                 ${params[1].seriesName}: ${(params[1].value / 1000000).toFixed(2)}百万
                `
            }
        },
        legend: {
            data: [{
                name: '对公金额',
                textStyle: {
                    color: '#8E9398'
                }
            }, {
                name: '对私金额',
                textStyle: {
                    color: '#8E9398'
                }
            }],
            right: 5,
            top: 15,
            icon: 'circle',
            align: 'right'
        },
        xAxis: {
            type: 'category',
            data: data.xAxis && data.xAxis.data,
            axisLine: {
                lineStyle: {
                    color: '#4C5963'
                }
            }
        },
        yAxis: {
            name: '百万',
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
                    return value / 1000000
                }
            }
        },
        series: [
            {
                data: data.series && data.series[2] &&data.series[2].data,
                name: "对公金额",
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: function(params) {
                            return (params.value / 1000000).toFixed(2)
                        }
                    }
                },
                type: 'line',
                symbol: 'circle',
                smooth: true,
            },
            {
                data: data.series && data.series[3] && data.series[3].data,
                name: "对私金额",
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: function(params) {
                            return (params.value / 1000000).toFixed(2)
                        }
                    }
                },
                type: 'line',
                symbol: 'circle',
                smooth: true
            }]
    };
    const option2 = {
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
        color: ['#DA6416', '#E3940A'],
        grid: {
            top: 70,
            bottom: 30,
            left:40
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                    formatter: function(params) {
                        if(params.axisDimension === 'y') {
                            return title === '商品增长量' ? (params.value / 10000).toFixed(2) : params.value.toFixed(2)
                        } else {
                            return params.value
                        }
                    }
                },
                lineStyle: {
                    type: 'dashed'
                }
            },
            formatter: function(params) {
                if (title === '商品增长量') {
                    return `${params[0].name} <br/> ${params[0].seriesName}: ${(params[0].value / 10000).toFixed(2)}万`
                } else {
                    return `${params[0].name} <br/> ${params[0].seriesName}: ${params[0].value}`
                }
            }
        },
        legend: {
            data: [{
                name: '数量',
                textStyle: {
                    color: '#8E9398'
                }
            }],
            right: 5,
            top: 15,
            icon: 'circle',
            align: 'right'
        },
        xAxis: {
            type: 'category',
            data: data.xAxis && data.xAxis.data,
            axisLine: {
                lineStyle: {
                    color: '#4C5963'
                }
            }
        },
        yAxis: {
            name: title === '商品增长量' ? '万' : '',
            nameLocation: 'center',
            nameGap: 20,
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
                    return title === '商品增长量' ? value / 10000 : value
                }
            }
        },
        series: [
            {
                data: data.series && data.series[0].data,
                name: '数量',
                label: {
                    show: true,
                    position: 'top',
                    formatter: function(params) {
                        return title === '商品增长量' ? (params.value / 10000).toFixed() : params.value
                    }
                },
                type: 'line',
                symbol: 'circle',
                smooth: true,
            }]
    };
    let option = title === '企业支付金额变化趋势' ? option1 : option2;
    return (
        <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />
    )
}
export default EchartsLine;
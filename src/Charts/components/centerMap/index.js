import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import React from 'react';
import '../../../../node_modules/echarts/map/js/china.js';
require("../../../../node_modules/echarts/lib/chart/map");
require('../../../../node_modules/echarts/map/js/province/hunan.js');
require('../../../../node_modules/echarts/map/js/province/shanghai.js');
require('../../../../node_modules/echarts/map/js/province/guizhou.js');
require('../../../../node_modules/echarts/map/js/province/chongqing.js');
class CenterMap extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        let echarts_instance = this.chart.getEchartsInstance();
        var index = 0; //播放所在下标
        setInterval(function() {
            echarts_instance.dispatchAction({
                type: 'showTip',
                seriesIndex: 3,
                dataIndex: index
            });
            index++;
            if(index >= 6) {
                index = 0;
            }
        },2000)
    }
    render(){
    let { region='全国',data=[] } = this.props;
    var geoCoordMap = {};
    var convertData = function(data) {
        var res = [];
        if(data){
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        }
        return res;
    };
    const mapName = region === '全国' || region === '北京' ? 'china' : region;
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
    
    });
    const size = region === '全国' || region === '北京' ? 1000 : region === '湖南' ? 100 : 10;
    const MapOption = {
        tooltip: {
            trigger: 'item',
            formatter:'{b}: {c}'
        },
        visualMap: {
            show: false,
            min: 0,
            max: 200,
            left: '10%',
            top: 'bottom',
            calculable: true,
            seriesIndex: [1],
            inRange: {
                // color: ['#04387b', '#467bc0'] // 蓝绿
            }
        },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: 'rgba(5,164,182,0.1)',
                    borderColor: 'rgba(33,253,255,1)',
                },
                emphasis: {
                    areaColor: 'rgba(60,63,75,0.5)',
                }
            }
        },
        series: [{
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: data.data && convertData(data.data),
                symbolSize: function(val) {
                    return val[2] / size;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true,
                        fontSize:10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#B97D12'
                    }
                },
                tooltip: {
                    formatter: function(params){
                        if(typeof(params.value)[2] == "undefined"){
                              return '服务企业数量<br/>{params.name}:{params.value}';
                        }else{
                            return '服务企业数量<br/>'+ params.name +':'+params.value[2];
                        }
                    }
                }
            },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data.data || []
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 6,
            },
            {
                name: 'Top 6',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.data && data.data.sort(function(a, b) {
                    return b.value - a.value;
                }).slice(0, 6)),
                symbolSize: function(val) {
                    return val[2] / size;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true,
                        fontSize: 10
                    }
                },
                tooltip: {
                    formatter: function(params){
                        if(typeof(params.value)[2] == "undefined"){
                              return '服务企业数量前六名<br/>{params.name}:{params.value}';
                        }else{
                            return '服务企业数量前六名<br/>'+ params.name +':'+params.value[2];
                        }
                    }
                },
                dataset: {
                    source: data.data ? convertData(data.data.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)) : []
                },
                itemStyle: {
                    normal: {
                        color: '#F4E925',
                        shadowBlur: 10,
                        shadowColor: '#F4E925'
                    }
                },
                zlevel: 1
            }
        ]
    };
    return (
        <ReactEcharts ref={e=>{this.chart=e;}} option={MapOption} style={{width: '100%', height: '100%'}}/>
    )
    }
}
export default CenterMap;
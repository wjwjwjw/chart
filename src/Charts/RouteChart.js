import React, { Fragment } from 'react';
import  { number2Thousands, addChineseUnit, nFormatter, unitConvert } from './../util';
import CenterMap from './components/centerMap';
import EchartsRing from './components/EchartsRing';
import EchartsLine from './components/EchartsLine';
import EchartsBar from './components/EchartsBar';
import data from './../source/data.json';
import './RouteChart.less';

class Chart extends React.Component {
    render() {
        const {
            enterprise={}, tradeData={}, equipmentData={}, commodityData={},
            userData={}, applyData={}, platformData={}, ecologyData={},
            financialData={}, providerData={}
        } = data.data || {};
        const platforms = [];
        const currentPlatform = [];
        const typeCount = equipmentData.typeCount;
        let typeCountData = []
        if (typeCount) {
            let typeCountDatat = typeCount.series[0].data;
            let count = 0;
            for (let item of typeCountDatat) {
                if (item.name == '工业物流仓储设备') {
                    count += item.value
                }
            }
            if (count > 0) {
                typeCountData.push({ "name": '工业物流仓储设备', "value": count })
            }
            for (let item of typeCountDatat) {
                if (item.name != '工业物流仓储设备') {
                    typeCountData.push(item)
                }
            }
            typeCount.series[0].data = typeCountData
        }
        const fullScreen = true;
        const fs = document.body.clientWidth;
        const testStyle = {fontSize: fullScreen ? `${fs*0.011}px` : ''};
        const unitStyle = {fontSize: fullScreen ? `${fs*0.009}px` : ''};
        const numberStyle = {fontSize: fullScreen ? `${fs*0.018}px` : ''};
        return (
            <div className="routeChart">
                <div className="header">
                    <div className="jingzhi">
                        {/* <img src={require('./../../../assets/images/chart/logo.png')} /> */}
                    </div>
                </div>
                <div className="logo">
                    {/* <img src={require('./../../../assets/images/chart/logo.png')} /> */}
                </div>
                <div className="mainContainer">
                    <div className="left">
                        <div className="box-container1">
                            <div className="textBox">
                                <div className="text" style={testStyle}>总设备数</div>
                                <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(equipmentData.accessCount)}</span>台套</div>
                            </div>
                            <div className="textBox">
                                <div className="text" style={testStyle}>采集点数</div>
                                <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(equipmentData.collectionCount)}</span>个</div>
                            </div>
                        </div>
                        <div className="chart-container1">
                            <div className="chartBox">
                                <EchartsRing title='设备类型分布' data={typeCount} />
                            </div>
                            <div className="chartBox">
                                <EchartsRing title='设备行业分布' data={equipmentData.industryCount} />
                            </div>
                        </div>
                        <div className="chart-container2">
                            <div className="chartBox">
                                <EchartsLine title='企业支付金额变化趋势' data={financialData.enIncrease} />
                            </div>
                        </div>
                        <div className="box-container1">
                            <div className="textBox">
                                <div className="text" style={testStyle}>商品总量</div>
                                <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(commodityData.commodityCount)}</span>个</div>
                            </div>
                            <div className="textBox">
                                <div className="text" style={testStyle}>商品总金额</div>
                                <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(unitConvert(commodityData.commodityTotalPrice || 0).num)}</span>{unitConvert(commodityData.commodityTotalPrice || 0).unit}</div>
                            </div>
                        </div>
                        <div className="chart-container1">
                            <div className="chartBox">
                                <EchartsRing title='商品类别' data={commodityData.commodityType} />
                            </div>
                            <div className="chartBox">
                                <EchartsLine title='商品增长量' data={commodityData.commodityIncrease} />
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="box-container1">
                            <div className="textBox">
                                <div className="text" style={testStyle}>工业企业总数</div>
                                <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(enterprise.totalCount || 0)}</span>家</div>
                            </div>
                            <div className="textBox">
                                <div className="text" style={testStyle}>大型企业总数</div>
                                <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(enterprise.largeCount || 0)}</span>家</div>
                            </div>
                            <div className="textBox">
                                <div className="text" style={testStyle}>中小型企业总数</div>
                                <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(enterprise.smallCount || 0)}</span>家</div>
                            </div>
                        </div>
                        <div className="chart-container3">
                            <div className="chartBox-withoutbg">
                                <CenterMap region={currentPlatform.region} data={enterprise.industryDistribution}/>
                            </div>
                        </div>
                        <div className="chart-container4">
                            <div className="chartBox">
                                <EchartsBar title='行业分布' data={enterprise.distribution} />
                            </div>
                        </div>
                        <div className="box-container2">
                            <div className="textBox">
                                <div className="text" style={testStyle}>标识分配量</div>
                                <div className="number" style={numberStyle}>- -</div>
                            </div>
                            <div className="textBox">
                                <div className="text" style={testStyle}>日均解析量</div>
                                <div className="number" style={numberStyle}>- -</div>
                            </div>
                        </div>
                        <div className="box-container2">
                            <div className="textBox">
                                <div className="text" style={testStyle}>累计解析量</div>
                                <div className="number" style={numberStyle}>- -</div>
                            </div>
                            <div className="textBox">
                                <div className="text" style={testStyle}>对接企业级平台</div>
                                <div className="number" style={numberStyle}>- -</div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="chart-container4">
                            <div className="chartBox">
                                <EchartsRing title='APP分类' data={applyData.applyType} />
                            </div>
                            <div className="chartBox">
                                <EchartsLine title='APP增长量' data={applyData.applyIncrease} />
                            </div>
                        </div>
                        <div className="chart-container5">
                            <div className="chartBox-withoutbg2">
                                <div className="chartBox">
                                    <EchartsBar title='APP排名' data={applyData.applyOrder}/>
                                </div>
                            </div>
                            <div className="chartBox-withoutbg2">
                                <div className="box-container1">
                                    <div className="textBox">
                                        <div className="text" style={testStyle}>伙伴总数</div>
                                        <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(ecologyData.partnerCount)}</span>个</div>
                                    </div>
                                    <div className="textBox">
                                        <div className="text" style={testStyle}>伙伴应用数</div>
                                        <div className="unit" style={unitStyle}><span className="number" style={numberStyle}>{number2Thousands(ecologyData.partnerApplyCount)}</span>个</div>
                                    </div>
                                </div>
                                <div className="chart-container3" style={{ marginBottom: 0 }}>
                                    <div className="chartBox">
                                        <EchartsLine title='生态伙伴增长总量' data={ecologyData.partnerIncrease} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chart-container1">
                            <div className="textBox">
                                <div className="text" style={testStyle}>平台用户数</div>
                                <div className="unit" style={{marginBottom: '1rem'}}><span className="number" style={numberStyle}>{number2Thousands(userData.userCount)}</span>个</div>
                                <div className="text" style={testStyle}>{`活跃用户数  ${number2Thousands(userData.activeCount)} 个`}</div>
                            </div>
                            <div className="textBox">
                                <div className="text" style={testStyle}>平台开发者数</div>
                                <div className="unit" style={{marginBottom: '1rem'}}><span className="number" style={numberStyle}>{number2Thousands(providerData.providerCount)}</span>个</div>
                                <div className="text" style={testStyle}>{`活跃开发者数  ${number2Thousands(providerData.providerActiveCount)} 个`}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chart;
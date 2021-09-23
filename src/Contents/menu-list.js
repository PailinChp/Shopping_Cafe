import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart } from '../Reducers/actions';
import { menuData, tabData } from './menu-data';
import { Tabs, Layout, Row, Col, Badge, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CardGrid from '../Components/cardgrid';
const { Content } = Layout;
const { TabPane } = Tabs;

const MenuList = (props) => {
    const { cart, cartCount, addToCart } = props;
    const history = useHistory();
    const [arrmenu, setArrmenu] = useState(null);

    const TabActive = (key) => {
        var arr = [];
        menuData.map((tmp,inx)=>{
            if(key == 'all'){
                arr = arr.concat(tmp.list);
                setArrmenu(arr);
            }               
            else if(tmp.group == key)
                setArrmenu(tmp.list);
        })
    }
    
    useEffect(() => {
        TabActive('all');
    },[]);

    return (
        <div className="box-menu font-web">
            <Layout >
                <Content>
                    <Row style={{paddingBottom:'2em'}}>
                        <Col span={12} style={{textAlign:'left'}}>
                            เมนูของร้าน
                        </Col>
                        <Col span={12} style={{textAlign:'right'}} >
                            ตะกร้าของฉัน &nbsp; 
                            <Badge count={cartCount}>
                                <ShoppingCartOutlined 
                                    style={{fontSize: '25px',color:'white',cursor:'pointer'}}
                                    onClick={() => {
                                        if(cartCount)
                                            history.push('/in-cart');
                                        else
                                            Modal.warning({
                                                title: 'แจ้งเตือน !',
                                                content: 'ไม่มีสินค้าในตะกร้า..',
                                            })
                                    }} />
                            </Badge>                            
                        </Col>
                    </Row>
                    <Tabs tabPosition='left' onChange={TabActive} className="font-web">
                        {tabData.map((tmp,inx)=>
                            <TabPane tab={tmp.name} key={tmp.key}>
                                <CardGrid menu={arrmenu} 
                                        cart={cart}
                                        onCart={(menu)=> addToCart(menu)} />
                            </TabPane>
                        )}
                    </Tabs>
                </Content>
            </Layout>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.products.cart || [],
        cartCount: state.products.cartCount || 0
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: bindActionCreators(addToCart, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)
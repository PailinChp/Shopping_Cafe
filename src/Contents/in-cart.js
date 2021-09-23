import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, removeToCart } from '../Reducers/actions';
import { Layout, Row, Col, Card, InputNumber, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
const { Content } = Layout;

const MenuList = (props) => {
    const history = useHistory();
    const { cart, addToCart, removeToCart } = props;
    const [totalprice, setTotalprice] = useState(0);

    useEffect(() => {
        var total = 0;
        cart.map((tmp,inx)=>{
            var price = tmp.price;
            if(tmp.count){
                price = price * tmp.count;
            }
            total += price;
        });
        setTotalprice(total);
    },[cart]);

    return (
        <div className="App">
            <div className="box-menu font-web">
            <Layout >
                <Content>
                    <Row style={{paddingBottom:'2em'}}>
                        <Col span={12} style={{textAlign:'left'}}>
                            ตะกร้าของฉัน
                        </Col>
                        <Col span={12} style={{textAlign:'right',color:'green'}}>
                            <button className="btn success"
                                    style={{fontSize:'18px'}}
                                    onClick={() => {history.push('/menu-list')}} >
                                    เพิ่มเมนู >
                            </button>
                        </Col>
                    </Row>
                    {cart.length != 0 ?
                        cart.map((tmp,inx)=>
                            <Card.Grid style={gridStyle} key={inx}>
                                <Row>
                                    <Col span={4}>
                                        <img alt="example" src={tmp.photo} style={{width: '30%'}} />
                                    </Col>
                                    <Col span={15} style={{textAlign:'left'}}>
                                        <span >{tmp.name}</span>
                                    </Col>
                                    <Col span={1} >
                                        <span >{tmp.price} ฿</span>
                                    </Col>
                                    <Col span={4} style={{fontSize:'16px'}}>
                                        <span >จำนวน</span>&nbsp;&nbsp;
                                        <InputNumber min={1} 
                                                    defaultValue={tmp.count} 
                                                    onChange={()=> addToCart(tmp)} 
                                                    style={{fontSize:'16px'}} />
                                                    &nbsp;&nbsp;
                                        <button className="btn danger"
                                                style={{fontSize:'16px'}}
                                                onClick={()=> removeToCart(tmp)} >
                                                ลบ
                                        </button>
                                    </Col>
                                </Row>
                            </Card.Grid>
                        )
                        : <div style={{color:'#bba7a7'}}>
                            <ShoppingCartOutlined style={{fontSize: '5rem'}} /><br/>
                            ไม่มีสินค้าในตะกร้า
                        </div>
                    }                    
                </Content>
            </Layout>
            {cart.length != 0 && 
                <Card.Grid style={gridStyle} >
                    <Row>
                        <Col span={18} style={{textAlign:'right'}}>
                            <span >ยอดรวม</span>
                        </Col>
                        <Col span={2} style={{textAlign:'right'}}>
                            <span >{totalprice} ฿</span>
                        </Col>
                        <Col span={4} style={{fontSize:'16px'}}>
                            <button className="btn success"
                                    style={{fontSize:'16px'}}
                                    onClick={()=> {
                                        Modal.confirm({
                                            title: 'แจ้งเตือน !',
                                            content: 'คุณต้องการสั่งซื้อสินค้าใช่หรือไม่ ?',
                                            okText: 'ยืนยัน',
                                            cancelText: 'ยกเลิก',
                                        })
                                    }} >
                                    สั่งซื้อ
                            </button>
                        </Col>
                    </Row>
                </Card.Grid>
            }            
            </div>                
        </div>     
    );
}
// export default MenuList;
const gridStyle = {
    width: '100%',
    textAlign: 'center',
};
const mapStateToProps = (state) => {
    return {
        cart: state.products.cart || [],
        cartCount: state.products.cartCount || 0
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: bindActionCreators(addToCart, dispatch),
        removeToCart: bindActionCreators(removeToCart, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)
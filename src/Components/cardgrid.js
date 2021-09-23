import React from 'react';
import { Row, Col, Card, Modal, Input, Image } from 'antd';
import Wrap from '../Components/wrap';

const CardGrid = (props) => {
    const SelectMenu = (menu,count) => {
        Modal.confirm({
            title: 'เลือกเมนู',
            content: <Wrap>
                        <Image
                            width={270}
                            src={menu.photo}
                            /><br/>
                        <span className="font-web" style={{color:'black'}}><b>
                            {menu.name} 
                            &nbsp;&nbsp;&nbsp; 
                            {menu.price} ฿</b>
                        </span>
                        {count != 0 &&
                            <span style={{float:'right',color:'red',fontSize:'16px'}}>
                                <b>x {count}</b>
                            </span>
                        }
                        {/* <br/><br/> */}
                        {/* <span>รายละเอียดเพิ่มเติม</span><br/> */}
                        {/* <Input placeholder="เช่น หวานน้อย" onChange={onChangeInput}></Input> */}
                    </Wrap>,
            okText: 'ใส่ในตะกร้า',
            cancelText: 'ยกเลิก',
            onOk() {
                props.onCart(menu);
            },
        });
    };
    // const onChangeInput = e =>{
    //     console.log('gggg',e)
    // }
    return(
        <Wrap>
            <Row justify="space-around">
                {props.menu ? 
                    props.menu.map((tmp, index)=> 
                        <Col span={5} key={index}>
                            <Card.Grid style={gridStyle} key={index}>
                                <Card
                                    hoverable
                                    cover={<img alt="hellocafe" src={tmp.photo} />}
                                    onClick={()=> {
                                        var count = 0;
                                        if(props.cart){
                                            props.cart.map((val)=>{
                                                if(val.name == tmp.name)
                                                count = val.count;
                                            })
                                        }
                                        SelectMenu(tmp,count);
                                    }}
                                >
                                    <Row>
                                        <Col span={12} >
                                            <span style={{fontSize: '16px'}}>{tmp.name}</span>
                                        </Col>
                                        <Col span={12} >
                                            <span style={{float: 'left',fontSize: '16px'}}>| &nbsp;&nbsp;&nbsp;{tmp.price} ฿</span>
                                            {props.cart &&
                                                props.cart.map((val,inx)=>{
                                                    if(val.name == tmp.name)
                                                        return  <span key={inx} style={{color: 'red',float: 'right',fontSize: '16px'}}>
                                                                    <b>x {val.count}</b>
                                                                </span>
                                                })
                                            }
                                        </Col>
                                    </Row>
                                </Card>                            
                            </Card.Grid>
                        </Col>                                      
                    ) 
                    : <Row><Col>ไม่มีเมนู</Col></Row>
                }            
            </Row>
        </Wrap>
    );
}
const gridStyle = {
    width: '100%',
    textAlign: 'center',
    padding: '5px',
    cursor: 'pointer'
};
export default CardGrid;
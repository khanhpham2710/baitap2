import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Container, Row, Col } from 'reactstrap';

function Cards(props) {
    const { listTour } = props;
    return (
        <Container id="cards">
            <Row lg="4" md="2" sm="1">
                {listTour.map((tour, index) => (
                    <Col key={index}>
                        <Card style={{ borderRadius: '15px', boxShadow: "rgba(0, 0, 0, 0.5) 0px 3px 8px" }}>
                            <div>
                                <img alt="Sample" src={tour.img} style={{borderTopLeftRadius: "15px", borderTopRightRadius: "15px", width:"100%"}} />
                                <div style={{ position: 'absolute', top: "10px", left: "10px", backgroundColor: "red", color: "#fff", fontSize: "12px", fontWeight: "500", padding: "5px"}}>12% off</div>
                            </div>
                            <CardBody>
                                <CardSubtitle className="mb-3 mt-2 text-muted" tag="h6">
                                    <i className="fa-solid fa-magnifying-glass-location"></i>
                                    {tour.category}
                                </CardSubtitle>
                                <CardTitle tag="h5" className='mt-2 mb-4'>
                                    {tour.title}
                                </CardTitle>
                                <CardSubtitle className="mb-2 mt-2 mb-3 text-muted" tag="h6">
                                    From <span style={{ color: "var(--primary-color)" }}>{tour.price} </span><span style={{ textDecorationLine: "line-through" }}>250.00</span>
                                </CardSubtitle>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star-half-stroke"></i>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Cards;

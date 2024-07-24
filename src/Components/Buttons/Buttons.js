import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';

function Buttons(props) {
    const { list, handleClick, city } = props;

    return (
        <div>
            <Container style={{ width: "50%", margin: "20px auto" }}>
                <Row md="4">
                    {list.map((tour, index) => (
                        <Col key={index}>
                            <Button
                                onClick={() => handleClick({id: tour.id, title: tour.title})}
                                style={{
                                    padding: "5px 10px",
                                    height: "40px",
                                    backgroundColor: tour.id === city.id ? "var(--primary-color)" : "#fff",
                                    color: tour.id === city.id ? "#fff" : "#000",
                                    fontSize: "18px",
                                    fontWeight: "500",
                                    border: "none",
                                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                                }}
                            >
                                {tour.title}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Buttons;
